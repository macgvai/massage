'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface ImageUploaderProps {
  type: 'about-bg' | 'advantages-bg' | 'diploma' | 'master-photo';
  onUploadSuccess: (filePath: string) => void;
  label: string;
  description?: string;
  aspectRatio?: string;
  maxWidth?: string;
}

export default function ImageUploader({
  type,
  onUploadSuccess,
  label,
  description,
  aspectRatio = 'aspect-video',
  maxWidth = 'max-w-md'
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [actualCurrentImage, setActualCurrentImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загружаем актуальный путь к изображению
  useEffect(() => {
    const fetchCurrentImage = async () => {
      try {
        const response = await fetch('/api/admin/current-images');
        const result = await response.json();
        
        if (result.success && result.images[type]) {
          setActualCurrentImage(result.images[type]);
        } else {
          // Fallback на дефолтные пути
          const fallbacks = {
            'about-bg': '/images/about-bg.jpg',
            'advantages-bg': '/images/advantages-bg.jpg',
            'diploma': '/images/diploma-realistic.svg',
            'master-photo': '/images/master-photo-placeholder.svg'
          };
          setActualCurrentImage(fallbacks[type]);
        }
      } catch (error) {
        console.error('Ошибка при получении текущего изображения:', error);
      }
    };

    fetchCurrentImage();
  }, [type]);

  // Определяем текущее изображение
  const getCurrentImage = () => {
    if (previewImage) return previewImage;
    if (actualCurrentImage) return actualCurrentImage;
    return null; // Возвращаем null вместо пустой строки
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Сохраняем выбранный файл
    setSelectedFile(file);

    // Создаем предварительный просмотр
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setUploadMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadMessage('✅ Изображение загружено успешно!');
        setActualCurrentImage(result.filePath); // Обновляем актуальный путь
        onUploadSuccess(result.filePath);
        
        // Очищаем предварительный просмотр и выбранный файл
        setTimeout(() => {
          setPreviewImage(null);
          setSelectedFile(null);
          setUploadMessage('');
        }, 2000);
      } else {
        setUploadMessage('❌ ' + result.message);
      }
    } catch (error) {
      setUploadMessage('❌ Ошибка при загрузке');
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setUploadMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mb-3">{description}</p>
        )}
      </div>

      {/* Текущее изображение */}
      <div className={`${maxWidth} mx-auto`}>
        <div className="text-xs text-gray-500 mb-2">
          {previewImage ? 'Предварительный просмотр:' : 'Текущее изображение:'}
        </div>
        <div className={`${aspectRatio} rounded-lg overflow-hidden border-2 ${previewImage ? 'border-emerald-400' : 'border-gray-200'}`}>
          {getCurrentImage() ? (
            <img
              src={getCurrentImage()!}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                
                // Показываем встроенный placeholder при ошибке
                target.src = 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f3f4f6"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">
                      Изображение не найдено
                    </text>
                  </svg>
                `);
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-emerald-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Загрузка...</p>
              </div>
            </div>
          )}
        </div>
        {actualCurrentImage && (
          <p className="text-xs text-gray-400 mt-1 break-all">
            {actualCurrentImage}
          </p>
        )}
      </div>

      {/* Зона загрузки */}
      <div
        className={`${maxWidth} mx-auto border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          previewImage && selectedFile 
            ? 'border-emerald-400 bg-emerald-50' 
            : dragOver
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'
        }`}
        onDrop={!previewImage ? handleDrop : undefined}
        onDragOver={!previewImage ? handleDragOver : undefined}
        onDragLeave={!previewImage ? handleDragLeave : undefined}
        onClick={!previewImage ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-3">
          <div className="text-4xl">📸</div>
          
          {isUploading ? (
            <div className="text-emerald-600">
              <div className="animate-spin w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Загрузка...</p>
            </div>
          ) : previewImage && selectedFile ? (
            <div className="text-emerald-600">
              <p className="text-sm font-medium">✅ Файл выбран</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
              <p className="text-xs text-emerald-600 mt-2">
                👆 Нажмите "Сохранить" чтобы применить изменения
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Нажмите или перетащите изображение
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WebP до 5MB
                </p>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="pointer-events-none"
              >
                Выбрать файл
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Кнопки действий для предварительного просмотра */}
      {previewImage && selectedFile && !isUploading && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleUpload}
            variant="primary"
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            ✅ Сохранить изображение
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ❌ Отмена
          </Button>
        </div>
      )}

      {/* Сообщение о результате */}
      {uploadMessage && (
        <div className="text-center">
          <p className="text-sm font-medium">{uploadMessage}</p>
        </div>
      )}

      {/* Рекомендации */}
      <div className="text-xs text-gray-500 space-y-1">
        {type === 'about-bg' && (
          <p>💡 Рекомендуется: фото массажиста за работой, размер 1920x1080px или больше</p>
        )}
        {type === 'advantages-bg' && (
          <p>💡 Рекомендуется: интерьер спа-салона, размер 1920x1080px или больше</p>
        )}
        {type === 'diploma' && (
          <p>💡 Рекомендуется: фото диплома/сертификата, соотношение сторон 4:3</p>
        )}
        {type === 'master-photo' && (
          <p>💡 Рекомендуется: портретное фото мастера, квадратное 400x400px или больше</p>
        )}
      </div>
    </div>
  );
}