import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getConfig, updateConfig } from '@/app/api/services/mainServices';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string;

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'Файл не найден' },
                { status: 400 }
            );
        }

        // Проверяем тип файла (разрешаем только изображения)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: 'Неподдерживаемый тип файла. Разрешены: JPG, PNG, WebP' },
                { status: 400 }
            );
        }

        // Проверяем размер файла (максимум 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'Файл слишком большой. Максимальный размер: 5MB' },
                { status: 400 }
            );
        }

        // Определяем имя файла
        const timestamp = Date.now();
        const fileName = `${type}-${timestamp}.webp`; // Всегда WebP

        // Создаем директорию если её нет
        const uploadDir = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Удаляем старые файлы того же типа
        const files = fs.readdirSync(uploadDir);
        const oldFiles = files.filter(f =>
            f.startsWith(`${type}-`) &&
            !f.includes('placeholder') &&
            !f.includes('realistic') &&
            f !== fileName
        );

        oldFiles.forEach(oldFile => {
            const oldPath = path.join(uploadDir, oldFile);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        });

        // Читаем файл как Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Конвертируем изображение в WebP с помощью sharp
        const webpBuffer = await sharp(buffer)
            .webp({ quality: 80 }) // Можно настроить качество
            .toBuffer();

        // Сохраняем конвертированный файл
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, webpBuffer);

        // Путь для сохранения в БД
        const publicPath = `/images/${fileName}`;

        // Обновляем конфигурацию в БД
        const config = await getConfig();
        config.images = config.images || {};
        config.images[type as keyof typeof config.images] = publicPath;
        await updateConfig(config);

        return NextResponse.json({
            success: true,
            message: 'Файл успешно загружен, конвертирован в WebP и сохранён в БД',
            filePath: publicPath,
            fileName: fileName
        });

    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        return NextResponse.json(
            { success: false, message: `Ошибка: ${error}` },
            { status: 500 }
        );
    }
}