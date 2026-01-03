import {siteConfig} from "@/config/site";
import {Button} from "@heroui/react";
import {Modal} from "@heroui/modal";
import ShowModalBtn from "@/components/showModalBtn";

export default function Services() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Наши <span className="text-primary">услуги</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteConfig.services.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="group relative rounded-2xl bg-white/70 dark:bg-white/5   backdrop-blur
                                border border-black/5 dark:border-white/10
                                shadow-sm
                                transition-all duration-300
                                hover:-translate-y-1 hover:shadow-xl
                              "
                        >
                            {/* декоративный градиент */}
                            <div className="
                                absolute inset-0 rounded-2xl
                                bg-linear-to-br from-primary/10 via-transparent to-transparent
                                opacity-0 group-hover:opacity-100
                                transition-opacity
                              "/>

                            <div className="relative p-6 flex flex-col h-full">
                                <h2 className="text-xl font-semibold mb-3">
                                    {item.title}
                                </h2>

                                <p className="text-sm text-foreground/70 leading-relaxed flex-grow">
                                    {item.description}
                                </p>

                                <ShowModalBtn item={item} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
