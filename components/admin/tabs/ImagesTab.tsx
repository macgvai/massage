import { useMemo } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function ImagesTab() {
    const refreshKey = useMemo(() => Date.now(), []);

    const handleUploaded = () => {
        // if (typeof window !== 'undefined') {
        //     window.dispatchEvent(new Event('imageUpdated'));
        // }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Изображения сайта
                </h2>
                <p className="text-sm text-gray-600">
                    Загруженные изображения автоматически сохраняются в базе
                    данных
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ImageUploader
                    key={`about-${refreshKey}`}
                    type="about-bg"
                    label="Фон секции «О мастере»"
                    description="Рекомендуется: 1920x1080px, JPG/PNG/WebP"
                    onUploadSuccess={handleUploaded}
                />
                <ImageUploader
                    key={`advantages-${refreshKey}`}
                    type="advantages-bg"
                    label="Фон секции «Преимущества»"
                    description="Рекомендуется: 1920x1080px, JPG/PNG/WebP"
                    onUploadSuccess={handleUploaded}
                />
                <ImageUploader
                    key={`diploma-${refreshKey}`}
                    type="diploma"
                    label="Диплом / сертификат"
                    description="Соотношение 4:3, до 5MB"
                    aspectRatio="aspect-[4/3]"
                    onUploadSuccess={handleUploaded}
                />
                <ImageUploader
                    key={`master-${refreshKey}`}
                    type="master-photo"
                    label="Фото мастера"
                    description="Квадратное 800x800px+, до 5MB"
                    aspectRatio="aspect-square"
                    onUploadSuccess={handleUploaded}
                />
            </div>
        </div>
    );
}
