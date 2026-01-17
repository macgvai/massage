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
        console.log('Все файлы в папке images:', files);
        
        // Функция для поиска актуального файла по типу
        const findCurrentImage = (type: string) => {
            console.log(`Ищем изображение типа: ${type}`);
            
            // Ищем файлы с timestamp
            const timestampFiles = files.filter(f => {
                const matches = f.startsWith(`${type}-`) && 
                               !f.includes('placeholder') && 
                               !f.includes('realistic') &&
                               !f.includes('backup');
                console.log(`Файл ${f} подходит для ${type}:`, matches);
                return matches;
            });
            
            console.log(`Найденные файлы с timestamp для ${type}:`, timestampFiles);
            
            if (timestampFiles.length > 0) {
                // Сортируем по timestamp (самый новый)
                timestampFiles.sort((a, b) => {
                    // Извлекаем timestamp из имени файла (например: master-photo-1768051787714.jpg)
                    const timestampA = parseInt(a.split('-').pop()?.split('.')[0] || '0');
                    const timestampB = parseInt(b.split('-').pop()?.split('.')[0] || '0');
                    console.log(`Сравниваем timestamps: ${a} (${timestampA}) vs ${b} (${timestampB})`);
                    return timestampB - timestampA;
                });
                const selectedFile = `/api/images/${timestampFiles[0]}`;
                console.log(`Выбран файл для ${type}:`, selectedFile);
                return selectedFile;
            }
            
            // Fallback на старые файлы без timestamp
            const legacyFile = files.find(f => f.startsWith(`${type}.`));
            if (legacyFile) {
                console.log(`Найден legacy файл для ${type}:`, legacyFile);
                return `/api/images/${legacyFile}`;
            }
            
            // Fallback на placeholder или realistic версии
            const fallbackFile = files.find(f => 
                f.startsWith(`${type}-realistic.`) || 
                f.startsWith(`${type}-placeholder.`)
            );
            if (fallbackFile) {
                console.log(`Найден fallback файл для ${type}:`, fallbackFile);
                return `/images/${fallbackFile}`; // Эти файлы остаются через обычный путь
            }
            
            console.log(`Файл для ${type} не найден`);
            return null;
        };

        const currentImages = {
            'about-bg': findCurrentImage('about-bg'),
            'advantages-bg': findCurrentImage('advantages-bg'),
            'diploma': findCurrentImage('diploma'),
            'master-photo': findCurrentImage('master-photo')
        };

        console.log('Результат поиска изображений:', currentImages);

        return NextResponse.json({
            success: true,
            images: currentImages,
            debug: {
                allFiles: files,
                imagesDir: imagesDir
            }
        });

    } catch (error) {
        console.error('Ошибка при получении текущих изображений:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при получении текущих изображений' },
            { status: 500 }
        );
    }
}