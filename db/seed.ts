import initDb from './client';

const defaultConfig = {
    name: "Массаж в Симферополе",
    fullName: "Профессиональный массаж в Симферополе — Андрей Васкес",
    description: "Профессиональный массаж в Симферополе от сертифицированного специалиста. Классический, лечебный, спортивный массаж. Запись онлайн. Опыт 7+ лет. ☎️ +7 (916) 990-53-65",
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
        workingHoursDetailed: { 
            weekdays: "Понедельник - Пятница: 9:00 - 21:00", 
            weekend: "Суббота - Воскресенье: 10:00 - 20:00" 
        },
        metro: "",
        parking: "Бесплатная парковка рядом с салоном"
    },
    social: {
        telegram: "https://t.me/massage_salon",
        whatsapp: "https://wa.me/79169905365",
        instagram: "https://instagram.com/massage_salon",
        vk: "https://vk.com/massage_salon"
    },
    about: {
        name: "Андрей Васкес",
        title: "Сертифицированный массажист",
        experience: "7+ лет опыта",
        description: "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом, лечебном и спортивном массаже.",
        achievements: [
            "Диплом медколледжа по специальности «Массаж»",
            "Сертификат повышения квалификации по спортивному массажу",
            "Более 2000 довольных клиентов"
        ],
        motto: "Ваше здоровье и комфорт — моя главная цель"
    },
    services: [
        {
            id: "classical",
            title: "Классический массаж",
            description: "Классический массаж спины, шеи, ног и головы. Эффективно снимает напряжение, улучшает кровообращение.",
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
            description: "Мягкий расслабляющий массаж для снятия стресса и усталости.",
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
            description: "Интенсивный массаж для восстановления после нагрузок.",
            duration: 60,
            price: 3500,
            benefits: [
                "Восстановление после тренировок",
                "Снижение мышечной боли",
                "Повышение работоспособности"
            ]
        }
    ],
    specialOffers: {
        enabled: true,
        consultation: {
            enabled: true,
            title: "Бесплатная консультация",
            description: "Консультация по подбору подходящего вида массажа",
            duration: 15,
            price: 0
        },
        packages: [
            {
                id: "health-package",
                enabled: true,
                title: "Пакет «Здоровье»",
                description: "5 сеансов классического массажа",
                sessions: 5,
                serviceId: "classical",
                originalPrice: 27500,
                discountPrice: 22000,
                discount: 20,
                savings: 5500
            },
            {
                id: "relax-package",
                enabled: true,
                title: "Пакет «Релакс»",
                description: "3 сеанса релакс-массажа",
                sessions: 3,
                serviceId: "relax",
                originalPrice: 12000,
                discountPrice: 10000,
                discount: 17,
                savings: 2000
            },
            {
                id: "sport-package",
                enabled: true,
                title: "Пакет «Спорт»",
                description: "4 сеанса спортивного массажа",
                sessions: 4,
                serviceId: "sport",
                originalPrice: 14000,
                discountPrice: 11200,
                discount: 20,
                savings: 2800
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
    seo: { 
        keywords: [
            "массаж Симферополь",
            "массажист Симферополь",
            "классический массаж Симферополь",
            "лечебный массаж Симферополь",
            "спортивный массаж Симферополь",
            "массаж спины Симферополь",
            "массаж цены Симферополь",
            "профессиональный массаж",
            "массаж Беспалова",
            "массаж недорого Симферополь",
            "расслабляющий массаж",
            "антистресс массаж",
            "массаж шеи Симферополь",
            "массаж запись онлайн",
            "массаж в симферополе"
        ],
        ogImage: "/og-image.jpg" 
    },
    images: {
        'about-bg': '/images/about-bg.jpg',
        'advantages-bg': '/images/advantages-bg.jpg',
        'diploma': '/images/diploma-realistic.svg',
        'master-photo': '/images/master-photo-placeholder.svg'
    }
};

export async function seedDatabase() {
    const db = await initDb();
    
    // Создаем таблицу если не существует
    await db.exec(`
        CREATE TABLE IF NOT EXISTS key_value (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    `);

    // Вставляем всю конфигурацию одной записью
    await db.run(
        'INSERT OR REPLACE INTO key_value (key, value) VALUES (?, ?)',
        'config',
        JSON.stringify(defaultConfig)
    );
    
    console.log('✅ База данных успешно заполнена');
}

// Запуск сидов если файл запущен напрямую
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('Сиды выполнены успешно');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Ошибка выполнения сидов:', err);
            process.exit(1);
        });
}
