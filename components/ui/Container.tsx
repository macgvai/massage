import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: 'default' | 'narrow' | 'wide';
}

const containerSizes = {
    default: 'container mx-auto px-4',
    narrow: 'max-w-4xl mx-auto px-4',
    wide: 'max-w-8xl mx-auto px-4'
};

export default function Container({ 
    children, 
    className, 
    size = 'default' 
}: ContainerProps) {
    return (
        <div className={clsx(containerSizes[size], className)}>
            {children}
        </div>
    );
}