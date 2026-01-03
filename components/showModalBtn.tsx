'use client'

import {useState} from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import {Input, Textarea} from "@heroui/input";

export default function ShowModalBtn({item}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeService, setActiveService] = useState(null);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        comment: "",
    });

    return (
        <>
            <Button
                color="primary"
                variant="flat"
                className="mt-6 w-full"
                onClick={() => {
                    setActiveService(item);
                    setIsOpen(true);
                }}
            >
                Записаться
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement="center"
                className="mx-4 sm:mx-0"
            >
                <ModalContent
                    className="
                      w-full
                      max-w-sm
                      sm:max-w-md
                      rounded-2xl
                    "
                >
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center">
                                Запись на услугу
                            </ModalHeader>


                            <ModalBody className="gap-4">
                                <p className="font-medium text-center">
                                    {activeService?.title}
                                </p>

                                <p className="text-sm text-foreground/70 text-center">
                                    {activeService?.description}
                                </p>

                                <Input
                                    label="Ваше имя"
                                    value={form.name}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({...prev, name: value}))
                                    }
                                />

                                <Input
                                    label="Телефон"
                                    type="tel"
                                    value={form.phone}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({...prev, phone: value}))
                                    }
                                />

                                <Textarea
                                    label="Комментарий"
                                    value={form.comment}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({...prev, comment: value}))
                                    }
                                />
                            </ModalBody>


                            <ModalFooter className="flex flex-col sm:flex-row gap-2">
                                <Button variant="light" onPress={onClose} className="w-full">
                                    Отмена
                                </Button>
                                <Button color="primary" className="w-full"
                                        onPress={async () => {
                                            await fetch("/api/telegram", {
                                                method: "POST",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify({
                                                    name: form.name,
                                                    phone: form.phone,
                                                    comment: form.comment,
                                                    service: activeService?.title,
                                                }),
                                            });

                                            setIsOpen(false);
                                        }}
                                >
                                    Отправить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}
