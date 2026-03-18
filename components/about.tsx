import ShowModalBtn from "@/components/showModalBtn";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {Data, SiteConfig} from "@/types";


export default async function About({ siteConfig }: { siteConfig: SiteConfig } ) {
    // Создаем фиктивную услугу для кнопки консультации
    const consultationService = {
        title: "Консультация",
        description: "Бесплатная консультация по подбору подходящего вида массажа и обсуждение ваших потребностей",
        href: "#consultation"
    };
    return (
        <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/api${siteConfig.images?.["about-bg"]}')`
                }}
            >
                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
            </div>

            <Container className="relative py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Левая колонка - Информация */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div
                                className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
                                <span className="text-emerald-300 text-sm font-medium">
                                    {siteConfig.about?.experience}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                {/*Привет, я <br />*/}
                                <span
                                    className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    {siteConfig.about?.name}
                                </span>
                            </h1>

                            <p className="text-xl text-emerald-300 font-medium">
                                {siteConfig.about?.title}
                            </p>
                        </div>

                        <p className="text-gray-200 text-lg leading-relaxed">
                            {siteConfig.about?.description}
                        </p>

                        {/* Достижения */}
                        <div className="space-y-3">
                            {siteConfig.about?.achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3 text-gray-200"
                                >
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm">{achievement}</span>
                                </div>
                            ))}
                        </div>

                        {/* Девиз */}
                        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <p className="text-white font-medium italic text-center">
                                {siteConfig.about?.motto}
                            </p>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <ShowModalBtn
                                    item={consultationService}
                                    customClassName="w-full"
                                    customText="Записаться на консультацию"
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="lg"
                                scrollTo="services"
                                className="border-white/30 text-white hover:bg-white/20 hover:text-white"
                            >
                                Посмотреть услуги
                            </Button>
                        </div>
                    </div>

                    {/* Правая колонка - Диплом и фото */}
                    <div className="space-y-8">
                        {/* Место для фото мастера */}
                        <div className="relative">
                            <div
                                className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">


                                    <img
                                        src={`/api${siteConfig.images?.['master-photo']}`}
                                        alt="Фото мастера"
                                        className="w-full h-full object-cover object-top"
                                        key={siteConfig.images?.['master-photo']} // Принудительное обновление при смене src
                                    />
                            </div>
                        </div>

                        {/* Место для диплома */}
                        <div className="relative">
                            <div
                                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl">
                                <h3 className="text-white font-semibold mb-4 text-center">
                                    📜 Сертификаты и дипломы
                                </h3>

                                {/* Фото диплома */}
                                <div
                                    className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">

                                        <img
                                            src={`/api${siteConfig.images?.diploma}`}
                                            alt="Диплом и сертификаты массажиста"
                                            className="w-full h-full object-cover rounded-xl"
                                            key={siteConfig.images?.diploma} // Принудительное обновление при смене src
                                        />

                                    {/* Fallback placeholder */}
                                    <div
                                        className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-dashed border-amber-300 dark:border-amber-700 flex items-center justify-center"
                                        style={{display: 'none'}}>
                                        <div className="text-center text-amber-700 dark:text-amber-300">
                                            <div
                                                className="w-16 h-16 mx-auto mb-3 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                            <p className="text-sm font-medium">Место для диплома</p>
                                            <p className="text-xs opacity-70">Загрузите через админку</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-gray-300 text-xs mt-3">
                                    Документы подтверждают квалификацию и право на оказание услуг
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}