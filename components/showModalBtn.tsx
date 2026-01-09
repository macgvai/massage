'use client'

import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import { Button as HeroUIButton } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";
import Button from "@/components/ui/Button";

interface Service {
    title: string;
    description: string;
    href: string;
}

interface FormData {
    name: string;
    phone: string;
    comment: string;
}

interface ShowModalBtnProps {
    item: Service;
    customClassName?: string;
    customText?: string;
}

export default function ShowModalBtn({ item, customClassName, customText }: ShowModalBtnProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<FormData>({
        name: "",
        phone: "",
        comment: "",
    });

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.phone.trim()) {
            return; // Можно добавить валидацию с уведомлениями
        }

        setIsLoading(true);
        
        try {
            await fetch("/api/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    comment: form.comment.trim(),
                    service: item.title,
                }),
            });

            // Сброс формы после успешной отправки
            setForm({ name: "", phone: "", comment: "" });
            setIsOpen(false);
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
            // Здесь можно добавить уведомление об ошибке
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setForm({ name: "", phone: "", comment: "" });
    };

    return (
        <>
            <Button
                variant="primary"
                size="lg"
                className={customClassName}
                onClick={() => setIsOpen(true)}
            >
                {customText || "Записаться на сеанс"}
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement="center"
                className="mx-4 sm:mx-0"
                closeButton
            >
                <ModalContent className="w-full max-w-md rounded-3xl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center pb-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        Запись на сеанс
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Заполните форму и мы свяжемся с вами
                                    </p>
                                </div>
                            </ModalHeader>

                            <ModalBody className="gap-4 px-6">
                                {/* Информация об услуге */}
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Форма */}
                                <div className="space-y-4">
                                    <Input
                                        label="Ваше имя"
                                        placeholder="Введите ваше имя"
                                        value={form.name}
                                        onValueChange={(value) =>
                                            setForm((prev) => ({ ...prev, name: value }))
                                        }
                                        isRequired
                                        variant="bordered"
                                        classNames={{
                                            input: "text-gray-800 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600"
                                        }}
                                    />

                                    <Input
                                        label="Телефон"
                                        placeholder="+7 (916) 990-53-65"
                                        type="tel"
                                        value={form.phone}
                                        onValueChange={(value) =>
                                            setForm((prev) => ({ ...prev, phone: value }))
                                        }
                                        isRequired
                                        variant="bordered"
                                        classNames={{
                                            input: "text-gray-800 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600"
                                        }}
                                    />

                                    <Textarea
                                        label="Комментарий"
                                        placeholder="Дополнительные пожелания или вопросы"
                                        value={form.comment}
                                        onValueChange={(value) =>
                                            setForm((prev) => ({ ...prev, comment: value }))
                                        }
                                        variant="bordered"
                                        minRows={3}
                                        classNames={{
                                            input: "text-gray-800 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600"
                                        }}
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
                                <HeroUIButton 
                                    variant="light" 
                                    onPress={handleClose} 
                                    className="w-full order-2 sm:order-1"
                                    isDisabled={isLoading}
                                >
                                    Отмена
                                </HeroUIButton>
                                <HeroUIButton 
                                    color="primary"
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold order-1 sm:order-2"
                                    onPress={handleSubmit}
                                    isLoading={isLoading}
                                    isDisabled={!form.name.trim() || !form.phone.trim()}
                                >
                                    {isLoading ? "Отправляем..." : "Записаться"}
                                </HeroUIButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
