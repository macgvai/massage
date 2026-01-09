import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

export default function Footer() {
    return (
        <footer id="contacts" className="relative bg-gray-900 text-white">
            {/* Декоративный градиент сверху */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            
            <Container className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* О нас */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-emerald-400">
                            Массажный салон
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Профессиональные массажные услуги для вашего здоровья и релаксации. 
                            Опытные мастера, комфортная атмосфера, индивидуальный подход.
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href={siteConfig.social.telegram}
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                                aria-label="Telegram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                </svg>
                            </a>
                            <a 
                                href={siteConfig.social.whatsapp}
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </a>
                            <a 
                                href={siteConfig.social.instagram}
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a 
                                href={siteConfig.social.vk}
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                                aria-label="VKontakte"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.744-.9-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.169-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.169.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Услуги */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Наши услуги
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Классический массаж</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Релакс-массаж</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Спортивный массаж</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Массаж шеи и плеч</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Антистресс-массаж</a></li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Контакты
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3">
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${siteConfig.contact.phone}`} className="text-gray-300 hover:text-white transition-colors">
                                    {siteConfig.contact.phone}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-300 hover:text-white transition-colors">
                                    {siteConfig.contact.email}
                                </a>
                            </div>
                            <div className="flex items-start space-x-3">
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-300">
                                    {siteConfig.contact.address}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Режим работы */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Режим работы
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-3">
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-300">
                                    {siteConfig.contact.workingHours}
                                </span>
                            </div>
                            <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-800/30">
                                <p className="text-emerald-300 text-xs font-medium">
                                    📞 Запись по телефону или через мессенджеры
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Разделитель */}
                <div className="border-t border-gray-800 mt-8 pt-6">
                    <div className="flex justify-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Массажный салон. Все права защищены.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}