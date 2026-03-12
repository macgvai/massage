import { NextRequest, NextResponse } from 'next/server';
import { getConfig, updateConfig } from '@/app/api/services/mainServices';

export async function GET() {
    try {
        const config = await getConfig();
        
        return NextResponse.json({
            success: true,
            message: 'Конфигурация получена',
            config
        });
    } catch (error) {
        console.error('Ошибка при получении конфигурации:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` 
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const config = body?.config;

        if (!config) {
            return NextResponse.json(
                { success: false, message: 'Пустая конфигурация' },
                { status: 400 }
            );
        }

        await updateConfig(config);

        return NextResponse.json({
            success: true,
            message: 'Конфигурация успешно сохранена'
        });
    } catch (error) {
        console.error('Ошибка при сохранении конфигурации:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` 
            },
            { status: 500 }
        );
    }
}
