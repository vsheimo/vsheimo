import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const ROOT = "/Users/vladislavsheimo/Documents/New project 2/vsheimo";
const out = (...parts) => path.join(ROOT, ...parts);

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/[–—]/g, "-")
    .replace(/\r/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.replace(/^\uFEFF/, ""));
  return rows.slice(1).filter((r) => r.some((x) => x !== "")).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = clean(r[i] ?? "");
    });
    return obj;
  });
}

function toCsv(rows, headers) {
  const esc = (value) => {
    const s = clean(value);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return `${headers.join(",")}\n${rows.map((r) => headers.map((h) => esc(r[h])).join(",")).join("\n")}\n`;
}

async function readCsv(rel) {
  return parseCsv(await fs.readFile(out(rel), "utf8"));
}

function num(value) {
  const n = Number(clean(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function money(value) {
  const n = num(value);
  if (!n) return "";
  return new Intl.NumberFormat("ru-RU").format(Math.round(n));
}

function moneyRange(row) {
  const min = num(row.budget_min);
  const max = num(row.budget_max);
  if (min && max && min !== max) return `${money(min)}-${money(max)} руб.`;
  if (max) return `${money(max)} руб.`;
  if (min) return `${money(min)} руб.`;
  return "ПРОВЕРИТЬ";
}

function accountRu(value) {
  const v = clean(value).toLowerCase();
  if ((v.includes("vlad") || v.includes("влад")) && (v.includes("nastya") || v.includes("наст"))) return "Влад + Настя";
  if (v.includes("vlad+") || v.includes("+vlad")) return "Влад + Настя";
  if (v.includes("nastya") || v.includes("наст")) return "Настя";
  if (v.includes("vlad") || v.includes("влад")) return "Влад";
  if (v.includes("shared") || v.includes("both")) return "оба";
  if (v.includes("skip")) return "не наш профиль";
  return clean(value) || "ПРОВЕРИТЬ";
}

function displayDirection(direction) {
  const d = clean(direction);
  const map = {
    "B2B, КП, лиды": "бизнес-клиенты, КП, лиды",
    "AI, боты, CRM": "ИИ, боты, CRM",
    "Web, WordPress, SEO": "сайт, WordPress, SEO",
    "ТЗ, структура, Gantt": "ТЗ, структура, Гант",
  };
  return map[d] || d;
}

function marketAccount(direction, account) {
  const d = clean(direction);
  if (d === "B2B, КП, лиды") return "Влад";
  if (d === "AI, боты, CRM") return "Влад";
  if (d === "Python, парсинг, данные") return "Влад";
  if (d === "ТЗ, структура, Gantt") return "Влад";
  if (d === "Маркетинговая аналитика") return "Влад";
  if (d === "Документы, договоры, заявки") return "Настя";
  if (d === "Excel и таблицы") return "Настя + Влад";
  if (d === "1С, учет, ОСВ, акты") return "Настя + Влад";
  if (d === "Маркетплейсы") return "Настя + Влад";
  return accountRu(account);
}

function sourceRu(value) {
  const v = clean(value);
  if (v === "LIVE+CODEX") return "живой слой + старый реестр";
  if (v === "LIVE") return "живой слой";
  if (v === "CODEX") return "старый реестр";
  return v || "архив";
}

function competitionRu(value, offers) {
  const v = clean(value).toLowerCase();
  if (v === "low") return "низкая";
  if (v === "mid") return "средняя";
  if (v === "high") return "высокая";
  if (v === "red") return "красный океан";
  const n = num(offers);
  if (n && n <= 5) return "низкая";
  if (n && n <= 20) return "средняя";
  if (n && n <= 60) return "высокая";
  if (n) return "красный океан";
  return "ПРОВЕРИТЬ";
}

function decisionRu(value) {
  const v = clean(value).toUpperCase();
  if (v.includes("MIXED")) return "смешанный: Настя витрина, Влад биржа";
  if (v.includes("TAKE ONLY")) return "брать только с границами";
  if (v.includes("BURY")) return "не брать";
  if (v.includes("DISCOVERY")) return "только платный разбор";
  if (v.includes("TAKE FIRST")) return "брать сегодня";
  if (v.includes("TAKE WITH SCOPE")) return "брать с границами";
  if (v === "TAKE") return "брать";
  if (v.includes("LOW PRIORITY")) return "низкий приоритет";
  if (v.includes("WIN")) return "сильное направление";
  if (v.includes("PARITY")) return "брать точечно";
  if (v.includes("REVIEW")) return "проверить";
  if (v.includes("SKIP")) return "не наш профиль";
  return clean(value) || "проверить";
}

function decisionForDirection(direction, value) {
  const d = clean(direction);
  if (d === "Excel и таблицы") return "брать только таблицы с формулами, сверкой, CRM или автоматизацией";
  return decisionRu(value);
}

function decisionForOrder(row) {
  const d = clean(row.direction);
  const raw = clean(row.decision).toUpperCase();
  if (d === "Excel и таблицы" && raw.includes("BURY")) return "не брать ручной ввод";
  if (d === "Excel и таблицы") return "брать, если есть формулы, сверка или автоматизация";
  return decisionRu(row.decision);
}

function riskRu(value, row = {}) {
  const v = clean(value).toLowerCase();
  if (v === "low") return "низкий";
  if (v === "med" || v === "medium") return "средний";
  if (v === "high") return "высокий";
  if (clean(row.competition) === "red") return "высокий";
  return clean(value) || "ПРОВЕРИТЬ";
}

function channelRu(row) {
  const account = marketAccount(row.direction, row.account);
  const direction = clean(row.direction);
  if (account === "Настя" && direction.includes("1С")) return "витрина Насти, биржа точечно";
  if (account === "Настя") return "аккаунт Насти";
  if (account === "Влад") return "аккаунт Влада";
  if (account === "Влад + Настя") return "один аккаунт с внутренней помощью";
  if (account === "Настя + Влад") return "аккаунт Насти, Влад помогает с техникой";
  if (account === "оба") return "один аккаунт с внутренней помощью";
  return "не выходить без проверки";
}

function directionProfile(direction) {
  const d = clean(direction);
  const profiles = {
    "1С, учет, ОСВ, акты": {
      why: "Есть сильный бытовой и рабочий контекст: 1С, ОСВ, акты сверки, дебиторка, кредиторка, УПД, счета, налоги.",
      action: "Попросить выгрузку, период, счет, контрагента, версию 1С и проблему словами. Делать таблицу расхождений, не гадать по скриншоту.",
      proof: "Обезличенная ОСВ 62, акт сверки, таблица кто кому сколько и по каким документам.",
      inputs: "выгрузка, период, счет, контрагент, версия 1С, что именно не сходится",
    },
    "Excel и таблицы": {
      why: "Брать не ручной ввод, а таблицы со смыслом: формулы, сводные, склейка файлов, контроль статусов, CRM, 1С, макросы или веб-хук.",
      action: "Попросить файл до, пример результата и правило расчета. Начинать с одного листа или 20 строк.",
      proof: "Демо таблица: исходник, формулы, сводная, проверка ошибок, лист с инструкцией.",
      inputs: "исходные файлы, пример результата, правила расчета, частота обновления",
    },
    "Документы, договоры, заявки": {
      why: "Сильная зона Насти: договоры поставки, ИТ-договоры, протоколы разногласий, трехсторонние договоры, УФАС, МСП, АНО.",
      action: "Разобрать документы в таблицу: пункт, риск, что просим заменить, почему, что спросить до подписи.",
      proof: "Протокол разногласий и таблица рисков по обезличенному договору.",
      inputs: "договор, приложения, счет, акт, цель правки, красные пункты",
    },
    "B2B, КП, лиды": {
      why: "Влад силен не в копирайтинге ради текста, а в логике сделки: кому продаем, почему поверят, какой следующий шаг.",
      action: "Собрать ICP, тестовую базу 20 строк, источник, статус проверки и текст первого касания.",
      proof: "Демо база 20 строк, структура КП, пример первого сообщения.",
      inputs: "кому продаем, география, запреты, признаки клиента, нужные контакты",
    },
    "AI, боты, CRM": {
      why: "Брать только как управляемый процесс: аудит, схема, один сценарий, тесты, затем оценка.",
      action: "Не обещать волшебного бота. Сначала карта процесса, входы, CRM, статусы, прототип одного сценария.",
      proof: "Схема процесса, тестовый сценарий, таблица проверок, короткий Codex-промпт.",
      inputs: "каналы заявок, CRM, 5-10 примеров, желаемый статус, ограничения доступов",
    },
    "Python, парсинг, данные": {
      why: "Хорошая зона Влада, если есть четкий источник, формат результата и допустимость сбора.",
      action: "Начинать с MVP одного источника: CSV, лог ошибок, ограничения, затем масштабирование.",
      proof: "Мини-парсер, CSV до/после, лог ошибок, README как запускать.",
      inputs: "источник, пример страницы, поля, частота, формат выгрузки, ограничения",
    },
    "Web, WordPress, SEO": {
      why: "Не конкурировать с разработчиками по всему сайту. Брать размещение, структуру, карточки, SEO-поля и мелкие правки.",
      action: "Попросить доступ, пример готовой страницы, текст, изображения, SEO-title, description.",
      proof: "Демо пост WordPress: заголовки, картинка, CTA, SEO-поля, чек-лист публикации.",
      inputs: "доступ, пример страницы, текст, картинки, SEO-поля, запреты",
    },
    "Маркетплейсы": {
      why: "Брать только данные и структуру: SKU, фото, карточки, описания, признаки товара, не дизайн ради дизайна.",
      action: "Начать с 5-10 SKU, сверить фото, артикул, описание, характеристики и источник.",
      proof: "Таблица SKU: фото, артикул, описание, источник, статус, что не хватает.",
      inputs: "прайс, артикулы, сайт/папка фото, правила названий, площадка",
    },
    "ТЗ, структура, Gantt": {
      why: "Влад может взять хаос и превратить в ТЗ, матрицу требований, вопросы, этапы и Гант без инженерной ответственности.",
      action: "Собрать исходные данные, ограничения, этапы, зависимости, вопросы и критерии приемки.",
      proof: "Матрица требований, Гант, список вопросов исполнителю, критерии приемки.",
      inputs: "цель, текущие материалы, сроки, бюджет, ограничения, кто принимает",
    },
    "Маркетинговая аналитика": {
      why: "Брать, если нужна таблица решений: unit-экономика, воронка, конкуренты, сегменты, выводы.",
      action: "Уточнить метрики, период, источники данных и решение, которое надо принять после анализа.",
      proof: "Таблица unit-экономики, выводы, что менять первым, что проверить.",
      inputs: "данные продаж, расходы, каналы, период, цель анализа",
    },
  };
  return profiles[d] || {
    why: "Нужна ручная проверка, потому что направление не попало в главный канон.",
    action: "Сначала уточнить объем, результат, приемку, срок и доступы.",
    proof: "Один обезличенный пример результата.",
    inputs: "исходные данные, пример результата, срок, критерии приемки",
  };
}

function firstReply(row) {
  const p = directionProfile(row.direction);
  const title = clean(row.title);
  const account = marketAccount(row.direction, row.account);
  const lead = account === "Настя" || account === "Настя + Влад"
    ? "Здравствуйте. Могу разобрать задачу спокойно и по документам, без вида что все понятно по одному скрину."
    : "Здравствуйте. Могу взять, но сначала зафиксирую границы, чтобы не продать вам туман.";
  return clean(`${lead} По запросу "${title}" я бы начал с короткого разбора: ${p.action} На выходе дам проверяемый результат: ${p.proof} Для точной оценки пришлите: ${p.inputs}.`);
}

function orderAction(row) {
  const p = directionProfile(row.direction);
  const decision = decisionRu(row.decision);
  if (decision === "не брать") return "Не откликаться. Оставить как антипример рынка.";
  if (decision === "низкий приоритет") return `Откликаться только если есть 10 минут и понятный объем. ${p.action}`;
  if (decision === "только платный разбор") return `Предлагать только первый этап: платный разбор, схема, вопросы, оценка. ${p.action}`;
  return p.action;
}

function proofCaseForOrder(row) {
  return directionProfile(row.direction).proof;
}

function fitReason(row) {
  const p = directionProfile(row.direction);
  const notes = clean(row.notes);
  return notes ? `${p.why} Сырье: ${notes}` : p.why;
}

function effectiveRate(row) {
  const mid = num(row.budget_mid) || ((num(row.budget_min) + num(row.budget_max)) / 2);
  const hours = num(row.est_hours);
  if (!mid || !hours) return "";
  return Math.round(mid / hours);
}

function priorityScore(row) {
  const decision = decisionRu(row.decision);
  const comp = competitionRu(row.competition, row.offers);
  let score = 50;
  if (decision === "брать сегодня") score += 30;
  if (decision === "брать") score += 20;
  if (decision === "брать с границами") score += 12;
  if (decision === "только платный разбор") score += 8;
  if (decision === "не брать") score -= 50;
  if (decision === "низкий приоритет") score -= 20;
  if (comp === "низкая") score += 20;
  if (comp === "средняя") score += 10;
  if (comp === "красный океан") score -= 20;
  if (num(row.budget_max) >= 30000) score += 8;
  if (num(row.budget_max) >= 90000) score += 10;
  if (sourceRu(row.source_layer).includes("живой")) score += 10;
  return Math.max(0, Math.min(100, score));
}

function makeActionRows(orders) {
  return orders.map((row, index) => ({
    "№": index + 1,
    "приоритет": priorityScore(row),
    "решение": decisionForOrder(row),
    "аккаунт": marketAccount(row.direction, row.account),
    "канал": channelRu(row),
    "направление": displayDirection(row.direction),
    "запрос клиента": clean(row.title),
    "бюджет": moneyRange(row),
    "отклики": clean(row.offers),
    "конкуренция": competitionRu(row.competition, row.offers),
    "часы": clean(row.est_hours),
    "грязная ставка руб/час": money(effectiveRate(row)),
    "почему нам подходит": fitReason(row),
    "что сделать": orderAction(row),
    "что написать клиенту": firstReply(row),
    "что показать или собрать": proofCaseForOrder(row),
    "риск": riskRu(row.risk, row),
    "источник": sourceRu(row.source_layer),
    "ссылка": clean(row.url),
    "долг": clean(row.confidence).includes("high") ? "" : "ПРОВЕРИТЬ свежесть и источник",
  }));
}

const actionHeaders = [
  "№", "приоритет", "решение", "аккаунт", "канал", "направление", "запрос клиента", "бюджет", "отклики",
  "конкуренция", "часы", "грязная ставка руб/час", "почему нам подходит", "что сделать", "что написать клиенту",
  "что показать или собрать", "риск", "источник", "ссылка", "долг",
];

const proofCases = [
  ["ОСВ 62 и акт сверки", "Настя", "1С, учет, ОСВ, акты", "Показать, что мы не просто смотрим файл, а раскладываем кто кому сколько и по каким документам.", "Сделать обезличенную таблицу на 10 контрагентов: сальдо, дебет, кредит, расхождение, действие.", "Не показывать ИНН, договоры, реальные суммы, названия клиентов.", "Кворк ОСВ/1С, первый ответ на бухгалтерские запросы"],
  ["Дебиторка и кредиторка", "Настя", "1С, учет, ОСВ, акты", "Показать управленческий смысл, а не только бухгалтерские слова.", "Сделать лист: кто должен, срок, основание, что запросить, статус.", "Не обещать взыскание или юридический результат.", "Кворк ОСВ/таблицы"],
  ["Excel с формулами и сводной", "Настя + Влад", "Excel и таблицы", "Показать, что таблица будет жить дальше, а не просто красиво выглядеть.", "Сделать файл до/после: склейка двух таблиц, формулы, сводная, проверка дублей.", "Не обещать сложный VBA без аудита.", "Кворк Excel/Google Sheets"],
  ["CRM или веб-хук в таблицу", "Влад", "Excel и таблицы", "Показать мост между таблицей и рабочим процессом.", "Сделать демо: форма или CSV -> таблица -> статус -> уведомление.", "Не подключать реальные CRM без тестового доступа и ТЗ.", "Кворк Excel/автоматизация"],
  ["ИТ-договор и протокол разногласий", "Настя", "Документы, договоры, заявки", "Показать юридическую силу без обещания суда.", "Сделать таблицу: пункт, риск, предлагаемая редакция, почему важно.", "Не писать 'юрист под ключ' и не обещать выигрыш.", "Кворк договоры/протоколы"],
  ["Трехсторонний договор", "Настя", "Документы, договоры, заявки", "Показать понимание денег, обязанностей и документов между тремя сторонами.", "Сделать схему сторон, платежей, актов, сроков, рисков.", "Не использовать чужие персональные данные.", "Кворк договоры"],
  ["УФАС, МСП, АНО, сертификация", "Настя", "Документы, договоры, заявки", "Показать умение собирать пакет и вопросы по требованиям.", "Сделать чек-лист: требование, документ, статус, вопрос, кто отвечает.", "Не обещать сертификат или решение органа.", "Кворк заявки/документы"],
  ["Факторный анализ или статистика", "Настя", "Учебные работы", "Показать, что студенческие работы - это быстрый расчет с объяснением.", "Сделать мини-кейс: формула, расчет, вывод человеческим языком.", "Не продавать как 'любой диплом под ключ'.", "Кворк учебные расчеты"],
  ["Банковское дело", "Настя", "Банковское дело", "Показать профильность: расчеты, продукты, платежи, риски.", "Сделать пример таблицы по кредиту, ставке, переплате, выводу.", "Не подменять профессиональную финансовую консультацию.", "Кворк банковские работы"],
  ["База бизнес-клиентов и первое касание", "Влад", "B2B, КП, лиды", "Показать не список мусора, а логику отбора.", "Сделать 20 строк: компания, почему подходит, контакт, источник, статус, первое сообщение.", "Не обещать продажи.", "Кворк лиды/КП"],
  ["Коммерческое предложение", "Влад", "B2B, КП, лиды", "Показать, что КП строится от сделки и доказательств.", "Сделать до/после: оффер, боли, доказательства, следующий шаг.", "Не конкурировать как обычный копирайтер.", "Кворк КП/кейсы"],
  ["ТЗ, матрица требований, Гант", "Влад", "ТЗ, структура, Gantt", "Показать способность превратить хаос в план.", "Сделать демо: требования, вопросы, риски, зависимости, приемка.", "Не брать инженерную ответственность.", "Кворк ТЗ/Gantt"],
  ["ИИ/Codex процесс", "Влад", "AI, боты, CRM", "Показать, что ИИ не магия, а управляемый процесс.", "Сделать пример: входная задача, промпт, файлы, результат, чек-лист проверки.", "Не обещать агента под ключ без первого разбора.", "Кворк ИИ/Codex"],
  ["Python парсер с логами", "Влад", "Python, парсинг, данные", "Показать инженерный минимум: источник, поля, ошибки, результат.", "Сделать демо одного источника и CSV до/после.", "Не нарушать правила площадок и не брать закрытые данные.", "Кворк Python/парсинг"],
  ["WordPress пост или карточка товара", "Настя + Влад", "Web, WordPress, SEO", "Показать аккуратную операционную работу.", "Сделать пример: H1/H2, SEO-title, description, картинка, CTA.", "Не брать полный сайт без оценки.", "Кворк WordPress/контент"],
  ["Маркетплейс SKU", "Настя", "Маркетплейсы", "Показать порядок в товарных данных.", "Сделать 10 SKU: фото, артикул, описание, характеристики, источник, статус.", "Не брать чужие фото без права использования.", "Кворк карточки/маркетплейсы"],
].map((r, i) => ({
  "№": i + 1,
  "кейс": r[0],
  "аккаунт": r[1],
  "направление": r[2],
  "зачем": r[3],
  "что создать за 1-2 часа": r[4],
  "что нельзя": r[5],
  "где использовать": r[6],
  "статус": "создать демо",
}));

const caseHeaders = ["№", "кейс", "аккаунт", "направление", "зачем", "что создать за 1-2 часа", "что нельзя", "где использовать", "статус"];

function templateRows() {
  const directions = [
    "1С, учет, ОСВ, акты",
    "Excel и таблицы",
    "Документы, договоры, заявки",
    "B2B, КП, лиды",
    "AI, боты, CRM",
    "Python, парсинг, данные",
    "ТЗ, структура, Gantt",
    "Web, WordPress, SEO",
    "Маркетплейсы",
  ];
  return directions.map((direction, i) => {
    const row = { direction, title: displayDirection(direction), account: direction.includes("B2B") || direction.includes("AI") || direction.includes("Python") || direction.includes("ТЗ") ? "Vlad" : "Nastya" };
    return {
      "№": i + 1,
      "направление": displayDirection(direction),
      "аккаунт": marketAccount(direction, row.account),
      "короткий отклик": firstReply(row),
      "что спросить": directionProfile(direction).inputs,
      "что обещать": directionProfile(direction).proof,
      "граница": boundaryFor(direction),
    };
  });
}

function boundaryFor(direction) {
  if (direction.includes("Документы")) return "Не обещаем выигрыш, не называемся юристом под ключ, не используем чужую ЭЦП.";
  if (direction.includes("AI")) return "Не обещаем под ключ без разбора процесса, доступов и тестового сценария.";
  if (direction.includes("Python")) return "Не обещаем сбор с закрытых источников и вечную стабильность без поддержки.";
  if (direction.includes("ТЗ")) return "Не берем инженерную ответственность, собираем структуру и вопросы.";
  if (direction.includes("Excel")) return "Сложные макросы, API и CRM только после аудита.";
  return "Фиксируем вход, выход, срок и критерии приемки до старта.";
}

const templateHeaders = ["№", "направление", "аккаунт", "короткий отклик", "что спросить", "что обещать", "граница"];

function demoRows() {
  return [
    ["Блок", "Строка", "Что показываем", "Значение 1", "Значение 2", "Вывод"],
    ["ДЕМО ОСВ", "Контрагент А", "Сальдо на конец", "105 000", "акт не подписан", "запросить акт и основание отгрузки"],
    ["ДЕМО ОСВ", "Контрагент Б", "Переплата", "60 000", "есть платеж без закрытия", "найти УПД или вернуть в авансы"],
    ["ДЕМО ОСВ", "Контрагент В", "Расхождение", "20 000", "нет документа в 1С", "проверить счет и дату операции"],
    ["ДЕМО ДОГОВОР", "Пункт об оплате", "Риск", "нет срока оплаты", "нет санкции за задержку", "добавить срок, порядок и последствия"],
    ["ДЕМО ДОГОВОР", "Пункт об акте", "Риск", "молчаливое принятие", "нет срока возражений", "уточнить срок и канал направления"],
    ["ДЕМО ТЗ", "Этап 1", "Разбор входных данных", "1 день", "результат: вопросы", "без этого нельзя считать цену"],
    ["ДЕМО ТЗ", "Этап 2", "Матрица требований", "2 дня", "результат: таблица", "по ней проверяется приемка"],
  ].map((r, i) => ({
    "№": i,
    "блок": r[0],
    "строка": r[1],
    "что показываем": r[2],
    "значение 1": r[3],
    "значение 2": r[4],
    "вывод": r[5],
  }));
}

const demoHeaders = ["№", "блок", "строка", "что показываем", "значение 1", "значение 2", "вывод"];

function mapDirectionRows(directions) {
  return directions.map((row, i) => {
    const direction = clean(row.direction);
    const p = directionProfile(direction);
    return {
      "№": i + 1,
      "направление": displayDirection(direction),
      "решение": decisionForDirection(direction, row.canon_verdict),
      "аккаунт": marketAccount(direction, row.accounts),
      "канал": clean(row.recommended_channel).replace("active_exchange", "активная биржа").replace("vitrine", "витрина").replace("mixed", "смешанный"),
      "заказов всего": clean(row.orders_total),
      "живых заказов": clean(row.live_orders),
      "низкая конкуренция": clean(row.low_comp_live),
      "макс бюджет": money(row.max_budget),
      "медиана откликов": clean(row.median_live_offers),
      "балл": clean(row.weighted_score),
      "первое действие": p.action,
      "кейс": p.proof,
      "почему": p.why,
      "источник": clean(row.source_basis),
    };
  });
}

const directionHeadersRu = ["№", "направление", "решение", "аккаунт", "канал", "заказов всего", "живых заказов", "низкая конкуренция", "макс бюджет", "медиана откликов", "балл", "первое действие", "кейс", "почему", "источник"];

function translateLiveRows(rows) {
  return rows.map((r, i) => ({
    "№": i + 1,
    "id": r.id,
    "дата": r.date,
    "запрос": r.title,
    "линия": r.lane,
    "ниша": r.niche,
    "бюджет от": r.budget_min,
    "бюджет до": r.budget_max,
    "отклики": r.offers,
    "просмотры": r.views,
    "дней": r.days,
    "категория": r.cat_id,
    "конкуренция": competitionRu(r.competition, r.offers),
    "поиск": r.source_kw,
    "заметка": r.note,
  }));
}

const liveHeadersRu = ["№", "id", "дата", "запрос", "линия", "ниша", "бюджет от", "бюджет до", "отклики", "просмотры", "дней", "категория", "конкуренция", "поиск", "заметка"];

function translateServiceRows(rows) {
  return rows.map((r, i) => ({
    "№": i + 1,
    "файл": r.source_file,
    "тип сырья": r.source_kind,
    "id": r.card_id,
    "аккаунт": accountRu(r.account),
    "название": r.title,
    "направление": displayDirection(r.direction),
    "категория": r.category,
    "цена входа": r.entry_price,
    "статус": r.status,
    "что делать": r.canon_action,
    "коротко": r.short_offer,
  }));
}

const serviceHeadersRu = ["№", "файл", "тип сырья", "id", "аккаунт", "название", "направление", "категория", "цена входа", "статус", "что делать", "коротко"];

function translateSourceRows(rows) {
  return rows.map((r, i) => ({
    "№": i + 1,
    "файл": r.file,
    "дата": r.date,
    "метод": r.method,
    "слой": r.layer,
    "строки или листы": r.rows_or_sheets,
    "статус": r.status,
    "не переписывать": r.do_not_rewrite,
    "как использовано": r.how_used,
    "заметки": r.notes,
  }));
}

const sourceHeadersRu = ["№", "файл", "дата", "метод", "слой", "строки или листы", "статус", "не переписывать", "как использовано", "заметки"];

function translateCompetitorRows(rows) {
  return rows.map((r, i) => ({
    "№": i + 1,
    "площадка": r.platform,
    "профиль": r.profile_url,
    "ниша": r.niche,
    "уровень": r.seller_level,
    "отзывы": r.reviews_count,
    "рейтинг": r.avg_rating,
    "цена от": r.base_price,
    "сила портфолио": r["portfolio_strength(1-5)"],
    "слабое место": r.weak_spots,
    "наш ход": r.our_edge,
    "заметки": r.notes,
    "дата": r.date_checked,
  }));
}

const competitorHeadersRu = ["№", "площадка", "профиль", "ниша", "уровень", "отзывы", "рейтинг", "цена от", "сила портфолио", "слабое место", "наш ход", "заметки", "дата"];

function translateDebtRows(rows) {
  return [
    {
      "№": 1,
      "долг": "Комиссия Kwork",
      "важность": "высокая",
      "кто": "оба",
      "основание": "точная комиссия не проверена в кабинете",
      "что сделать": "проверить в кабинете и пересчитать чистую ставку",
    },
    {
      "№": 2,
      "долг": "Свежие конкуренты",
      "важность": "высокая",
      "кто": "оба",
      "основание": "витрина конкурентов свежо не снята",
      "что сделать": "снять 5-10 карточек по топовым направлениям",
    },
    {
      "№": 3,
      "долг": "Статус продавца Влада",
      "важность": "высокая",
      "кто": "Влад",
      "основание": "в live-заметке был блокер isUserConfirmedSeller=false",
      "что сделать": "проверить аккаунт до активной охоты на бирже",
    },
    {
      "№": 4,
      "долг": "Документ бухобразования Насти",
      "важность": "средняя",
      "кто": "Настя",
      "основание": "пользователь сказал, что документ есть, но сейчас не найден",
      "что сделать": "найти документ или не писать как подтвержденный факт",
    },
    ...rows.map((r, i) => ({
      "№": i + 5,
      "долг": r.debt || r[0] || "",
      "важность": r.severity || r[1] || "",
      "кто": r.owner || r[2] || "",
      "основание": r.basis || r[3] || "",
      "что сделать": r.needed_action || r[4] || "",
    })),
  ];
}

const debtHeadersRu = ["№", "долг", "важность", "кто", "основание", "что сделать"];

function buildMainMap({ directions, actions, services, sources, debts, competitors, templates, cases }) {
  const rows = [];
  const pushSection = (title, note) => {
    rows.push({ "блок": title, "тип": "раздел", "смысл": note, "аккаунт": "", "решение": "", "действие": "", "ответ клиенту": "", "доказательство": "", "источник": "", "долг": "" });
  };
  const push = (data) => rows.push({
    "блок": data.block || "",
    "тип": data.type || "",
    "смысл": data.meaning || "",
    "аккаунт": data.account || "",
    "решение": data.decision || "",
    "действие": data.action || "",
    "ответ клиенту": data.reply || "",
    "доказательство": data.proof || "",
    "источник": data.source || "",
    "долг": data.debt || "",
  });

  pushSection("0. Как читать карту", "Сначала смотри пульт, потом направления, потом заказы. Остальные вкладки нужны для фильтрации и проверки.");
  [
    ["зеленый смысл", "брать сейчас или готовить кворк"],
    ["желтый смысл", "можно, но только с границами"],
    ["красный смысл", "не брать или переформатировать"],
    ["ПРОВЕРИТЬ", "не факт, пока нет ссылки, файла или скрина"],
  ].forEach(([meaning, action]) => push({ block: "0. Как читать карту", type: "правило", meaning, action }));

  pushSection("1. Пульт на сегодня", "Что делать руками, чтобы приблизиться к заказам.");
  [
    ["Настя", "брать", "Опубликовать или обновить кворк ОСВ/1С/акты", "Обложка уже есть, нужен демо-кейс ОСВ и четкие вопросы клиенту.", "Демо ОСВ + акт сверки"],
    ["Настя", "брать", "Опубликовать кворк договоры/протоколы/УФАС/МСП/АНО", "Юрсила показывается через таблицу рисков, без обещания суда.", "Демо протокол разногласий"],
    ["Влад", "брать", "Готовить отклики на бизнес-клиентов, КП и лиды", "В живом слое низкая конкуренция и понятный вход.", "20 строк базы + первое сообщение"],
    ["Влад", "брать с границами", "ИИ/Codex/CRM только через разбор и прототип", "Там деньги, но нельзя обещать магию.", "Схема процесса + один сценарий"],
    ["оба", "проверить", "Комиссия, статус продавца, свежие конкуренты", "Без этого нельзя честно считать чистую ставку.", "Скрин кабинета + 5 карточек конкурентов"],
  ].forEach(([account, decision, action, meaning, proof]) => push({ block: "1. Пульт на сегодня", type: "шаг", account, decision, action, meaning, proof, source: "канон + живой слой 16.06" }));

  pushSection("2. Направления", "Сводка куда идти, куда не идти, что создавать для доказательства.");
  directions.forEach((d) => push({
    block: "2. Направления",
    type: d["направление"],
    account: d["аккаунт"],
    decision: d["решение"],
    meaning: `${d["почему"]} Заказов: ${d["заказов всего"]}, живых: ${d["живых заказов"]}, макс бюджет: ${d["макс бюджет"]}.`,
    action: d["первое действие"],
    proof: d["кейс"],
    source: d["источник"],
  }));

  pushSection("3. Заказы и отклики", "Все заказы сохранены. В каждой строке есть решение, действие, текст отклика и доказательство.");
  actions.forEach((a) => push({
    block: "3. Заказы и отклики",
    type: `${a["№"]}. ${a["запрос клиента"]}`,
    account: a["аккаунт"],
    decision: `${a["решение"]}; ${a["бюджет"]}; отклики: ${a["отклики"]}; конкуренция: ${a["конкуренция"]}; ставка: ${a["грязная ставка руб/час"]}`,
    meaning: a["почему нам подходит"],
    action: a["что сделать"],
    reply: a["что написать клиенту"],
    proof: a["что показать или собрать"],
    source: `${a["источник"]}; ${a["ссылка"]}`,
    debt: a["долг"],
  }));

  pushSection("4. Кейсы-доказательства", "Что создать, чтобы в откликах не звучать как человек без примеров.");
  cases.forEach((c) => push({
    block: "4. Кейсы-доказательства",
    type: c["кейс"],
    account: c["аккаунт"],
    decision: c["статус"],
    meaning: c["зачем"],
    action: c["что создать за 1-2 часа"],
    proof: c["где использовать"],
    debt: c["что нельзя"],
  }));

  pushSection("5. Готовые отклики", "Короткие шаблоны, которые можно копировать и адаптировать.");
  templates.forEach((t) => push({
    block: "5. Готовые отклики",
    type: t["направление"],
    account: t["аккаунт"],
    decision: "использовать как основу",
    action: `Спросить: ${t["что спросить"]}`,
    reply: t["короткий отклик"],
    proof: t["что обещать"],
    debt: t["граница"],
  }));

  pushSection("6. Кворки и черновики", "Сырье сохранено. Это не финальный текст, а банк карточек и старых идей.");
  services.forEach((s) => push({
    block: "6. Кворки и черновики",
    type: s["название"],
    account: s["аккаунт"],
    decision: s["статус"],
    meaning: `${s["направление"]}; ${s["коротко"]}`,
    action: s["что делать"],
    source: s["файл"],
  }));

  pushSection("7. Конкуренты", "Архивная конкурентная база. Использовать как форму рынка, числа обновить.");
  competitors.forEach((c) => push({
    block: "7. Конкуренты",
    type: c["ниша"],
    decision: `отзывы: ${c["отзывы"]}; цена от: ${c["цена от"]}`,
    meaning: c["слабое место"],
    action: c["наш ход"],
    source: c["профиль"],
    debt: "ПРОВЕРИТЬ свежесть",
  }));

  pushSection("8. Источники и долги", "Почему этим данным можно или нельзя верить.");
  sources.forEach((s) => push({
    block: "8. Источники",
    type: s["файл"],
    decision: s["статус"],
    meaning: s["метод"],
    action: s["как использовано"],
    source: s["слой"],
    debt: s["заметки"],
  }));
  debts.forEach((d) => push({
    block: "8. Долги",
    type: d["долг"],
    account: d["кто"],
    decision: d["важность"],
    meaning: d["основание"],
    action: d["что сделать"],
    debt: "не закрыто",
  }));

  return rows;
}

const mainHeaders = ["блок", "тип", "смысл", "аккаунт", "решение", "действие", "ответ клиенту", "доказательство", "источник", "долг"];

function writeTable(sheet, headers, rows, anchor = "A1") {
  const matrix = [headers, ...rows.map((row) => headers.map((h) => clean(row[h])))];
  sheet.getRange(anchor).write(matrix);
}

function colName(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function styleSheet(sheet, cols, rows, options = {}) {
  const lastCol = colName(cols);
  const lastRow = Math.max(rows, 2);
  sheet.getRange(`A1:${lastCol}1`).format.fill = options.headerFill || "#244D3A";
  sheet.getRange(`A1:${lastCol}1`).format.font = { name: "Arial", size: 10, bold: true, color: "#FFFFFF" };
  sheet.getRange(`A1:${lastCol}1`).format.wrapText = true;
  sheet.getRange(`A1:${lastCol}1`).format.horizontalAlignment = "center";
  sheet.getRange(`A1:${lastCol}${lastRow}`).format.font = { name: "Arial", size: 10 };
  sheet.getRange(`A1:${lastCol}${lastRow}`).format.borders = { preset: "outside", style: "thin", color: "#B0BEC5" };
  sheet.getRange(`A2:${lastCol}${lastRow}`).format.borders = { preset: "inside", style: "thin", color: "#ECEFF1" };
  sheet.getRange(`A1:${lastCol}${Math.min(lastRow, 140)}`).format.autofitColumns();
  sheet.getRange(`A1:${lastCol}${Math.min(lastRow, 140)}`).format.autofitRows();
  try { sheet.freezePanes.freezeRows(1); } catch {}
  try { sheet.showGridLines = false; } catch {}
}

function addConditional(sheet, col, rowCount) {
  const range = `${col}2:${col}${rowCount}`;
  sheet.getRange(range).conditionalFormats.add("containsText", { text: "брать", format: { fill: "#D9EAD3", font: { color: "#274E13", bold: true } } });
  sheet.getRange(range).conditionalFormats.add("containsText", { text: "не брать", format: { fill: "#F4CCCC", font: { color: "#990000", bold: true } } });
  sheet.getRange(range).conditionalFormats.add("containsText", { text: "ПРОВЕРИТЬ", format: { fill: "#FFF2CC", font: { color: "#7F6000", bold: true } } });
}

async function main() {
  const ordersRaw = await readCsv("market/2026-06-kwork-canonical-orders.csv");
  const liveRaw = await readCsv("market/2026-06-kwork-orders-ledger-LIVE.csv");
  const directionsRaw = await readCsv("market/2026-06-kwork-direction-canon.csv");
  const servicesRaw = await readCsv("market/2026-06-kwork-service-card-index.csv");
  const sourcesRaw = await readCsv("market/2026-06-kwork-source-index.csv");
  const competitorsRaw = await readCsv("market/2026-06-competitor-ledger.csv");

  const actions = makeActionRows(ordersRaw).sort((a, b) => num(b["приоритет"]) - num(a["приоритет"]) || num(a["отклики"]) - num(b["отклики"]));
  const directions = mapDirectionRows(directionsRaw);
  const services = translateServiceRows(servicesRaw);
  const sources = translateSourceRows(sourcesRaw);
  const competitors = translateCompetitorRows(competitorsRaw);
  const templates = templateRows();
  const cases = proofCases;
  const debts = translateDebtRows([]);
  const live = translateLiveRows(liveRaw);
  const demo = demoRows();
  const mainMap = buildMainMap({ directions, actions, services, sources, debts, competitors, templates, cases });

  await fs.writeFile(out("market/2026-06-kwork-action-map.csv"), toCsv(actions, actionHeaders), "utf8");
  await fs.writeFile(out("market/2026-06-kwork-proof-cases.csv"), toCsv(cases, caseHeaders), "utf8");
  await fs.writeFile(out("market/2026-06-kwork-reply-templates.csv"), toCsv(templates, templateHeaders), "utf8");

  const workbook = Workbook.create();
  const sheets = {
    main: workbook.worksheets.getOrAdd("Карта проекта", { renameFirstIfOnlyNewSpreadsheet: true }),
    actions: workbook.worksheets.add("Заказы и отклики"),
    cases: workbook.worksheets.add("Кейсы"),
    demo: workbook.worksheets.add("Демо кейс"),
    templates: workbook.worksheets.add("Готовые ответы"),
    live: workbook.worksheets.add("Живой слой 16.06"),
    canon: workbook.worksheets.add("Канон заказов"),
    directions: workbook.worksheets.add("Направления"),
    services: workbook.worksheets.add("Кворки"),
    competitors: workbook.worksheets.add("Конкуренты"),
    sources: workbook.worksheets.add("Источники"),
    debts: workbook.worksheets.add("Долги"),
  };

  writeTable(sheets.main, mainHeaders, mainMap);
  writeTable(sheets.actions, actionHeaders, actions);
  writeTable(sheets.cases, caseHeaders, cases);
  writeTable(sheets.demo, demoHeaders, demo);
  writeTable(sheets.templates, templateHeaders, templates);
  writeTable(sheets.live, liveHeadersRu, live);
  writeTable(sheets.canon, actionHeaders, actions);
  writeTable(sheets.directions, directionHeadersRu, directions);
  writeTable(sheets.services, serviceHeadersRu, services);
  writeTable(sheets.competitors, competitorHeadersRu, competitors);
  writeTable(sheets.sources, sourceHeadersRu, sources);
  writeTable(sheets.debts, debtHeadersRu, debts);

  styleSheet(sheets.main, mainHeaders.length, mainMap.length + 1, { headerFill: "#203864" });
  styleSheet(sheets.actions, actionHeaders.length, actions.length + 1);
  styleSheet(sheets.cases, caseHeaders.length, cases.length + 1);
  styleSheet(sheets.demo, demoHeaders.length, demo.length + 1, { headerFill: "#5B3F00" });
  styleSheet(sheets.templates, templateHeaders.length, templates.length + 1);
  styleSheet(sheets.live, liveHeadersRu.length, live.length + 1, { headerFill: "#37474F" });
  styleSheet(sheets.canon, actionHeaders.length, actions.length + 1, { headerFill: "#37474F" });
  styleSheet(sheets.directions, directionHeadersRu.length, directions.length + 1);
  styleSheet(sheets.services, serviceHeadersRu.length, services.length + 1, { headerFill: "#455A64" });
  styleSheet(sheets.competitors, competitorHeadersRu.length, competitors.length + 1, { headerFill: "#455A64" });
  styleSheet(sheets.sources, sourceHeadersRu.length, sources.length + 1, { headerFill: "#455A64" });
  styleSheet(sheets.debts, debtHeadersRu.length, debts.length + 1, { headerFill: "#7F1D1D" });

  addConditional(sheets.main, "E", mainMap.length + 1);
  addConditional(sheets.actions, "C", actions.length + 1);
  addConditional(sheets.directions, "C", directions.length + 1);
  addConditional(sheets.debts, "F", debts.length + 1);

  sheets.actions.getRange(`B2:B${actions.length + 1}`).format.numberFormat = "0";
  sheets.actions.getRange(`I2:I${actions.length + 1}`).format.numberFormat = "0";
  sheets.actions.getRange(`K2:L${actions.length + 1}`).format.numberFormat = "# ##0";

  const inspect = await workbook.inspect({ kind: "table", range: "Карта проекта!A1:J35", include: "values,formulas", tableMaxRows: 40, tableMaxCols: 10 });
  console.log(inspect.ndjson);
  const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 200 }, summary: "formula error scan" });
  console.log(errors.ndjson);
  await workbook.render({ sheetName: "Карта проекта", range: "A1:J55", scale: 1 });
  await workbook.render({ sheetName: "Заказы и отклики", range: "A1:T30", scale: 1 });
  await workbook.render({ sheetName: "Демо кейс", range: "A1:G12", scale: 1 });

  const file = await SpreadsheetFile.exportXlsx(workbook);
  await file.save(out("market/2026-06-kwork-market-fit-CANON.xlsx"));

  const readme = `# Kwork: человеческая карта действий\n\nДата пересборки: 2026-06-18.\n\nГлавный файл: \`market/2026-06-kwork-market-fit-CANON.xlsx\`.\n\n## Как читать\n\nОткрывай первую вкладку \`Карта проекта\`. Это большая карта, а не набор мелких кусочков. В ней подряд идут:\n\n1. \`0. Как читать карту\` - правила цветов и меток.\n2. \`1. Пульт на сегодня\` - что делать руками первым.\n3. \`2. Направления\` - куда идти, куда не идти, какой кейс нужен.\n4. \`3. Заказы и отклики\` - каждый заказ с решением, действием, текстом ответа и доказательством.\n5. \`4. Кейсы-доказательства\` - что создать за 1-2 часа, чтобы не звучать пусто.\n6. \`5. Готовые отклики\` - короткие тексты для копирования.\n7. \`6. Кворки и черновики\` - все старое сырье сохранено.\n8. \`7. Конкуренты\` - архив конкурентов, числа надо обновлять.\n9. \`8. Источники и долги\` - что факт, а что \`ПРОВЕРИТЬ\`.\n\n## Что изменилось\n\n1. Убраны англоязычные рабочие названия из пользовательских вкладок.\n2. Каждый заказ получил понятный слой: брать или нет, кто отвечает, что сделать, что написать клиенту, какой кейс показать.\n3. Добавлены новые таблицы: \`Заказы и отклики\`, \`Кейсы\`, \`Демо кейс\`, \`Готовые ответы\`.\n4. Все исходные смыслы сохранены: живой слой, канон заказов, направления, кворки, конкуренты, источники и долги остались в книге.\n5. Добавлены CSV для дальнейшей автоматической пересборки:\n   - \`market/2026-06-kwork-action-map.csv\`\n   - \`market/2026-06-kwork-proof-cases.csv\`\n   - \`market/2026-06-kwork-reply-templates.csv\`\n\n## Ролевой контроль\n\n1. Фактолог: не дает выдавать \`ПРОВЕРИТЬ\` за факт.\n2. Сборщик навыков: связывает запросы с навыками Влада и Насти.\n3. Методолог рынка: считает приоритет, конкуренцию, часы и грязную ставку.\n4. Оппонент: режет направления, где мы звучим как все или берем лишний риск.\n5. Фасилитатор: сводит все в одну карту, чтобы не прыгать по вкладкам.\n\n## Что остается долгом\n\n1. Точная комиссия Kwork.\n2. Свежие карточки конкурентов с витрины.\n3. Статус продавца Влада.\n4. Документ бухгалтерского образования Насти.\n5. Реальные демо-файлы для портфолио: ОСВ, договор, Excel, ТЗ, ИИ/Codex.\n\nФайлы \`*-LIVE\` не переписывались. Они остаются источниками.\n`;
  await fs.writeFile(out("market/2026-06-kwork-canon.md"), readme, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
