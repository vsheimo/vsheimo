# Account Split: Vlad vs Nastya

## Operating Rule

One task can use both people, but the market face must stay clear.

1. Nastya account sells accounting, documents, business tables, contracts, student finance/economics calculations.
2. Vlad account sells AI/Codex, B2B packaging, technical task decomposition, CRM/data automation and prototypes.

## Nastya Account

### Keep

1. ОСВ, акты сверки, дебиторка, кредиторка, УПД, счета, 1С.
2. Excel/Sheets with business context.
3. Договоры поставки, ИТ-договоры, протоколы разногласий, трехсторонние договоры.
4. УФАС, Корпорация МСП, АНО, сертификация: as document package and logic.
5. Student work: statistics, theory of probability, factor analysis, banking, accounting, law-adjacent text.

### Do Not Say

1. "Юрист под ключ".
2. "Гарантирую выигрыш".
3. "Сделаю сертификат".
4. "Подпишу вашей ЭЦП".
5. "Любые студенческие работы".

### Say Instead

```text
Разберу документы, цифры и порядок действий. Если нужно, соберу таблицу, хронологию, протокол разногласий, список спорных пунктов и пакет вопросов, чтобы дальше не гадать на глазах.
```

## Vlad Account

### Keep

1. AI/Codex workflows.
2. ТЗ, Gantt, requirements matrix.
3. КП, B2B offer, кейсы.
4. CRM/data automation.
5. Parsing/Python/React/WordPress only after scope control.

### Do Not Say

1. "Сделаю любой сайт".
2. "Сделаю любого бота".
3. "Гарантирую клиентов".
4. "Заменю агентство".

### Say Instead

```text
Сначала раскладываю задачу на данные, действия, ограничения и результат. Потом делаю то, что можно проверить: таблицу, ТЗ, прототип, промпт для Codex, CRM-схему, КП или короткий рабочий сценарий.
```

## Routing Rules

| incoming request | public account | internal helper | rule |
|---|---|---|---|
| ОСВ/акт/1С/УПД | Nastya | Vlad for scripts | Nastya owns answer |
| Excel with formulas only | Nastya | Vlad for macro/API | Nastya owns answer |
| Python/React/API | Vlad | Nastya only for accounting logic | Vlad owns answer |
| Contract/protocol/UFAС | Nastya | Vlad for structure | Nastya owns answer |
| КП/GTM/B2B offer | Vlad | Nastya if finance/documents | Vlad owns answer |
| WordPress article/card upload | Nastya | Vlad if site breaks | Nastya owns answer |
| AI agent/automation | Vlad | Nastya if accounting domain | Vlad owns answer |

## Payment Channel

1. For Nastya account: IP Nastya where relevant.
2. For Vlad account: self-employed transfer if task is Vlad-facing.
3. If delivery uses both: client still sees one responsible account. Internal split is not part of the offer.

Debt: check tax and marketplace rules before scaling. This file is operational positioning, not tax advice.

