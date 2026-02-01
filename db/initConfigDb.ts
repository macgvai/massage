import initDb from './client'; // твой файл инициализации БД
import { siteConfig } from '../config/site';

async function createKeyValueTable() {
    const db = await initDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS key_value (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `);

    console.log('Table key_value created or already exists.');
}

async function createAboutTable() {
    const db = await initDb();

    await db.exec(`
        DROP TABLE IF EXISTS about;
        CREATE TABLE IF NOT EXISTS about (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             title TEXT,
             experience TEXT,
             description TEXT, -- Хранится как JSON-строка
             achievements TEXT, -- Хранится как JSON-строка
             motto TEXT
        )
    `);

    const insert = await db.prepare(`
        INSERT OR REPLACE INTO about (name, title, experience, description, achievements, motto)
    VALUES (?, ?, ?, ?, ?, ?)
    `);

    await insert.run(
        "Андрей Васкес",
        "Сертифицированный массажист",
        "7+ лет опыта", // Проверьте логику: возможно, это должно быть в `description` или отдельным полем
        "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом, лечебном и спортивном массаже. Помогаю людям восстановить здоровье, снять стресс и улучшить качество жизни.",
        JSON.stringify([
            "Диплом медицинского колледжа по специальности 'Массаж'",
            "Сертификат повышения квалификации по спортивному массажу",
            "Курсы по лечебному и реабилитационному массажу",
            "Более 2000 довольных клиентов"
        ]),
        "Ваше здоровье и комфорт - моя главная цель"
    );

    await insert.finalize();
    console.log('Таблица "about" создана и заполнена.');
}

async function saveConfigToDb(config: typeof siteConfig) {
    const db = await initDb();

    const insert = await db.prepare(`
        INSERT OR REPLACE INTO key_value (key, value)
        VALUES (?, ?)
    `);

    for (const [key, value] of Object.entries(config)) {
        await insert.run(key, JSON.stringify(value));
    }

    await insert.finalize();

    console.log('Site configuration saved to database.');
}

(async () => {
    console.log('777')
    await createAboutTable();
    await createKeyValueTable();
    await saveConfigToDb(siteConfig);
    process.exit(0); // Завершаем скрипт
})();
