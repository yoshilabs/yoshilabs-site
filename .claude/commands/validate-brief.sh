#!/usr/bin/env bash
# validate-brief.sh — Structural validation of brief.json against brief-schema.json
# Usage: ./validate-brief.sh [path-to-client-dir]
#   Defaults to CWD if no arg given. Expects brief.json and brief-schema.json in the dir.
#   Exit 0 = valid, Exit 1 = invalid with descriptive errors to stderr.

set -euo pipefail

CLIENT_DIR="${1:-$(pwd)}"
BRIEF="${CLIENT_DIR}/brief.json"
SCHEMA="${CLIENT_DIR}/brief-schema.json"

# ── helpers ──────────────────────────────────────────────────────────
err()  { echo "❌ $*" >&2; }
pass() { echo "✅ $*"; }

failures=0

fail() {
  err "$*"
  ((failures++))
}

# ── pre-flight ──────────────────────────────────────────────────────
if [[ ! -f "$BRIEF" ]]; then
  err "brief.json not found at $BRIEF"
  exit 1
fi
if [[ ! -f "$SCHEMA" ]]; then
  err "brief-schema.json not found at $SCHEMA"
  exit 1
fi

echo "🔍 Validating $BRIEF …"
echo ""

# ── 1. Required top-level fields ────────────────────────────────────
echo "── Required fields ──"
REQUIRED_FIELDS=$(node -e "
  const s = require('${SCHEMA}');
  console.log(s.required.join(' '));
")

for field in $REQUIRED_FIELDS; do
  val=$(node -e "
    const b = require('${BRIEF}');
    const v = b['${field}'];
    if (v === undefined || v === null || v === '') process.exit(1);
    console.log(v);
  " 2>/dev/null) || {
    fail "Missing required field: $field"
    continue
  }
  pass "$field = $val"
done

# ── 2. Industry enum check ──────────────────────────────────────────
echo ""
echo "── Industry ──"
INDUSTRY=$(node -e "console.log(require('${BRIEF}').industry || '')")
ALLOWED=$(node -e "
  const s = require('${SCHEMA}');
  console.log(s.properties.industry.enum.join(' '));
")

match=0
for allowed in $ALLOWED; do
  [[ "$INDUSTRY" == "$allowed" ]] && { match=1; break; }
done

if [[ $match -eq 1 ]]; then
  pass "industry = $INDUSTRY (valid enum)"
else
  fail "industry = \"$INDUSTRY\" is not in allowed enum. Choose from: ${ALLOWED// /, }"
fi

# ── 3. Slug pattern ─────────────────────────────────────────────────
echo ""
echo "── Slug ──"
SLUG=$(node -e "console.log(require('${BRIEF}').slug || '')")
SLUG_PATTERN='^[a-z0-9-]+$'

if [[ "$SLUG" =~ $SLUG_PATTERN ]]; then
  pass "slug = $SLUG"
else
  fail "slug = \"$SLUG\" does not match pattern ^[a-z0-9-]+\$"
fi

# ── 4. Location ─────────────────────────────────────────────────────
echo ""
echo "── Location ──"
LOCATION=$(node -e "console.log(require('${BRIEF}').location || '')")
if [[ -n "$LOCATION" ]]; then
  pass "location = $LOCATION"
else
  fail "location is empty"
fi

# ── 5. Services array ───────────────────────────────────────────────
echo ""
echo "── Services ──"
SERVICES_COUNT=$(node -e "
  const b = require('${BRIEF}');
  console.log(Array.isArray(b.services) ? b.services.length : 0);
")

if [[ "$SERVICES_COUNT" -eq 0 ]]; then
  fail "services array is empty or missing — at least 1 service required"
else
  pass "services has $SERVICES_COUNT item(s)"

  # Validate each service has name + description
  node -e "
    const b = require('${BRIEF}');
    const svc = b.services;
    let errors = [];
    svc.forEach((s, i) => {
      const missing = [];
      if (!s.name || s.name.trim() === '') missing.push('name');
      if (!s.description || s.description.trim() === '') missing.push('description');
      if (missing.length > 0) {
        errors.push('  Service[' + i + '] missing required: ' + missing.join(', '));
      }
    });
    if (errors.length > 0) {
      errors.forEach(e => process.stderr.write(e + '\n'));
      process.exit(1);
    }
  " 2>/dev/null || {
    ((failures++))
    err "Some services missing required name/description fields"
  }

  if [[ $failures -eq ${failures:-0} || ${failures_check:-0} -eq 0 ]]; then
    # Only check pass if no new failures were added
    node -e "
      const b = require('${BRIEF}');
      b.services.forEach((s, i) => {
        console.log('  [' + i + '] ' + s.name);
      });
    "
  fi
fi

# ── 6. Brand colors hex validation ──────────────────────────────────
echo ""
echo "── Brand colors ──"
HEX_PATTERN='^#[0-9a-fA-F]{6}$'

node -e "
  const b = require('${BRIEF}');
  const colors = b.brand && b.brand.colors ? b.brand.colors : null;
  if (!colors) {
    process.stderr.write('❌ brand.colors object is missing\n');
    process.exit(1);
  }
  const hexRe = /^#[0-9a-fA-F]{6}$/;
  let errors = [];
  let ok = [];
  for (const [key, val] of Object.entries(colors)) {
    if (hexRe.test(val)) {
      ok.push(key);
    } else {
      errors.push('  ' + key + ' = \"' + val + '\" — not a valid hex color (#RRGGBB)');
    }
  }
  ok.forEach(k => console.log('✅ ' + k + ' = ' + colors[k]));
  if (errors.length > 0) {
    errors.forEach(e => process.stderr.write('❌ ' + e.slice(2) + '\n'));
    process.exit(1);
  }
" || {
  # failures already printed by node stderr
  ((failures++))
}

# ── Summary ─────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════"
if [[ $failures -eq 0 ]]; then
  echo "✅ ALL CHECKS PASSED — brief.json is valid"
  exit 0
else
  echo "❌ VALIDATION FAILED — $failures error(s) found"
  exit 1
fi
