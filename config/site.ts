export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next.js + HeroUI",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Услуги",
            href: "/",
        },
        {
            label: "Контакты",
            href: "/docs",
        },

    ],
    navMenuItems: [
        {
            label: "Услуги",
            href: "/",
        },
        {
            label: "Контакты",
            href: "/",
        },

    ],
    links: {
        github: "https://github.com/heroui-inc/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
    services: [
        {
            title: "Классический массаж",
            href: "/",
            description:
                "Классический массаж спины, шеи, ног и головы. Эффективно снимает напряжение, улучшает кровообращение и возвращает ощущение собранности.",
        },
        {
            title: "Релакс-массаж",
            href: "/",
            description:
                "Мягкий расслабляющий массаж для снятия стресса и усталости. Помогает переключиться, глубоко расслабиться и восстановить внутренний баланс.",
        },
        {
            title: "Спортивный массаж",
            href: "/",
            description:
                "Интенсивный массаж для восстановления после нагрузок. Снижает мышечную боль, ускоряет восстановление и повышает работоспособность.",
        },
        {
            title: "Массаж шейно-воротниковой зоны",
            href: "/",
            description:
                "Точечная проработка шеи и плеч. Снимает зажимы, уменьшает головные боли и улучшает самочувствие при сидячей работе.",
        },
        {
            title: "Антистресс-массаж",
            href: "/",
            description:
                "Спокойный массаж с плавными движениями для снятия нервного напряжения. Помогает восстановить сон и эмоциональное состояние.",
        },
        {
            title: "Массаж спины",
            href: "/",
            description:
                "Глубокая проработка мышц спины. Улучшает осанку, снимает хроническую усталость и ощущение скованности.",
        }

    ],

};
