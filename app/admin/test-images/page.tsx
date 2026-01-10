'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export default function TestImagesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshImages = () => {
    setRefreshKey(prev => prev + 1);
  };

  const imageTests = [
    { path: '/images/about-bg.jpg', label: 'Фон секции "О мастере"' },
    { path: '/images/advantages-bg.jpg', label: 'Фон секции "Преимущества"' },
    { path: '/images/diploma.png', label: 'Диплом (PNG)' },
    { path: '/images/diploma-realistic.svg', label: 'Диплом fallback (SVG)' },
    { path: '/images/master-photo.jpg', label: 'Фото мастера' },
    { path: '/images/master-photo-placeholder.svg', label: 'Placeholder мастера' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🧪 Тест изображений
              </h1>
              <p className="text-gray-600">
                Проверка загрузки и отображения всех изображений сайта
              </p>
            </div>
            <button
              onClick={refreshImages}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              🔄 Обновить
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTests.map((test, index) => (
              <Card key={`${test.path}-${refreshKey}`} className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">{test.label}</h3>
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                  <img
                    src={`${test.path}?t=${refreshKey}`}
                    alt={test.label}
                    className="w-full h-full object-cover"
                    onLoad={() => console.log(`✅ Загружено: ${test.path}`)}
                    onError={(e) => {
                      console.log(`❌ Ошибка загрузки: ${test.path}`);
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-full h-full flex items-center justify-center text-gray-500 text-sm"
                    style={{ display: 'none' }}
                  >
                    Изображение не найдено
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 break-all">{test.path}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-3">📋 Инструкции по проверке:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>1. Все изображения должны загружаться без ошибок</p>
                <p>2. Если изображение не найдено, отобразится сообщение "Изображение не найдено"</p>
                <p>3. Проверьте консоль браузера на наличие ошибок загрузки</p>
                <p>4. Используйте кнопку "🔄 Обновить" для принудительного обновления кэша</p>
              </div>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Вернуться в админку
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}