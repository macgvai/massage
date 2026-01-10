import type { Metadata } from "next";
import AuthWrapper from "./auth-wrapper";

export const metadata: Metadata = {
    title: "Админ-панель — Массажный салон",
    description: "Панель администратора для редактирования лендинга массажного салона",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthWrapper>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </AuthWrapper>
    );
}