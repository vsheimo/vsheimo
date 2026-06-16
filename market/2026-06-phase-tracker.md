# Phase Tracker: Kwork Market Fit

Date: 2026-06-16.
Branch: `codex/kwork-market-fit-2026-06`.
Purpose: keep the Kwork analysis auditable after context loss, Claude/Codex divergence, and future rewrites.

## Anti-Compression Anchor

If the chat context is compressed, do not rely on memory. Re-open these files first:

1. `prompts/2026-06-kwork-market-fit-megaprompt-ru.md`
2. `market/2026-06-source-log.md`
3. `market/2026-06-qa-checklist.md`
4. `market/2026-06-kwork-market-map.md`
5. `market/2026-06-kwork-priority-matrix.md`
6. `market/2026-06-kwork-orders-ledger.csv`
7. `market/2026-06-competitor-ledger.csv`
8. `market/2026-06-debt-and-iterations.md`
9. `spouse_kwork/13_MARKET_FIT_UPDATE_2026_06.md`
10. `vlad_kwork/2026-06-kwork-cards-draft.md`
11. `market/2026-06-raw-material-decision-map.md`
12. `market/2026-06-adversarial-business-game.md`

## Phase Status

| phase | status | what exists | debt |
|---|---|---|---|
| F0. Repo reconnaissance | partial-done | `capability-ledger`, `open-questions`, repo files read | parent folders and private Telegram exports were not fully re-read in this pass |
| F1. Demand collection | done-with-boundary | `orders-ledger.csv`, 42 order rows | not exhaustive logged-in Kwork export |
| F2. Competitors | done-with-boundary | `competitor-ledger.csv`, 24 competitor rows | many competitor counters are from local 2026-05-27 scrape, not fresh 2026-06-16 |
| F3. Scoring | done-with-boundary | `priority-matrix`, 12 criteria | effective rate is gross estimate where commission/tax is unresolved |
| F4. Opponent | done | 7 directions buried | needs deeper premortem before rewriting copy |
| F5. Account split | done | `account-split.md` | tax/channel setup still operator decision |
| F6. Packaging | partial | Nastya update, Vlad draft, response templates | full copy-paste Kwork cards need rewrite after approval |
| F7. Synthesis | done | A/B/C/D/X, 7/30/90 roadmap, KPI | needs real response results after 3-7 days |
| F8. Verification | done | `qa-checklist.md` and CSV validation | source quality gaps remain named, not closed |
| F9. Git | done | commit `0076ee7`, pushed branch | current tracker layer not yet merged into strategy |
| F10. Adversarial review | in-progress | this tracker + business-game file | waiting for operator approval on which improvements to execute |

## What Was Actually Read Or Used

### Megaprompt And Control Files

1. `prompts/2026-06-kwork-market-fit-megaprompt-ru.md`
   - Used as the main contract: quotas, phases, roles, output files, CSV schemas, QA gates.
2. `PROMPT_KWORK_MARKET_FIT_2026-06.md`
   - Used as earlier raw version of the same market-fit task.
3. `CODEX_PROMPTS/KWORK_COMPETITOR_RESEARCH.md`
   - Used to preserve the old rule: do not scrape Kwork if public restrictions prohibit it; use manual/public data carefully.

### Created Market Package

1. `market/2026-06-kwork-market-map.md`
   - Current top-level conclusion and account split.
2. `market/2026-06-kwork-priority-matrix.md`
   - Weighted scores, A/B/C/D/X, roadmap and opponent burial.
3. `market/2026-06-kwork-orders-ledger.csv`
   - 42 order-like rows.
4. `market/2026-06-competitor-ledger.csv`
   - 24 competitor-like rows.
5. `market/2026-06-source-log.md`
   - Most important boundary file: what is fact, what is historic, what is not verified.
6. `market/2026-06-debt-and-iterations.md`
   - Debts that must not disappear.
7. `market/2026-06-open-questions.md`
   - Operator questions.
8. `market/2026-06-evidence-pack.md`
   - Proof artifacts to build before aggressive publication.
9. `market/2026-06-risk-register.md`
   - Legal, tax, identity and privacy risks.
10. `market/2026-06-response-templates.md`
    - First-response templates for exchange orders.

### Nastya Kwork Materials

1. `spouse_kwork/05_KWORK_FULL_COPY_CARDS_RU.md`
   - Important but partly outdated copy-paste Kwork cards.
2. `spouse_kwork/12_KWORK_REQUEST_EXAMPLES_FROM_SCREENSHOTS_RU.md`
   - Strong raw material from real Kwork screenshots.
3. `spouse_kwork/13_MARKET_FIT_UPDATE_2026_06.md`
   - Current bridge from broad student-work positioning to accounting/document-first positioning.
4. `spouse_kwork/00_CLAUDE_PASS_DELTA_RU.md`
   - Claude delta and evidence notes. Use as raw material, not canon.

### Vlad Kwork Materials

1. `vlad_kwork/2026-06-kwork-cards-draft.md`
   - Current drafts for Vlad: ТЗ/Gantt/Codex, AI/Codex workflow, B2B КП.
2. `research/KWORK_POSITIONING_REPORT.md`
   - Older no-scrape competitor positioning report.

## Data Path: Where The Analysis Went

1. Live public Kwork pages were checked on 2026-06-16.
2. Public `window.stateData.exchangeStats` from Kwork project pages was used for broad activity numbers.
3. Keyword/project pages were used for live order examples where accessible.
4. Local historical scrape `vsheimo profile/kwork_research` from 2026-05-27 was used for competitor/category shape.
5. User-provided Kwork screenshots were converted into order patterns and response templates.
6. Repo materials were used to match orders to actual capabilities.
7. CSV files were validated locally for required schema and row counts.

## Current Strong Conclusions

1. We should not publish "everything for everyone".
2. Nastya's strongest public face is accounting, 1C-adjacent tables, OSV, acts, mutual settlements, contracts and document packets.
3. Vlad's strongest public face is task decomposition, ТЗ/Gantt, Codex/AI workflows, B2B offer architecture and controlled automation.
4. Passive Kwork cards are not enough. First money should come from daily exchange responses.
5. Some directions are useful only as secondary responses, not as core cards.

## Current Weak Points

1. Exact Kwork commission/tax net economics is not closed.
2. Fresh competitor counters for 2026-06-16 are not fully closed.
3. Nastya education/accounting proof is not attached yet.
4. Portfolio examples are named but not produced.
5. We have not yet run a 3-7 day response experiment.
6. Current Kwork copy is not yet reconciled into final copy-paste cards after the new market matrix.

## Approval Gate

Before rewriting the main Kwork cards, the operator should approve which improvement track to run:

1. `A1`: fresh competitor and order refresh.
2. `A2`: net economics with commission/tax.
3. `A3`: rewrite top 5 Kwork cards as copy-paste blocks.
4. `A4`: build response tracker and daily hunt routine.
5. `A5`: build proof artifacts and portfolio examples.
6. `A6`: reconcile Claude vs Codex into one canon.
