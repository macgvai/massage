import initDb from '@/db/client';
import { AdminConfig } from '@/types';

// Получить всю конфигурацию
export async function getConfig(): Promise<AdminConfig> {
    const db = await initDb();
    const row = await db.get('SELECT value FROM key_value WHERE key = ?', 'config');
    
    if (!row) {
        throw new Error('Конфигурация не найдена в БД');
    }
    
    return JSON.parse(row.value) as AdminConfig;
}

// Обновить конфигурацию
export async function updateConfig(config: AdminConfig): Promise<void> {
    const db = await initDb();
    await db.run(
        'INSERT OR REPLACE INTO key_value (key, value) VALUES (?, ?)',
        'config',
        JSON.stringify(config)
    );
}

// Для обратной совместимости
export async function getSiteConfig() {
    return getConfig();
}

export async function getAbout() {
    const config = await getConfig();
    return config.about;
}
