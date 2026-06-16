# Kwork Priority Matrix

Scoring scale: 1 low, 5 high. Weighted score max: 500.

Weights:

| criterion | weight |
|---|---:|
| skill_fit | 10 |
| proof_strength | 10 |
| live_demand | 10 |
| competition_inverse | 10 |
| speed_to_publish | 8 |
| risk_inverse | 8 |
| ticket_quality | 8 |
| repeatability | 8 |
| differentiation | 8 |
| delivery_speed | 8 |
| account_clarity | 6 |
| portfolio_readiness | 6 |

`effective_rub_per_hour` is an estimate from observed median/p80 order or competitor price divided by delivery hours. It is marked as analyst estimate, not a market fact.

| rank | direction | account | skill_fit | proof_strength | live_demand | competition_inverse | speed_to_publish | risk_inverse | ticket_quality | repeatability | differentiation | delivery_speed | account_clarity | portfolio_readiness | weighted_score | source_budget_rub | est_hours | effective_rub_per_hour | decision |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | AI/Codex workflow, ТЗ, prototype, CRM/data glue | Vlad | 5 | 4 | 5 | 3 | 4 | 3 | 5 | 5 | 5 | 3 | 5 | 4 | 422 | 14600 | 8 | 1825 | WIN |
| 2 | B2B offer, КП, кейс, GTM/discovery | Vlad | 5 | 4 | 5 | 3 | 5 | 4 | 4 | 4 | 5 | 4 | 5 | 4 | 426 | 28000 | 12 | 2333 | WIN |
| 3 | Бухгалтерские таблицы: ОСВ, акты сверки, дебиторка, УПД, 1С | Nastya | 5 | 4 | 4 | 4 | 5 | 4 | 3 | 4 | 5 | 4 | 5 | 4 | 428 | 7000 | 4 | 1750 | WIN |
| 4 | Excel/Sheets: formulas, pivots, cleanup, light macros, CRM sync | Nastya + Vlad | 4 | 3 | 5 | 3 | 5 | 4 | 3 | 5 | 3 | 5 | 4 | 3 | 384 | 7000 | 5 | 1400 | TAKE |
| 5 | Документы: договоры, протокол разногласий, УФАС, сертификация | Nastya | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 3 | 5 | 3 | 5 | 3 | 378 | 9000 | 6 | 1500 | TAKE_WITH_BOUNDARY |
| 6 | ТЗ, структура, Гант, mind map, постановка задач | Vlad | 5 | 4 | 4 | 3 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | 4 | 418 | 6000 | 4 | 1500 | WIN |
| 7 | Python parsing, API, debug, data pipeline | Vlad | 4 | 3 | 5 | 2 | 3 | 3 | 4 | 4 | 3 | 3 | 4 | 3 | 334 | 12000 | 10 | 1200 | PARITY |
| 8 | WordPress/content/cards/product upload/SEO text placement | Nastya | 3 | 3 | 5 | 2 | 5 | 4 | 2 | 4 | 3 | 5 | 4 | 3 | 336 | 7000 | 4 | 1750 | TAKE_FOR_BIRZA |
| 9 | Поиск клиентов, лиды, B2B база, first touch | Vlad | 4 | 3 | 5 | 2 | 4 | 3 | 4 | 4 | 3 | 3 | 4 | 3 | 342 | 12800 | 8 | 1600 | TAKE_TESTS_ONLY |
| 10 | Учебные работы: статистика, тервер, факторный анализ | Nastya | 4 | 2 | 3 | 3 | 5 | 4 | 2 | 3 | 3 | 4 | 4 | 2 | 312 | 5000 | 5 | 1000 | PARITY |
| 11 | Банковское дело: учебные расчеты, продукты, платежи | Nastya | 4 | 2 | 3 | 4 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | 2 | 318 | 5000 | 5 | 1000 | PARITY |
| 12 | Презентации and pitch decks as design deliverable | Vlad | 3 | 3 | 4 | 2 | 3 | 4 | 4 | 3 | 3 | 3 | 3 | 2 | 294 | 13000 | 10 | 1300 | LOSE_AS_DESIGN |

## Direction Details

### 1. AI/Codex Workflow, ТЗ, Prototype

Best for Vlad. Live orders show AI-agent, amoCRM, Python parser, WordPress/Supabase, Telegram bot, DataLens. Historic market shows AI automation median price 7000 and p80 14600. Do not sell "I make any AI". Sell a controlled artifact: audit, prompt, repo plan, prototype, test, handoff.

### 2. B2B Offer, КП, Case, GTM Discovery

Best for Vlad. The market is crowded with copywriters, but Vlad's edge is not copy. Edge: B2B context, buyer logic, commercial offer, objections, proof, operator-led AI production.

### 3. Бухгалтерские Таблицы and 1С

Best for Nastya. This is the cleanest Kwork identity for her: not "student works for everything", but "I bring accounting tables and documents to order". Use OSV, acts of reconciliation, debit/credit, AP/AR, UПД, accounts, marketplace accounting, tax calculations.

