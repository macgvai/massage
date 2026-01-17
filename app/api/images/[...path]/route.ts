import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const imagePath = resolvedParams.path.join('/');
        const fullPath = path.join(process.cwd(), 'public', 'images', imagePath);
        
        console.log('Запрос изображения:', imagePath);
        console.log('Полный путь:', fullPath);
        
        // Проверяем что файл существует
        if (!fs.existsSync(fullPath)) {
            console.log('Файл не найден:', fullPath);
            return new NextResponse('Image not found', { status: 404 });
        }
        
        // Читаем файл
        const imageBuffer = fs.readFileSync(fullPath);
        
        // Определяем MIME тип по расширению
        const ext = path.extname(imagePath).toLowerCase();
        let contentType = 'image/jpeg'; // по умолчанию
        
        switch (ext) {
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.webp':
                contentType = 'image/webp';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
        }
        
        console.log('Отправляем изображение:', imagePath, 'тип:', contentType, 'размер:', imageBuffer.length);
        
        // Возвращаем изображение с правильными заголовками
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
        
    } catch (error) {
        console.error('Ошибка при обслуживании изображения:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}