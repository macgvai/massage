import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string; // 'about-bg', 'advantages-bg', 'diploma', 'master-photo'
        
        if (!file) {
            return NextResponse.json(
                { success: false, message: 'Файл не найден' },
                { status: 400 }
            );
        }

        // Проверяем тип файла
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: 'Неподдерживаемый тип файла. Разрешены: JPG, PNG, WebP' },
                { status: 400 }
            );
        }

        // Проверяем размер файла (максимум 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'Файл слишком большой. Максимальный размер: 5MB' },
                { status: 400 }
            );
        }

        // Определяем имя файла с timestamp для уникальности
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        let fileName = '';
        
        switch (type) {
            case 'about-bg':
                fileName = `about-bg-${timestamp}.${fileExtension}`;
                break;
            case 'advantages-bg':
                fileName = `advantages-bg-${timestamp}.${fileExtension}`;
                break;
            case 'diploma':
                fileName = `diploma-${timestamp}.${fileExtension}`;
                break;
            case 'master-photo':
                fileName = `master-photo-${timestamp}.${fileExtension}`;
                break;
            default:
                return NextResponse.json(
                    { success: false, message: 'Неизвестный тип изображения' },
                    { status: 400 }
                );
        }

        // Создаем директорию если её нет
        const uploadDir = path.join(process.cwd(), 'public', 'images');
        console.log('Upload directory:', uploadDir);
        
        try {
            if (!fs.existsSync(uploadDir)) {
                console.log('Creating upload directory...');
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            
            // Проверяем права на запись
            fs.accessSync(uploadDir, fs.constants.W_OK);
            console.log('Directory is writable');
        } catch (error) {
            console.error('Directory access error:', error);
            return NextResponse.json(
                { success: false, message: `Ошибка доступа к директории: ${error}` },
                { status: 500 }
            );
        }

        // Удаляем старые файлы того же типа (кроме fallback файлов)
        const files = fs.readdirSync(uploadDir);
        const oldFiles = files.filter(f => {
            const isOldFile = f.startsWith(`${type.replace('-', '-')}-`) && 
                             !f.includes('placeholder') && 
                             !f.includes('realistic') &&
                             f !== fileName;
            return isOldFile;
        });

        // Создаем резервные копии старых файлов перед удалением
        oldFiles.forEach(oldFile => {
            const oldPath = path.join(uploadDir, oldFile);
            const backupPath = path.join(uploadDir, `${oldFile}.backup.${timestamp}`);
            if (fs.existsSync(oldPath)) {
                fs.copyFileSync(oldPath, backupPath);
                fs.unlinkSync(oldPath); // Удаляем старый файл
            }
        });

        // Сохраняем новый файл
        const filePath = path.join(uploadDir, fileName);
        console.log('Saving file to:', filePath);
        
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            fs.writeFileSync(filePath, buffer);
            console.log('File saved successfully');
            
            // Проверяем что файл действительно создался
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                console.log('File size:', stats.size, 'bytes');
            } else {
                throw new Error('File was not created');
            }
        } catch (writeError) {
            console.error('File write error:', writeError);
            return NextResponse.json(
                { success: false, message: `Ошибка записи файла: ${writeError}` },
                { status: 500 }
            );
        }

        // Возвращаем путь к файлу через API endpoint
        const publicPath = `/api/images/${fileName}`;

        return NextResponse.json({
            success: true,
            message: 'Файл успешно загружен',
            filePath: publicPath,
            fileName: fileName
        });

    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при загрузке файла' },
            { status: 500 }
        );
    }
}