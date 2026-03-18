"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
var client_1 = require("./client");
var defaultConfig = {
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
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1.default)()];
                case 1:
                    db = _a.sent();
                    // Создаем таблицу если не существует
                    return [4 /*yield*/, db.exec("\n        CREATE TABLE IF NOT EXISTS key_value (\n            key TEXT PRIMARY KEY,\n            value TEXT NOT NULL\n        )\n    ")];
                case 2:
                    // Создаем таблицу если не существует
                    _a.sent();
                    // Вставляем всю конфигурацию одной записью
                    return [4 /*yield*/, db.run('INSERT OR REPLACE INTO key_value (key, value) VALUES (?, ?)', 'config', JSON.stringify(defaultConfig))];
                case 3:
                    // Вставляем всю конфигурацию одной записью
                    _a.sent();
                    console.log('✅ База данных успешно заполнена');
                    return [2 /*return*/];
            }
        });
    });
}
// Запуск сидов если файл запущен напрямую
if (require.main === module) {
    seedDatabase()
        .then(function () {
        console.log('Сиды выполнены успешно');
        process.exit(0);
    })
        .catch(function (err) {
        console.error('Ошибка выполнения сидов:', err);
        process.exit(1);
    });
}
