import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'elevated';
    hover?: boolean;
}

const cardVariants = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/50',
    elevated: 'bg-white dark:bg-gray-900 shadow-2xl shadow-black/20'
};

export default function Card({ 
    children, 
    className, 
    variant = 'default',
    hover = false 
}: CardProps) {
    return (
        <div
            className={clsx(
                'rounded-3xl p-8 transition-all duration-500',
                cardVariants[variant],
                hover && 'hover:-translate-y-2 hover:shadow-3xl',
                className
            )}
        >
            {children}
        </div>
    );
}