import initDb from './client';

const defaultConfig = {
    name: "Массажный салон",
    fullName: "Массажный салон Андрея Васкеса",
    description: "Профессиональные массажные услуги в Симферополе. Классический, лечебный и спортивный массаж от сертифицированного специалиста на ул. Беспалова, 110м.",
    navItems: [
        { label: "Услуги и цены", href: "#services" },
        { label: "О мастере", href: "#about" },
        { label: "Преимущества", href: "#advantages" },
        { label: "Контакты", href: "#map" }
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
        parking: "Бесплатная парковка рядом с салоном"
    },
    social: {
        telegram: "https://t.me/massage_salon",
        whatsapp: "https://wa.me/79169905365",
        instagram: "https://instagram.com/massage_salon",
        vk: "https://vk.com/massage_salon"
    },
    services: [
        {
            id: "classical",
            title: "Классический массаж",
            description: "Классический массаж спины, шеи, ног и головы. Эффективно снимает напряжение, улучшает кровообращение и возвращает ощущение собранности.",
            duration: 60,
            price: 5500,
            benefits: [
                "Снятие мышечного напряжения",
                "Улучшение кровообращения",
                "Общее расслабление"
            ]
        },
        {
            id: "relax",
            title: "Релакс-массаж",
            description: "Мягкий расслабляющий массаж для снятия стресса и усталости. Помогает переключиться, глубоко расслабиться и восстановить внутренний баланс.",
            duration: 90,
            price: 4000,
            benefits: [
                "Снятие стресса",
                "Глубокое расслабление",
                "Восстановление энергии"
            ]
        },
        {
            id: "sport",
            title: "Спортивный массаж",
            description: "Интенсивный массаж для восстановления после нагрузок. Снижает мышечную боль, ускоряет восстановление и повышает работоспособность.",
            duration: 60,
            price: 3500,
            benefits: [
                "Восстановление после тренировок",
                "Снижение мышечной боли",
                "Повышение работоспособности"
            ]
        },
        {
            id: "neck",
            title: "Массаж шейно-воротниковой зоны",
            description: "Точечная проработка шеи и плеч. Снимает зажимы, уменьшает головные боли и улучшает самочувствие при сидячей работе.",
            duration: 30,
            price: 2000,
            benefits: [
                "Снятие зажимов в шее",
                "Уменьшение головных болей",
                "Улучшение осанки"
            ]
        },
        {
            id: "antistress",
            title: "Антистресс-массаж",
            description: "Спокойный массаж с плавными движениями для снятия нервного напряжения. Помогает восстановить сон и эмоциональное состояние.",
            duration: 75,
            price: 3800,
            benefits: [
                "Снятие нервного напряжения",
                "Улучшение сна",
                "Эмоциональное восстановление"
            ]
        },
        {
            id: "back",
            title: "Массаж спины",
            description: "Глубокая проработка мышц спины. Улучшает осанку, снимает хроническую усталость и ощущение скованности.",
            duration: 45,
            price: 2500,
            benefits: [
                "Улучшение осанки",
                "Снятие усталости",
                "Устранение скованности"
            ]
        }
    ],
    specialOffers: {
        enabled: true,
        consultation: {
            title: "Бесплатная консультация",
            description: "Консультация по подбору подходящего вида массажа",
            duration: 15,
            price: 0,
            enabled: true
        },
        packages: [
            {
                id: "health-package",
                title: "Пакет «Здоровье»",
                description: "5 сеансов классического массажа",
                sessions: 5,
                serviceId: "classical",
                originalPrice: 15000,
                discountPrice: 12000,
                discount: 20,
                savings: 3000,
                enabled: true
            },
            {
                id: "relax-package",
                title: "Пакет «Релакс»",
                description: "3 сеанса релакс-массажа",
                sessions: 3,
                serviceId: "relax",
                originalPrice: 12000,
                discountPrice: 10000,
                discount: 17,
                savings: 2000,
                enabled: true
            },
            {
                id: "sport-package",
                title: "Пакет «Спорт»",
                description: "4 сеанса спортивного массажа",
                sessions: 4,
                serviceId: "sport",
                originalPrice: 14000,
                discountPrice: 11200,
                discount: 20,
                savings: 2800,
                enabled: true
            }
        ]
    },
    advantages: [
        {
            title: "Сертифицированный мастер",
            description: "Медицинское образование и профильные сертификаты.",
            icon: "🎓"
        },
        {
            title: "Индивидуальный подход",
            description: "Подбираю технику с учётом задач и самочувствия клиента.",
            icon: "✨"
        },
        {
            title: "Комфорт и чистота",
            description: "Уютный кабинет, одноразовые материалы, стерильность.",
            icon: "🧴"
        }
    ],
    testimonials: [],
    seo: { keywords: ["массаж", "Симферополь", "классический массаж", "лечебный массаж"], ogImage: "" }
};

const defaultAbout = {
    name: "Андрей Васкес",
    title: "Сертифицированный массажист",
    experience: "7+ лет опыта",
    description: "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом, лечебном и спортивном массаже. Помогаю людям восстановить здоровье, снять стресс и улучшить качество жизни.",
    achievements: [
        "Диплом медколледжа по специальности «Массаж»",
        "Сертификат повышения квалификации по спортивному массажу",
        "Курсы по лечебному и реабилитационному массажу",
        "Более 2000 довольных клиентов"
    ],
    motto: "Ваше здоровье и комфорт — моя главная цель"
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
    await insert.run("about", JSON.stringify(defaultAbout));
    await insert.finalize();
    console.log('Таблица "key_value" создана и заполнена.');
}

export async function initConfigDb() {
    await seedKeyValue();
}

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
