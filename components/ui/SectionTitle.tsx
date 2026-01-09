import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionTitleProps {
    children: ReactNode;
    subtitle?: string;
    className?: string;
    centered?: boolean;
    highlight?: string; // Текст для выделения градиентом
}

export default function SectionTitle({ 
    children, 
    subtitle, 
    className, 
    centered = true,
    highlight 
}: SectionTitleProps) {
    const renderTitle = () => {
        if (highlight && typeof children === 'string') {
            const parts = children.split(highlight);
            return (
                <>
                    {parts[0]}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {highlight}
                    </span>
                    {parts[1]}
                </>
            );
        }
        return children;
    };

    return (
        <div className={clsx(centered && 'text-center', 'mb-12', className)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                {renderTitle()}
            </h2>
            {subtitle && (
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
}