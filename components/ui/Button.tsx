import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    className?: string;
}

const buttonVariants = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white',
    outline: 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white',
    ghost: 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950'
};

const buttonSizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
};

export default function Button({ 
    variant = 'primary', 
    size = 'md', 
    className, 
    children, 
    ...props 
}: ButtonProps) {
    return (
        <button
            className={clsx(
                'font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                buttonVariants[variant],
                buttonSizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}