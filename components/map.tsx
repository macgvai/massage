'use client'

import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

export default function Map() {
    return (
        <section id="map" className="py-16 bg-white dark:bg-gray-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        📍 Как нас найти
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Мы находимся в удобном месте в центре Симферополя. 
                        Легко добраться на любом транспорте.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Карта */}
                    <div className="relative">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                            {/* Встраиваемая карта с точными координатами для ул. Беспалова, 110м */}
                            <div className="relative w-full h-96 lg:h-[400px]">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=34.130%2C44.926%2C34.141%2C44.937&amp;layer=mapnik&amp;marker=44.931419%2C34.135954"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Карта расположения массажного салона на ул. Беспалова, 110м"
                                />
                                
                                {/* Наложение с информацией о точке */}
                                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs z-10">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <div>
                                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                                Массажный салон Андрея Васкеса
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                ул. Беспалова, 110м
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Симферополь
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Альтернативные ссылки с точными координатами */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href={`https://yandex.ru/maps/?ll=34.135954%2C44.931419&z=17&pt=34.135954%2C44.931419%2Cpm2rdm`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Яндекс.Карты
                            </a>
                            <a
                                href={`https://maps.google.com/?q=44.931419,34.135954`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Google Maps
                            </a>
                            <a
                                href={`https://2gis.ru/simferopol?m=34.135954%2C44.931419%2F16`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                2ГИС
                            </a>
                        </div>
                    </div>

                    {/* Информация о местоположении */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                📍 Адрес и контакты
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Адрес</p>
                                        <p className="text-gray-600 dark:text-gray-300">{siteConfig.contact.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Телефон</p>
                                        <a 
                                            href={`tel:${siteConfig.contact.phone}`}
                                            className="text-green-600 dark:text-green-400 hover:underline"
                                        >
                                            {siteConfig.contact.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Режим работы</p>
                                        <p className="text-gray-600 dark:text-gray-300">{siteConfig.contact.workingHours}</p>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                                        <a 
                                            href={siteConfig.social.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 dark:text-green-400 hover:underline"
                                        >
                                            Написать в WhatsApp
                                        </a>
                                    </div>
                                </div>

                                {/* Telegram */}
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Telegram</p>
                                        <a 
                                            href={siteConfig.social.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Написать в Telegram
                                        </a>
                                    </div>
                                </div>

                                {siteConfig.contact.parking && (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Парковка</p>
                                            <p className="text-gray-600 dark:text-gray-300">{siteConfig.contact.parking}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}