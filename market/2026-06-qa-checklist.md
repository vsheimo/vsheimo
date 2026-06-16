# QA Checklist

Checked on: 2026-06-16.

| gate from prompt section 16 | status | evidence |
|---|---|---|
| >=30 orders | passed | `market/2026-06-kwork-orders-ledger.csv`: 42 data rows |
| >=15 competitors | passed | `market/2026-06-competitor-ledger.csv`: 24 data rows |
| Directions evaluated by 12 criteria | passed | `market/2026-06-kwork-priority-matrix.md`: 12 directions, 12 criteria |
| Every claim source / hypothesis / verify | passed with debt | `market/2026-06-source-log.md`, `market/2026-06-debt-and-iterations.md` |
| Effective rate for each direction | passed gross | `market/2026-06-kwork-priority-matrix.md`; net commission is `ПРОВЕРИТЬ` |
| Opponent buried >=5 directions | passed | 7 buried directions in priority matrix |
| Payment mode indicated | passed | orders CSV has `pay_mode`, account split has operating rule |
| Private data anonymized | passed | no raw private docs committed |
| CSV valid | passed | parsed with Python csv, no bad row widths |
| Markdown files open | passed | all files present under `market/` and `vlad_kwork/` |
| Debt journal filled | passed | `market/2026-06-debt-and-iterations.md` |
| Version conflicts marked | passed | no files from Claude lane overwritten; new Codex files created |

## CSV Validation Result

1. `market/2026-06-kwork-orders-ledger.csv`: 42 data rows, 18 columns, 0 malformed rows.
2. `market/2026-06-competitor-ledger.csv`: 24 data rows, 15 columns, 0 malformed rows.

## Final Opponent Check

Opponent signs the result as an analysis package, not as final market truth.

Allowed:

1. Use this package to publish first Kworks.
2. Use response templates for first 72 hours.
3. Use order ledger for daily hunting.

Not allowed:

1. Claim exact seller commission until checked.
2. Claim Nastya education proof until document is found.
3. Treat 2026-05-27 competitor scrape as exact 2026-06-16 counters.
4. Take legal/engineering/cold-call jobs outside the written boundaries.