### 4. Excel/Sheets Automation

Shared. Nastya owns business/accounting context; Vlad owns automation, scripts and Codex. Create one Kwork under Nastya if positioned as tables; route complex automation to Vlad internally.

### 5. Documents, Contracts, Disagreements, UFAС, Certification

Nastya can sell document order and analysis. The boundary must be explicit: no guarantee of court outcome, no substitute for licensed legal representation where required, no use of client's EDS.

### 6. ТЗ, Structure, Gantt, Mind Map

Vlad's fast entry. This direction catches engineering-project requests without taking engineering responsibility. Deliver: structured ТЗ, questions, requirements matrix, Gantt, acceptance criteria, Codex prompt.

## Opponent Burial: 5 Directions Not to Push Now

1. Generic Telegram bots.
   - Reason: historic competitor Yantu has 3266 reviews. We do not have comparable public proof.
   - Better: AI/Codex workflow or bot ТЗ/prototype.

2. Pure WordPress technical work.
   - Reason: WordPress sellers have thousands of reviews. Live orders often hide backend, plugins, PHP and hosting risk.
   - Better: content placement, structure, SEO brief, audit, lightweight fixes only.

3. Cold calls as a service.
   - Reason: low control, high emotional cost, not our strongest deliverable.
   - Better: script, ICP, lead table, CRM funnel.

4. Marketplace card design as design.
   - Reason: design-card competitors have proof-heavy profiles.
   - Better: card meanings, text, table, source photos, ТЗ to designer.

5. Full legal representation / guaranteed arbitration result.
   - Reason: high professional and reputational risk.
   - Better: chronology, contract risks, table of claims, protocol of disagreements, draft questions for counsel.

6. Full engineering project under ГОСТ/СНиП.
   - Reason: license/professional responsibility risk.
   - Better: ТЗ, source data checklist, questions for engineer.

7. Ultra-cheap prompt tasks at 1000 RUB.
   - Reason: too much communication overhead, effective rate often lower than useful work.
   - Better: template pack or higher-ticket prompt audit.

Opponent signature: quota passed for burial. Seven directions were buried, not five.

## A/B/C/D/X Matrix

| class | directions | action |
|---|---|---|
| A | Nastya ОСВ/1С; Vlad ТЗ/Gantt/Codex; Vlad B2B КП/GTM; Vlad AI/Codex workflow | Publish or prepare immediately |
| B | Nastya Excel/Sheets; Nastya documents/contracts/certification; Vlad parsing/API after audit | Use in first 72-hour order hunt and publish after one proof artifact |
| C | Nastya student statistics/banking; Nastya WordPress/content/cards; Vlad presentations as structure | Keep as secondary, respond only when scope is clear |
| D | Generic WordPress dev; generic Telegram bots; cold calls | Do not publish as core Kwork |
| X | Court guarantees; engineering project under ГОСТ/СНиП; чужая ЭЦП; guaranteed sales | Refuse or reframe into safe document/TZ work |

## Roadmap 7/30/90

### 7 Days

1. Publish top 2 Nastya cards: ОСВ/1С and documents/contracts/certification.
2. Publish top 2 Vlad cards: ТЗ/Gantt/Codex and AI/Codex workflow.
3. Send 50 targeted responses from `market/2026-06-daily-order-hunt.md`.
4. Build 4 proof artifacts: ОСВ sample, contract/protocol sample, ТЗ/Gantt sample, Codex workflow sample.

### 30 Days

1. Measure response conversion by direction.
2. Kill or rewrite cards with zero messages.
3. Add Excel/Sheets and B2B КП cards if proof is ready.
4. Build a small public portfolio folder with only anonymized evidence.
5. Re-run competitor scrape and update exact counters.

### 90 Days

1. Split offers into repeatable packages.
2. Raise minimum effective rate floor to 1500 RUB/hour gross.
3. Move repeat clients off random one-off work into monthly support where platform/payment rules allow.
4. Turn successful Kwork response templates into profile copy and case cards.

## KPI

| period | metric | target |
|---|---|---:|
| first 7 days | targeted responses sent | 50 |
| first 7 days | first replies | 5 |
| first 7 days | paid orders | 1 |
| first 30 days | published cards | 6 |
| first 30 days | anonymized proof artifacts | 8 |
| first 30 days | gross effective rate floor | 1200 RUB/hour |
| first 90 days | repeated buyers | 3 |
| first 90 days | cards killed or rewritten from data | 3 |

## Files To Update Next

1. `spouse_kwork/05_KWORK_FULL_COPY_CARDS_RU.md`: rewrite after market-fit update.
2. `vlad_kwork/2026-06-kwork-cards-draft.md`: expand to full Kwork fields.
3. `market/2026-06-kwork-orders-ledger.csv`: add results of real responses.
4. `market/2026-06-competitor-ledger.csv`: refresh current counters.
5. `market/2026-06-evidence-pack.md`: link final proof artifacts.
