'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from "@/config/site";
import ShowModalBtn from "@/components/showModalBtn";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function About() {
    const [currentImages, setCurrentImages] = useState({
        aboutBg: '/images/about-bg.jpg',
        diploma: '/images/diploma-realistic.svg',
        masterPhoto: '/images/master-photo-placeholder.svg'
    });
    const [isLoading, setIsLoading] = useState(true);

    // Загружаем актуальные пути к изображениям
    useEffect(() => {
        const fetchCurrentImages = async () => {
            try {
                const response = await fetch('/api/admin/current-images');
                const result = await response.json();
                
                if (result.success) {
                    setCurrentImages({
                        aboutBg: result.images['about-bg'] || '/images/about-bg.jpg',
                        diploma: result.images.diploma || '/images/diploma-realistic.svg',
                        masterPhoto: result.images['master-photo'] || '/images/master-photo-placeholder.svg'
                    });
                }
            } catch (error) {
                console.error('Ошибка при получении текущих изображений:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentImages();
    }, []);

    const scrollToServices = () => {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Создаем фиктивную услугу для кнопки консультации
    const consultationService = {
        title: "Консультация",
        description: "Бесплатная консультация по подбору подходящего вида массажа и обсуждение ваших потребностей",
        href: "#consultation"
    };

    return (
        <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Фоновое изображение */}
            {!isLoading && (
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${currentImages.aboutBg}')`
                    }}
                >
                    {/* Градиентный оверлей */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                </div>
            )}

            <Container className="relative py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Левая колонка - Информация */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
                                <span className="text-emerald-300 text-sm font-medium">
                                    ✨ {siteConfig.about.experience}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Привет, я <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    {siteConfig.about.name}
                                </span>
                            </h1>
                            
                            <p className="text-xl text-emerald-300 font-medium">
                                {siteConfig.about.title}
                            </p>
                        </div>

                        <p className="text-gray-200 text-lg leading-relaxed">
                            {siteConfig.about.description}
                        </p>

                        {/* Достижения */}
                        <div className="space-y-3">
                            {siteConfig.about.achievements.map((achievement, index) => (
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
                                "{siteConfig.about.motto}"
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
                                onClick={scrollToServices}
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
                            <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                                {!isLoading && currentImages.masterPhoto ? (
                                    <img 
                                        src={currentImages.masterPhoto}
                                        alt="Фото мастера"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback если изображение не загрузится
                                            const target = e.currentTarget;
                                            target.src = '/images/master-photo-placeholder.svg';
                                        }}
                                    />
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-emerald-500 rounded-full mx-auto mb-2"></div>
                                        <p className="text-sm">Загрузка...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Место для диплома */}
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl">
                                <h3 className="text-white font-semibold mb-4 text-center">
                                    📜 Сертификаты и дипломы
                                </h3>
                                
                                {/* Фото диплома */}
                                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                                    {!isLoading && currentImages.diploma ? (
                                        <img 
                                            src={currentImages.diploma}
                                            alt="Диплом и сертификаты массажиста"
                                            className="w-full h-full object-cover rounded-xl"
                                            onError={(e) => {
                                                // Если загруженный диплом не найден, показываем SVG fallback
                                                const target = e.currentTarget;
                                                if (!target.src.includes('diploma-realistic.svg')) {
                                                    target.src = '/images/diploma-realistic.svg';
                                                } else {
                                                    // Если и SVG не загрузился, показываем fallback
                                                    target.style.display = 'none';
                                                    const fallback = target.nextElementSibling as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-emerald-500 rounded-full mx-auto mb-2"></div>
                                            <p className="text-sm">Загрузка...</p>
                                        </div>
                                    )}
                                    {/* Fallback placeholder */}
                                    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-dashed border-amber-300 dark:border-amber-700 flex items-center justify-center" style={{display: 'none'}}>
                                        <div className="text-center text-amber-700 dark:text-amber-300">
                                            <div className="w-16 h-16 mx-auto mb-3 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

            {/* Стрелка вниз */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}