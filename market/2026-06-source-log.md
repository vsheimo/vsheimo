# Source Log: Kwork Market Fit, June 2026

Date of run: 2026-06-16.

This file is the anti-compression anchor for the task. If context is compacted, restart from this file, the prompt in `prompts/2026-06-kwork-market-fit-megaprompt-ru.md`, and the files in this `market/` directory.

## Source Classes

1. `live_kwork_project_html`: public Kwork project pages and project-search pages opened on 2026-06-16. The useful data was inside `window.stateData`.
2. `live_kwork_category_page`: public Kwork category pages opened on 2026-06-16. These confirm current category wording, minimum price framing and category existence, but not full competitor stats.
3. `historic_kwork_scrape`: local Kwork scrape from 2026-05-27 in `vsheimo profile/kwork_research`. This is the large competitor and card corpus.
4. `local_screenshot_order`: screenshots saved from Kwork order pages on 2026-06-15 in `spouse_kwork/assets/kwork_request_screenshots`.
5. `local_skill_evidence`: local profile and competency files in this repository.
6. `hypothesis`: analyst estimate or operator assumption. It must not be treated as a proven market fact.

## Live Public Sources

1. `https://kwork.ru/projects`
   - Opened: 2026-06-16.
   - Evidence: `window.stateData.exchangeStats`.
   - Extracted values: `projects=9141`, `orders=4310`, `value=94508500`, `period=30`.
   - Meaning: Kwork public marketplace activity over the last 30 days, as rendered by page state.

2. `https://kwork.ru/projects?keyword=excel`
   - Opened: 2026-06-16.
   - Evidence: live projects including handwritten journal to Excel, PDF to Excel, B2B base, Yandex report, marketplace card management.

3. `https://kwork.ru/projects?keyword=%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0`
   - Opened: 2026-06-16.
   - Evidence: live projects around tables, HTML analytics, bots, Google Sheets scripts.

4. `https://kwork.ru/projects?keyword=1%D1%81`
   - Opened: 2026-06-16.
   - Evidence: live projects around 1C integrations, 1C guide, CRM/Bitrix context.

5. `https://kwork.ru/projects?keyword=%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80`
   - Opened: 2026-06-16.
   - Evidence: live projects around contracts, tender/application constraints, sales-contract work.

6. `https://kwork.ru/projects?keyword=%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82`
   - Opened: 2026-06-16.
   - Evidence: live projects around certificate documents and related calls.

7. `https://kwork.ru/projects?keyword=crm`
   - Opened: 2026-06-16.
   - Evidence: live projects around amoCRM, lead routing, B2B clients.

8. `https://kwork.ru/projects?keyword=python`
   - Opened: 2026-06-16.
   - Evidence: live projects around Python parsing, DataLens, dev lead search.

9. `https://kwork.ru/projects?keyword=wordpress`
   - Opened: 2026-06-16.
   - Evidence: live projects around WordPress, SEO article placement, Supabase hotel pages, webarchive restore.

10. `https://kwork.ru/projects?keyword=%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5`
    - Opened: 2026-06-16.
    - Evidence: live projects around case templates, B2B branding, AI visuals.

11. `https://kwork.ru/projects?keyword=%D0%BF%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F`
    - Opened: 2026-06-16.
    - Evidence: live projects around Google Script email sending and LinkedIn SMM.

12. `https://kwork.ru/projects?keyword=%D0%BF%D0%B0%D1%80%D1%81%D0%B5%D1%80`
    - Opened: 2026-06-16.
    - Evidence: live projects around parsing and IT lead search.

13. `https://kwork.ru/projects?keyword=telegram%20bot`
    - Opened: 2026-06-16.
    - Evidence: live projects around Telegram bots, mini apps and startup buyer search.

14. `https://kwork.ru/for-sellers`
    - Opened: 2026-06-16.
    - Evidence: public seller page says there are no paid freelancer accounts/subscriptions and Kwork takes commission only from completed and paid orders.
    - Debt: exact seller commission percent must be checked in the seller account or official help. Do not claim a percent from memory.

15. `https://kwork.ru/categories/software/office-excel`
    - Opened: 2026-06-16.
    - Page title: `Заказать макросы для Excel от 500 руб. - Kwork`.

16. `https://kwork.ru/categories/script-programming/parsery`
    - Opened: 2026-06-16.
    - Page title: `Парсеры на заказ от 500 руб. - Kwork`.

