/* eslint-disable @typescript-eslint/no-require-imports */
const initDb = require('./client').default || require('./client');

const defaultConfig = {
  name: "Массажный салон",
  fullName: "Массажный салон Андрея Васкеса",
  description: "Профессиональные массажные услуги в Симферополе. Классический, лечебный и спортивный массаж от сертифицированного специалиста на ул. Беспалова, 110м.",
  navItems: [
    { label: "Услуги и цены", href: "#services" },
    { label: "О мастере", href: "#about" },
    { label: "Преимущества", href: "#advantages" },
    { label: "Контакты", href: "#map" },
  ],
  contact: {
    phone: "+7 (916) 990-53-65",
    phoneFormatted: "79169905365",
    email: "info@massage-salon.ru",
    address: "г. Симферополь, ул. Беспалова, д. 110м",
    addressShort: "г. Симферополь, ул. Беспалова, д. 110м",
    coordinates: { lat: 44.931419, lng: 34.135954 },
    workingHours: "Ежедневно с 9:00 до 21:00",
    workingHoursDetailed: { weekdays: "Понедельник - Пятница: 9:00 - 21:00", weekend: "Суббота - Воскресенье: 10:00 - 20:00" },
    metro: "",
    parking: "Бесплатная парковка рядом с салоном",
  },
  social: {
    telegram: "https://t.me/massage_salon",
    whatsapp: "https://wa.me/79169905365",
    instagram: "https://instagram.com/massage_salon",
    vk: "https://vk.com/massage_salon",
  },
  services: [],
  specialOffers: {
    enabled: true,
    consultation: { title: "Бесплатная консультация", description: "Консультация по подбору подходящего вида массажа", duration: 15, price: 0, enabled: true },
    packages: [],
  },
  advantages: [],
  testimonials: [],
  seo: { keywords: ["массаж", "Симферополь", "классический массаж", "лечебный массаж"], ogImage: "" },
};

const defaultAbout = {
  name: "Андрей Васкес",
  title: "Сертифицированный массажист",
  experience: "7+ лет опыта",
  description: "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом, лечебном и спортивном массаже. Помогаю людям восстановить здоровье, снять стресс и улучшить качество жизни.",
  achievements: [
    "Диплом медицинского колледжа по специальности 'Массаж'",
    "Сертификат повышения квалификации по спортивному массажу",
    "Курсы по лечебному и реабилитационному массажу",
    "Более 2000 довольных клиентов",
  ],
  motto: "Ваше здоровье и комфорт — моя главная цель",
};

async function seedKeyValue() {
  const db = await initDb();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS key_value (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `);

  const insert = await db.prepare(`
        INSERT OR REPLACE INTO key_value (key, value)
        VALUES (?, ?)
    `);

  for (const [key, value] of Object.entries(defaultConfig)) {
    await insert.run(key, JSON.stringify(value));
  }
  await insert.finalize();
  console.log('Таблица "key_value" создана и заполнена.');
}

async function seedAbout() {
  const db = await initDb();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS about (
             id INTEGER PRIMARY KEY CHECK (id = 1),
             name TEXT,
             title TEXT,
             experience TEXT,
             description TEXT,
             achievements TEXT,
             motto TEXT
        )
    `);

  await db.run(`
        INSERT OR REPLACE INTO about (id, name, title, experience, description, achievements, motto)
        VALUES (1, ?, ?, ?, ?, ?, ?)
    `, [
    defaultAbout.name,
    defaultAbout.title,
    defaultAbout.experience,
    defaultAbout.description,
    JSON.stringify(defaultAbout.achievements),
    defaultAbout.motto,
  ]);

  console.log('Таблица "about" создана и заполнена.');
}

async function initConfigDb() {
  await seedKeyValue();
  await seedAbout();
}

module.exports = { initConfigDb };

if (require.main === module) {
  initConfigDb()
    .then(() => {
      console.log('Инициализация конфигурации завершена.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Ошибка инициализации конфигурации:', err);
      process.exit(1);
    });
}
