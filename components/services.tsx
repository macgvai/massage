import { siteConfig, formatPrice, formatDuration, getPackagePrice } from "@/config/site";
import ShowModalBtn from "@/components/showModalBtn";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

export default function Services() {
    return (
        <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
            <Container>
                {/* Заголовок секции */}
                <SectionTitle 
                    highlight="услуги и цены"
                    subtitle="Профессиональные массажные услуги по честным ценам без скрытых доплат"
                >
                    Наши услуги и цены
                </SectionTitle>

                {/* Основные услуги */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {siteConfig.services.map((service, index) => (
                            <div 
                                key={service.id}
                                className="group relative rounded-3xl bg-white dark:bg-gray-800 
                                    border border-gray-200 dark:border-gray-700
                                    shadow-lg hover:shadow-2xl
                                    transition-all duration-500
                                    hover:-translate-y-2
                                    overflow-hidden
                                "
                            >
                                {/* Декоративный градиент */}
                                <div className="
                                    absolute inset-0 rounded-3xl
                                    bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500
                                " />

                                {/* Декоративная полоска сверху */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                <div className="relative p-6 flex flex-col h-full">
                                    {/* Номер услуги */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Заголовок */}
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white pr-12">
                                        {service.title}
                                    </h3>

                                    {/* Цена и время */}
                                    <div className="flex items-center justify-between mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                            {formatPrice(service.price)}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                                            {formatDuration(service.duration)}
                                        </span>
                                    </div>

                                    {/* Описание */}
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                                        {service.description}
                                    </p>

                                    {/* Преимущества */}
                                    <ul className="space-y-2 mb-6 flex-grow">
                                        {service.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                            <li key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Кнопка записи */}
                                    <ShowModalBtn 
                                        item={{
                                            title: service.title,
                                            description: service.description,
                                            href: `#${service.id}`
                                        }}
                                        customClassName="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-colors duration-200 font-medium"
                                        customText="Записаться"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Специальные предложения */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                        🎁 Специальные предложения
                    </h3>
                    
                    {/* Бесплатная консультация */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
                        <div className="text-center">
                            <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                🆓 {siteConfig.specialOffers.consultation.title}
                            </h4>
                            <p className="text-blue-700 dark:text-blue-300 mb-4">
                                {siteConfig.specialOffers.consultation.description}
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    Бесплатно
                                </span>
                                <span className="text-blue-500 dark:text-blue-400">
                                    {formatDuration(siteConfig.specialOffers.consultation.duration)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Пакетные предложения */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {siteConfig.specialOffers.packages.map((packageItem, index) => {
                            const prices = getPackagePrice(packageItem);
                            return (
                                <div 
                                    key={packageItem.id}
                                    className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 shadow-lg border border-emerald-200 dark:border-emerald-800 relative overflow-hidden"
                                >
                                    {/* Бейдж скидки */}
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{prices.discountPercent}
                                    </div>
                                    
                                    <div className="text-center mb-4">
                                        <h4 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                                            {packageItem.title}
                                        </h4>
                                        <p className="text-emerald-700 dark:text-emerald-300 text-sm mb-4">
                                            {packageItem.description}
                                        </p>
                                    </div>
                                    
                                    <div className="text-center mb-4">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <span className="text-gray-500 dark:text-gray-400 line-through text-lg">
                                                {prices.original}
                                            </span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                {prices.discount}
                                            </span>
                                        </div>
                                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                                            Экономия: {prices.savings}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {packageItem.sessions} сеанса
                                        </p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <ShowModalBtn 
                                            item={{
                                                title: packageItem.title,
                                                description: packageItem.description,
                                                href: `#${packageItem.id}`
                                            }}
                                            customClassName="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            customText="Купить пакет"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Дополнительная информация */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            💡 Полезная информация
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Оплата</h4>
                                <p>Наличные, карта, переводом</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Отмена</h4>
                                <p>Бесплатная отмена за 2 часа</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Гарантия</h4>
                                <p>100% качество или возврат</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