17. `https://kwork.ru/categories/script-programming/ii-agenty`
    - Opened: 2026-06-16.
    - Page title: `ИИ-агенты на заказ от 500 руб. - Kwork`.

18. `https://kwork.ru/categories/personal-assistant/rabota-v-ms-office`
    - Opened: 2026-06-16.
    - Page title: `Работа в MS Office на заказ от 500 руб. - Kwork`.

19. `https://kwork.ru/categories/business-copywriting/kommercheskie-predlozheniya`
    - Opened: 2026-06-16.
    - Page title: `Текст коммерческого предложения на заказ от 500 руб. - Kwork`.

20. `https://kwork.ru/categories/presentations-infographics/prezentatsii`
    - Opened: 2026-06-16.
    - Page title: `Презентации на заказ от 500 руб. - Kwork`.

21. `https://kwork.ru/categories/e-commerce-social-network/dizayn-dlya-marketpleysov`
    - Opened: 2026-06-16.
    - Page title: `Дизайн для маркетплейсов на заказ от 500 руб. - Kwork`.

## Local Sources

1. `prompts/2026-06-kwork-market-fit-megaprompt-ru.md`
   - Main execution prompt.

2. `PROMPT_KWORK_MARKET_FIT_2026-06.md`
   - Raw prompt material from the user/Claude competition.

3. `COMPETENCY_MAP.md`
   - Vlad capabilities: B2B sales, commercial architecture, moderation, AI/Codex, product work.

4. `KWORK_SERVICES.md`
   - Existing Vlad service map.

5. `PERIPHERAL_SKILLS.md`
   - Skill boundaries: what can be claimed, what must not be claimed.

6. `PROOF_BACKLOG.md`
   - Missing proof list for profile and portfolio.

7. `spouse_kwork/05_KWORK_FULL_COPY_CARDS_RU.md`
   - Full existing Nastya Kwork copy cards.

8. `spouse_kwork/12_KWORK_REQUEST_EXAMPLES_FROM_SCREENSHOTS_RU.md`
   - Order examples transcribed from screenshots and mapped into Kwork directions.

9. `spouse_kwork/assets/kwork_request_screenshots/*.png`
   - Saved screenshots of Kwork orders, 15 files.

10. `vsheimo profile/kwork_research/kwork_market_priority_relevant.csv`
    - Historic Kwork scrape.
    - File modified: 2026-05-27 15:52:44.
    - Rows: 6904.

11. `vsheimo profile/kwork_research/kwork_market_core_relevant.csv`
    - Historic Kwork scrape.
    - File modified: 2026-05-27 15:52:44.
    - Rows: 7199.

12. `vsheimo profile/kwork_research/kwork_market_audit.csv`
    - Historic Kwork scrape.
    - Rows: 7316.

13. `vsheimo profile/kwork_research/category_summary.csv`
    - 125 category rows.

14. `vsheimo profile/kwork_research/KWORK_PRIORITY_RELEVANT_REPORT.md`
    - Local market summary from previous audit.

## Current Market Quant Snapshot

From `https://kwork.ru/projects` on 2026-06-16:

| metric | value |
|---|---:|
| public projects in state | 9141 |
| public orders in state | 4310 |
| value in state | 94508500 RUB |
| period | 30 days |

From `vsheimo profile/kwork_research/kwork_market_priority_relevant.csv` on 2026-05-27:

| area | matched cards | median visible price | p80 visible price | max reviews |
|---|---:|---:|---:|---:|
| office_excel | 47 | 7000 | 13400 | 3073 |
| ai_automation | 116 | 7000 | 14600 | 1901 |
| b2b_cp | 379 | 10000 | 28000 | 20646 |
| contracts/legal-adjacent | 8 | 9000 | 36000 | 920 |
| content_cards | 246 | 7000 | 14000 | 3501 |
| lead_search | 95 | 7000 | 12800 | 5448 |
| presentations | 147 | 6000 | 13000 | 10252 |
| tz_struct | 31 | 6000 | 17400 | 675 |
| crm_sales | 84 | 7000 | 15000 | 5448 |
| parsing_data | 133 | 6000 | 12000 | 7345 |

## What Was Not Fully Verified

1. Exact Kwork seller commission percent: not claimed as fact.
2. Full active order universe: only public project pages by keywords were extracted.
3. Competitor current counters on 2026-06-16: competitor table uses the 2026-05-27 local scrape and live category existence checks.
4. Private Telegram data: not used in this pass.

