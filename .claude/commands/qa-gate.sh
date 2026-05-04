#!/usr/bin/env bash
# qa-gate.sh — QA gate with mobile-first enforcement
# Usage: ./qa-gate.sh [path-to-client-dir]
#   Defaults to CWD. Expects site/index.html in the dir.
#   Exit 0 = pass (deploy allowed), Exit 1 = blocked
# Checks:
#   1. File exists and is non-empty
#   2. No generic Tailwind blue (#3B82F6) or purple (#6C5CE7) leaks
#   3. No class name collisions (.h-1, .h-2, .w-1, .p-1)
#   4. No data-text-split on HTML-inline headings
#   5. All headings use clamp() with mobile minimums
#   6. No horizontal overflow risks (fixed widths > 100vw, missing overflow-x hidden)
#   7. Touch targets meet 44px minimum
#   8. WhatsApp float button present
#   9. Meta viewport tag present
#   10. JSON-LD schema present

set -euo pipefail

CLIENT_DIR="${1:-$(pwd)}"
HTML_FILE="${CLIENT_DIR}/site/index.html"
SCORE=100
ISSUES=()

# --- CHECK 1: File exists ---
if [[ ! -f "$HTML_FILE" ]]; then
  echo "❌ site/index.html not found at $HTML_FILE" >&2
  exit 1
fi

SIZE=$(wc -c < "$HTML_FILE")
if [[ "$SIZE" -lt 1000 ]]; then
  echo "❌ site/index.html is too small (${SIZE} bytes)" >&2
  exit 1
fi

# --- CHECK 2: No forbidden colors ---
if grep -q '#3B82F6\|#6C5CE7' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Forbidden default Tailwind purple/blue found — use Refero colors only")
  SCORE=$((SCORE - 10))
fi

# --- CHECK 3: No Tailwind class collisions ---
if grep -Pq '\.h-[12]\b|\.w-[12]\b|\.p-[12]\b' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Tailwind class collision ('.h-1', '.h-2', '.w-1', '.p-1') — use '.heading-1', '.heading-2'")
  SCORE=$((SCORE - 15))
fi

# --- CHECK 4: No data-text-split on headings with inline HTML ---
if grep -Pq '<h[1-3][^>]*data-text-split[^>]*>.*<span' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("data-text-split on heading with inline HTML — will render raw code")
  SCORE=$((SCORE - 15))
fi

# --- CHECK 5: Clamp() usage on headings ---
CLAMP_COUNT=$(grep -c 'clamp(' "$HTML_FILE" 2>/dev/null || true)
if [[ "$CLAMP_COUNT" -lt 3 ]]; then
  ISSUES+=("Less than 3 clamp() uses found — headings may not auto-scale on mobile")
  SCORE=$((SCORE - 10))
fi

# --- CHECK 6: No horizontal scroll protection ---
if ! grep -q 'overflow-x.*hidden' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Missing 'overflow-x: hidden' on body — risk of horizontal scroll on mobile")
  SCORE=$((SCORE - 10))
fi

# Check for fixed pixels > 430px that could cause overflow
if grep -Pq '(max-width|width):\s*(4[4-9]\d|[5-9]\d{2,})px' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Found fixed width > 430px — risk of mobile overflow. Use max-width: 100% or clamp()")
  SCORE=$((SCORE - 10))
fi

# --- CHECK 7: Touch target sizes ---
# Warn if buttons smaller than 44px
BUTTON_SMALL=$(grep -Poc 'padding:\s*(0\.[1-3]|[01])rem' "$HTML_FILE" 2>/dev/null || true)
if [[ "$BUTTON_SMALL" -gt 5 ]]; then
  ISSUES+=("Small padding detected on interactive elements — touch targets may be < 44px")
  SCORE=$((SCORE - 5))
fi

# --- CHECK 8: WhatsApp float button ---
if ! grep -qi 'whatsapp\|25D366' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("No WhatsApp float button found — PH businesses need this")
  SCORE=$((SCORE - 5))
fi

# --- CHECK 9: Viewport meta tag ---
if ! grep -q 'viewport.*width=device-width' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Missing <meta viewport> tag — mobile rendering will break")
  SCORE=$((SCORE - 20))
fi

# --- CHECK 10: JSON-LD schema ---
if ! grep -q 'application/ld+json' "$HTML_FILE" 2>/dev/null; then
  ISSUES+=("Missing JSON-LD structured data — SEO handicap")
  SCORE=$((SCORE - 5))
fi

# --- CHECK 11: Mobile breakpoints exist ---
BP_COUNT=$(grep -Poc '@media.*max-width.*\d+px' "$HTML_FILE" 2>/dev/null || true)
if [[ "$BP_COUNT" -lt 3 ]]; then
  ISSUES+=("Less than 3 max-width media queries — mobile behavior not explicitly defined")
  SCORE=$((SCORE - 10))
fi

# --- REPORT ---
echo ""
echo "═══════════════════════════════════════"
echo "  QA GATE REPORT — Mobile-First"
echo "═══════════════════════════════════════"
echo "  File:  $HTML_FILE"
echo "  Size:  $(du -h "$HTML_FILE" | cut -f1)"
echo "  Score: $SCORE/100"
echo "  Clamp: $CLAMP_COUNT uses"
echo "  BP:    $BP_COUNT max-width queries"
echo "═══════════════════════════════════════"

if [[ ${#ISSUES[@]} -gt 0 ]]; then
  echo ""
  echo "  ISSUES FOUND:"
  for issue in "${ISSUES[@]}"; do
    echo "  ⚠  $issue"
  done
  echo ""
fi

# --- DECISION ---
THRESHOLD=75
if [[ "$SCORE" -ge "$THRESHOLD" ]]; then
  echo "✅ QA PASSED — score $SCORE >= $THRESHOLD"
  exit 0
else
  echo "❌ QA FAILED: score $SCORE < $THRESHOLD — deploy blocked." >&2
  exit 1
fi
