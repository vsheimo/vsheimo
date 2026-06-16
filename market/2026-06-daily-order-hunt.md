# Daily Order Hunt

## Search Keywords

### Nastya

1. `ОСВ`
2. `акт сверки`
3. `1с`
4. `бухгалтер`
5. `дебиторка`
6. `кредиторка`
7. `УПД`
8. `договор`
9. `протокол разногласий`
10. `сертификат`
11. `тендер`
12. `статистика`
13. `факторный анализ`
14. `банковское дело`
15. `WordPress статья`
16. `карточки товара`

### Vlad

1. `Codex`
2. `Claude`
3. `AI агент`
4. `n8n`
5. `CRM`
6. `amoCRM`
7. `python парсер`
8. `telegram bot`
9. `техническое задание`
10. `Гант`
11. `коммерческое предложение`
12. `B2B`
13. `лиды`
14. `поиск клиентов`
15. `DataLens`
16. `Supabase`
17. `React`

## Fast Filter

Take if:

1. Budget / estimated hours >= 1200 RUB/hour.
2. Scope can be made checkable.
3. Client has at least some hiring history or the task is tiny.
4. No illegal access, no EDS, no guaranteed outcome.

Skip if:

1. "Найдите клиентов и гарантируйте продажу".
2. "Сделайте под ключ" but budget covers only discovery.
3. "Срочно за 1000" with unclear files.
4. Engineering/legal responsibility without proper role.
5. Requires credentials without safe access.

## Response Workflow

1. Read task.
2. Classify: Vlad, Nastya, shared, skip.
3. Write boundary in first 2 lines.
4. Ask for exact inputs.
5. Offer a small first stage.
6. Save URL and response.

