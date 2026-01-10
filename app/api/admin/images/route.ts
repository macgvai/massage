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
        
        // Фильтруем только изображения
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext);
        });

        // Группируем по типам
        const images = {
            'about-bg': imageFiles.filter(f => f.startsWith('about-bg.')),
            'advantages-bg': imageFiles.filter(f => f.startsWith('advantages-bg.')),
            'diploma': imageFiles.filter(f => f.startsWith('diploma.') && !f.includes('placeholder')),
            'master-photo': imageFiles.filter(f => f.startsWith('master-photo.') && !f.includes('placeholder')),
            'placeholders': imageFiles.filter(f => f.includes('placeholder')),
            'other': imageFiles.filter(f => 
                !f.startsWith('about-bg.') && 
                !f.startsWith('advantages-bg.') && 
                !f.startsWith('diploma.') && 
                !f.startsWith('master-photo.') &&
                !f.includes('placeholder')
            )
        };

        // Добавляем информацию о файлах
        const imageInfo = Object.entries(images).reduce((acc, [type, files]) => {
            acc[type] = files.map(file => {
                const filePath = path.join(imagesDir, file);
                const stats = fs.statSync(filePath);
                
                return {
                    name: file,
                    path: `/images/${file}`,
                    size: stats.size,
                    modified: stats.mtime,
                    exists: true
                };
            });
            return acc;
        }, {} as Record<string, any[]>);

        return NextResponse.json({
            success: true,
            images: imageInfo,
            totalFiles: imageFiles.length
        });

    } catch (error) {
        console.error('Ошибка при получении списка изображений:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при получении списка изображений' },
            { status: 500 }
        );
    }
}