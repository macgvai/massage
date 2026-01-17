import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET - получить текущую конфигурацию
export async function GET() {
    try {
        // Создаем папку config если её нет
        const configDir = path.join(process.cwd(), 'config');
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        const configPath = path.join(process.cwd(), 'config', 'site.ts');
        
        // Если файл конфигурации не существует, возвращаем пустую конфигурацию
        if (!fs.existsSync(configPath)) {
            return NextResponse.json({ 
                success: true, 
                message: 'Файл конфигурации не найден',
                config: '' 
            });
        }

        const configContent = fs.readFileSync(configPath, 'utf8');
        
        return NextResponse.json({ 
            success: true, 
            message: 'Конфигурация получена',
            config: configContent 
        });
    } catch (error) {
        console.error('Ошибка при получении конфигурации:', error);
        return NextResponse.json(
            { success: false, message: `Ошибка при получении конфигурации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
            { status: 500 }
        );
    }
}

// POST - сохранить новую конфигурацию
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { config } = body;

        // Создаем папку config если её нет
        const configDir = path.join(process.cwd(), 'config');
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        // Создаем резервную копию
        const configPath = path.join(process.cwd(), 'config', 'site.ts');
        const backupPath = path.join(process.cwd(), 'config', `site.backup.${Date.now()}.ts`);
        
        if (fs.existsSync(configPath)) {
            fs.copyFileSync(configPath, backupPath);
        }

        // Генерируем новый файл конфигурации
        const newConfigContent = generateConfigFile(config);
        
        // Сохраняем новую конфигурацию
        fs.writeFileSync(configPath, newConfigContent, 'utf8');

        return NextResponse.json({ 
            success: true, 
            message: 'Конфигурация успешно сохранена' 
        });
    } catch (error) {
        console.error('Ошибка при сохранении конфигурации:', error);
        return NextResponse.json(
            { success: false, message: `Ошибка при сохранении конфигурации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
            { status: 500 }
        );
    }
}

function generateConfigFile(config: any): string {
    return `export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    // Основная информация о сайте
    name: "${config.name}",
    fullName: "${config.fullName}",
    description: "${config.description}",
    
    // Навигация
    navItems: [
        {
            label: "Услуги и цены",
            href: "#services",
        },
        {
            label: "О мастере",
            href: "#about",
        },
        {
            label: "Преимущества",
            href: "#advantages",
        },
        {
            label: "Контакты",
            href: "#map",
        },
    ],

    // Информация о мастере
    about: {
        name: "${config.about.name}",
        title: "${config.about.title}",
        experience: "${config.about.experience}",
        description: "${config.about.description}",
        achievements: ${JSON.stringify(config.about.achievements, null, 8)},
        motto: "${config.about.motto}"
    },

    // Контактная информация
    contact: {
        phone: "${config.contact.phone}",
        phoneFormatted: "${config.contact.phone.replace(/[^0-9]/g, '')}", 
        email: "${config.contact.email}",
        address: "${config.contact.address}",
        addressShort: "${config.contact.address}",
        coordinates: {
            lat: 44.931419,
            lng: 34.135954
        },
        workingHours: "${config.contact.workingHours}",
        workingHoursDetailed: {
            weekdays: "Понедельник - Пятница: 9:00 - 21:00",
            weekend: "Суббота - Воскресенье: 10:00 - 20:00"
        },
        metro: "",
        parking: "Бесплатная парковка рядом с салоном"
    },

    // Социальные сети
    social: ${JSON.stringify(config.social, null, 8)},

    // Услуги и цены
    services: ${JSON.stringify(config.services, null, 8)},

    // Специальные предложения
    specialOffers: ${JSON.stringify(config.specialOffers, null, 8)},

    // Преимущества
    advantages: [
        {
            title: "Профессиональный опыт",
            description: "Более 7 лет практики и постоянное повышение квалификации. Индивидуальный подход к каждому клиенту.",
            icon: "👨‍⚕️"
        },
        {
            title: "Комфортная атмосфера",
            description: "Уютный кабинет с расслабляющей музыкой и ароматерапией. Создаем идеальные условия для отдыха.",
            icon: "🏠"
        },
        {
            title: "Качественные материалы",
            description: "Используем только натуральные масла и профессиональное оборудование высокого класса.",
            icon: "✨"
        },
        {
            title: "Гибкое расписание",
            description: "Работаем 7 дней в неделю с 9:00 до 21:00. Возможность записи на удобное для вас время.",
            icon: "⏰"
        },
        {
            title: "Доступные цены",
            description: "Честные цены без скрытых доплат. Система скидок для постоянных клиентов.",
            icon: "💰"
        },
        {
            title: "Результат с первого сеанса",
            description: "Заметное улучшение самочувствия уже после первого посещения. Долгосрочный эффект.",
            icon: "🎯"
        }
    ],

    // Отзывы
    testimonials: [
        {
            name: "Мария К.",
            rating: 5,
            text: "Отличный мастер! Андрей очень профессионально подходит к работе. После массажа чувствую себя как новая.",
            date: "2024-01-15"
        },
        {
            name: "Дмитрий С.",
            rating: 5,
            text: "Хожу к Андрею уже полгода. Спортивный массаж помогает быстро восстанавливаться после тренировок.",
            date: "2024-01-10"
        },
        {
            name: "Елена В.",
            rating: 5,
            text: "Прекрасная атмосфера, профессиональный подход. Массаж шеи помог избавиться от постоянных головных болей.",
            date: "2024-01-08"
        }
    ],

    // SEO и мета-информация
    seo: {
        keywords: [
            "массаж Симферополь",
            "классический массаж",
            "лечебный массаж",
            "спортивный массаж",
            "массажист Андрей Васкес",
            "профессиональный массаж",
            "массаж Крым",
            "ул. Беспалова массаж"
        ],
        ogImage: "/images/about-bg.jpg"
    }
};

// Вспомогательные функции для работы с услугами и ценами
export const formatPrice = (price: number): string => \`\${price.toLocaleString('ru-RU')} ₽\`;

export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
        return \`\${minutes} мин\`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return \`\${hours} ч\`;
    }
    return \`\${hours} ч \${remainingMinutes} мин\`;
};

export const getServiceById = (id: string) => {
    return siteConfig.services.find(service => service.id === id);
};

export const getPackagePrice = (packageItem: typeof siteConfig.specialOffers.packages[0]) => {
    return {
        original: formatPrice(packageItem.originalPrice),
        discount: formatPrice(packageItem.discountPrice),
        savings: formatPrice(packageItem.savings),
        discountPercent: \`\${packageItem.discount}%\`
    };
};
`;
}