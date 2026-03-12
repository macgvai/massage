import { getConfig } from './app/api/services/mainServices';

async function test() {
    console.log('🔍 Проверка изображений в БД...\n');
    
    const config = await getConfig();
    
    console.log('📸 Изображения в конфигурации:');
    console.log(JSON.stringify(config.images, null, 2));
    
    console.log('\n✅ Проверка завершена');
}

test().catch(console.error);
