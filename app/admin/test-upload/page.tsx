'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import ImageUploader from '@/components/admin/ImageUploader';

export default function TestUploadPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = (filePath: string) => {
    console.log('Файл загружен:', filePath);
    setRefreshKey(prev => prev + 1);
  };

  const imageTypes = [
    {
      type: 'about-bg' as const,
      label: 'Фон секции "О мастере"',
      description: 'Фоновое изображение для секции с информацией о массажисте',
      aspectRatio: 'aspect-video'
    },
    {
      type: 'advantages-bg' as const,
      label: 'Фон секции "Преимущества"',
      description: 'Фоновое изображение для секции с преимуществами салона',
      aspectRatio: 'aspect-video'
    },
    {
      type: 'diploma' as const,
      label: 'Диплом/Сертификат',
      description: 'Фотография диплома или сертификата массажиста',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      type: 'master-photo' as const,
      label: 'Фото мастера',
      description: 'Портретное фото массажиста для секции "О мастере"',
      aspectRatio: 'aspect-square'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🧪 Тест загрузки всех изображений
            </h1>
            <p className="text-gray-600">
              Проверка системы уникальных имен файлов с timestamp для всех типов изображений
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {imageTypes.map((imageType) => (
              <Card key={imageType.type} className="p-6">
                <ImageUploader
                  key={`${imageType.type}-test-${refreshKey}`}
                  type={imageType.type}
                  onUploadSuccess={handleUploadSuccess}
                  label={imageType.label}
                  description={imageType.description}
                  aspectRatio={imageType.aspectRatio}
                />
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-medium text-blue-900 mb-3">📋 Инструкции по тестированию:</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>1. Загрузите изображения для каждого типа</p>
                <p>2. Каждый файл получит уникальное имя с timestamp</p>
                <p>3. Старые файлы будут автоматически удалены</p>
                <p>4. Проверьте консоль браузера для отладочной информации</p>
                <p>5. Перейдите на основной сайт, чтобы увидеть изменения</p>
              </div>
            </Card>
          </div>

          <div className="mt-6 text-center space-x-4">
            <a
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Вернуться в админку
            </a>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              🏠 Посмотреть сайт
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}