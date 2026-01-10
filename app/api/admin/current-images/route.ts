import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        
        if (!fs.existsSync(imagesDir)) {
            return NextResponse.json({
                success: false,
                message: 'Папка изображений не найдена'
            });
        }

        const files = fs.readdirSync(imagesDir);
        
        // Функция для поиска актуального файла по типу
        const findCurrentImage = (type: string) => {
            // Ищем файлы с timestamp
            const timestampFiles = files.filter(f => 
                f.startsWith(`${type}-`) && 
                !f.includes('placeholder') && 
                !f.includes('realistic') &&
                !f.includes('backup')
            );
            
            if (timestampFiles.length > 0) {
                // Сортируем по timestamp (самый новый)
                timestampFiles.sort((a, b) => {
                    const timestampA = parseInt(a.split('-')[2]?.split('.')[0] || '0');
                    const timestampB = parseInt(b.split('-')[2]?.split('.')[0] || '0');
                    return timestampB - timestampA;
                });
                return `/images/${timestampFiles[0]}`;
            }
            
            // Fallback на старые файлы без timestamp
            const legacyFile = files.find(f => f.startsWith(`${type}.`));
            if (legacyFile) {
                return `/images/${legacyFile}`;
            }
            
            // Fallback на placeholder или realistic версии
            const fallbackFile = files.find(f => 
                f.startsWith(`${type}-realistic.`) || 
                f.startsWith(`${type}-placeholder.`)
            );
            if (fallbackFile) {
                return `/images/${fallbackFile}`;
            }
            
            return null;
        };

        const currentImages = {
            'about-bg': findCurrentImage('about-bg'),
            'advantages-bg': findCurrentImage('advantages-bg'),
            'diploma': findCurrentImage('diploma'),
            'master-photo': findCurrentImage('master-photo')
        };

        return NextResponse.json({
            success: true,
            images: currentImages
        });

    } catch (error) {
        console.error('Ошибка при получении текущих изображений:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при получении текущих изображений' },
            { status: 500 }
        );
    }
}