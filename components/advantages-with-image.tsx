'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from "@/config/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

export default function AdvantagesWithImage() {
    const [currentBgImage, setCurrentBgImage] = useState('/images/advantages-bg.jpg');
    const [isLoading, setIsLoading] = useState(true);

    // Загружаем актуальный путь к фоновому изображению
    useEffect(() => {
        const fetchCurrentImage = async () => {
            try {
                console.log('Загружаем фоновое изображение для advantages...');
                const response = await fetch('/api/admin/current-images');
                const result = await response.json();
                
                console.log('Ответ API для advantages-bg:', result);
                
                if (result.success && result.images['advantages-bg']) {
                    console.log('Устанавливаем новое фоновое изображение:', result.images['advantages-bg']);
                    setCurrentBgImage(result.images['advantages-bg']);
                }
            } catch (error) {
                console.error('Ошибка при получении фонового изображения:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentImage();
        
        // Добавляем слушатель для обновления изображений
        const handleImageUpdate = () => {
            console.log('Получен сигнал обновления изображений в advantages');
            fetchCurrentImage();
        };
        
        window.addEventListener('imageUpdated', handleImageUpdate);
        
        return () => {
            window.removeEventListener('imageUpdated', handleImageUpdate);
        };
    }, []);

    return (
        <section id="advantages" className="relative py-20 overflow-hidden">
            {/* Фоновое изображение через CSS */}
            {!isLoading && (
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${currentBgImage}')`
                    }}
                >
                    {/* Темный оверлей для читаемости текста */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
                </div>
            )}
            
            {/* Декоративные элементы */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <Container className="relative">
                <SectionTitle 
                    highlight="нас"
                    subtitle="Мы создаем идеальные условия для вашего расслабления и восстановления"
                    className="text-white [&_p]:text-gray-200"
                >
                    Почему выбирают нас
                </SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteConfig.advantages.map((advantage, index) => (
                        <Card
                            key={`${advantage.title}-${index}`}
                            variant="glass"
                            hover={true}
                            className="group text-center"
                        >
                            {/* Декоративный градиент */}
                            <div className="
                                absolute inset-0 rounded-3xl
                                bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-500
                            "/>

                            <div className="relative">
                                {/* Иконка с фоном */}
                                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                                    {advantage.icon}
                                </div>

                                {/* Заголовок */}
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                                    {advantage.title}
                                </h3>

                                {/* Описание */}
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {advantage.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}