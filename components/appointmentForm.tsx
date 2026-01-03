<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
    <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader>
                    Запись на услугу
                </ModalHeader>

                <ModalBody>
                    <p className="font-medium">
                        {activeService?.title}
                    </p>

                    <p className="text-sm text-foreground/70">
                        {activeService?.description}
                    </p>

                    {/* здесь форма записи */}
                </ModalBody>

                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Отмена
                    </Button>
                    <Button color="primary">
                        Отправить
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
</Modal>
