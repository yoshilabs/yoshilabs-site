#!/usr/bin/env bash
# qa-gate.sh — QA gate: reads qa-report.json, exits 0 if score >= 90, else 1
# Usage: ./qa-gate.sh [path-to-client-dir]
#   Defaults to CWD. Expects qa-report.json in the dir.
#   Exit 0 = pass (deploy allowed), Exit 1 = blocked

set -euo pipefail

CLIENT_DIR="${1:-$(pwd)}"
QA_REPORT="${CLIENT_DIR}/qa-report.json"

if [[ ! -f "$QA_REPORT" ]]; then
  echo "❌ qa-report.json not found at $QA_REPORT" >&2
  exit 1
fi

SCORE=$(node -e "
  const qa = require('${QA_REPORT}');
  const score = qa.score;
  if (typeof score !== 'number' || isNaN(score)) {
    process.stderr.write('❌ qa-report.json missing or invalid \"score\" field\n');
    process.exit(2);
  }
  console.log(score);
")

THRESHOLD=90

if [[ "$SCORE" -ge "$THRESHOLD" ]]; then
  echo "✅ QA PASSED — score $SCORE >= $THRESHOLD"
  exit 0
else
  echo "❌ QA FAILED: score $SCORE — blocked from deploy." >&2
  exit 1
fi
