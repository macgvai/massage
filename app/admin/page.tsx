'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ImageUploader from '@/components/admin/ImageUploader';
import {updateAbout} from "@/app/api/services/mainServices";

interface AdminConfig {
  name: string;
  fullName: string;
  description: string;
  about: {
    name: string;
    title: string;
    experience: string;
    description: string;
    motto: string;
    achievements: string[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
  };
  social: {
    telegram: string;
    whatsapp: string;
    instagram: string;
    vk: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    benefits: string[];
  }>;
  specialOffers: {
    enabled: boolean;
    consultation: {
      enabled: boolean;
      title: string;
      description: string;
      duration: number;
    };
    packages: Array<{
      id: string;
      enabled: boolean;
      title: string;
      description: string;
      sessions: number;
      serviceId: string;
      originalPrice: number;
      discountPrice: number;
      discount: number;
      savings: number;
    }>;
  };
}

export default function AdminPage() {
  const [config, setConfig] = useState<AdminConfig>({
    name: siteConfig.name,
    fullName: siteConfig.fullName,
    description: siteConfig.description,
    about: { ...siteConfig.about },
    contact: { ...siteConfig.contact },
    social: { ...siteConfig.social },
    services: [...siteConfig.services],
    specialOffers: {
      enabled: siteConfig.specialOffers.enabled,
      consultation: { ...siteConfig.specialOffers.consultation },
      packages: [...siteConfig.specialOffers.packages]
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/updateConfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({config}),
      });

      // TODO переделать всё на sqlite

      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSaveMessage('✅ Изменения сохранены успешно!');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        setSaveMessage('❌ Ошибка при сохранении: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Ошибка при сохранении');
      console.error('Ошибка:', error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const tabs = [
    { id: 'general', label: 'Общие настройки', icon: '⚙️' },
    { id: 'about', label: 'О мастере', icon: '👨‍⚕️' },
    { id: 'contact', label: 'Контакты', icon: '📞' },
    { id: 'services', label: 'Услуги', icon: '💆‍♂️' },
    { id: 'offers', label: 'Спец. предложения', icon: '🎁' },
    { id: 'images', label: 'Изображения', icon: '🖼️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🛠️ Админ-панель
              </h1>
              <p className="text-gray-600">Редактирование лендинга массажного салона</p>
            </div>
            <div className="flex items-center gap-4">
              {saveMessage && (
                <span className="text-sm font-medium">{saveMessage}</span>
              )}
              <a 
                href="/admin/help"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                📚 Справка
              </a>
              <a 
                href="/admin/test-images"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
              >
                🧪 Тест изображений
              </a>
              <a 
                href="/admin/test-upload"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
              >
                📤 Тест загрузки
              </a>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isSaving ? '💾 Сохранение...' : '💾 Сохранить изменения'}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {activeTab === 'general' && (
                <GeneralSettings config={config} updateConfig={updateConfig} />
              )}
              {activeTab === 'about' && (
                <AboutSettings config={config} updateConfig={updateConfig} />
              )}
              {activeTab === 'contact' && (
                <ContactSettings config={config} updateConfig={updateConfig} />
              )}
              {activeTab === 'services' && (
                <ServicesSettings config={config} updateConfig={updateConfig} />
              )}
              {activeTab === 'offers' && (
                <OffersSettings config={config} updateConfig={updateConfig} />
              )}
              {activeTab === 'images' && (
                <ImagesSettings />
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Остальные компоненты остаются без изменений
function GeneralSettings({ config, updateConfig }: { config: AdminConfig; updateConfig: (path: string, value: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">🏢 Общие настройки сайта</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название сайта
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => updateConfig('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Полное название
          </label>
          <input
            type="text"
            value={config.fullName}
            onChange={(e) => updateConfig('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание сайта
        </label>
        <textarea
          value={config.description}
          onChange={(e) => updateConfig('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );
}

function AboutSettings({ config, updateConfig }: { config: AdminConfig; updateConfig: (path: string, value: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">👨‍⚕️ Информация о мастере</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя мастера
          </label>
          <input
            type="text"
            value={config.about.name}
            onChange={(e) => updateConfig('about.name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Должность
          </label>
          <input
            type="text"
            value={config.about.title}
            onChange={(e) => updateConfig('about.title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Опыт работы
        </label>
        <input
          type="text"
          value={config.about.experience}
          onChange={(e) => updateConfig('about.experience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание мастера
        </label>
        <textarea
          value={config.about.description}
          onChange={(e) => updateConfig('about.description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Девиз мастера
        </label>
        <input
          type="text"
          value={config.about.motto}
          onChange={(e) => updateConfig('about.motto', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Достижения (по одному на строку)
        </label>
        <textarea
          value={config.about.achievements.join('\n')}
          onChange={(e) => updateConfig('about.achievements', e.target.value.split('\n').filter(line => line.trim()))}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );
}

function ContactSettings({ config, updateConfig }: { config: AdminConfig; updateConfig: (path: string, value: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">📞 Контактная информация</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Телефон
          </label>
          <input
            type="text"
            value={config.contact.phone}
            onChange={(e) => updateConfig('contact.phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={config.contact.email}
            onChange={(e) => updateConfig('contact.email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Адрес
        </label>
        <input
          type="text"
          value={config.contact.address}
          onChange={(e) => updateConfig('contact.address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Часы работы
        </label>
        <input
          type="text"
          value={config.contact.workingHours}
          onChange={(e) => updateConfig('contact.workingHours', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Социальные сети */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">🌐 Социальные сети</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📱 Telegram
            </label>
            <input
              type="url"
              value={config.social.telegram}
              onChange={(e) => updateConfig('social.telegram', e.target.value)}
              placeholder="https://t.me/username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💬 WhatsApp
            </label>
            <input
              type="url"
              value={config.social.whatsapp}
              onChange={(e) => updateConfig('social.whatsapp', e.target.value)}
              placeholder="https://wa.me/79169905365"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📷 Instagram
            </label>
            <input
              type="url"
              value={config.social.instagram}
              onChange={(e) => updateConfig('social.instagram', e.target.value)}
              placeholder="https://instagram.com/username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔵 ВКонтакте
            </label>
            <input
              type="url"
              value={config.social.vk}
              onChange={(e) => updateConfig('social.vk', e.target.value)}
              placeholder="https://vk.com/username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Подсказки */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Подсказки по ссылкам:</h4>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Telegram:</strong> https://t.me/ваш_username</p>
            <p><strong>WhatsApp:</strong> https://wa.me/79169905365 (номер без + и пробелов)</p>
            <p><strong>Instagram:</strong> https://instagram.com/ваш_username</p>
            <p><strong>ВКонтакте:</strong> https://vk.com/ваш_username</p>
          </div>
        </div>

        {/* Предварительный просмотр */}
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">👁️ Предварительный просмотр ссылок:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {config.social.telegram && (
              <a 
                href={config.social.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                📱 Telegram
              </a>
            )}
            {config.social.whatsapp && (
              <a 
                href={config.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-green-600 hover:text-green-800"
              >
                💬 WhatsApp
              </a>
            )}
            {config.social.instagram && (
              <a 
                href={config.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-pink-600 hover:text-pink-800"
              >
                📷 Instagram
              </a>
            )}
            {config.social.vk && (
              <a 
                href={config.social.vk} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-700 hover:text-blue-900"
              >
                🔵 ВКонтакте
              </a>
            )}
          </div>
          {!config.social.telegram && !config.social.whatsapp && !config.social.instagram && !config.social.vk && (
            <p className="text-xs text-gray-500">Добавьте ссылки на социальные сети выше</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesSettings({ config, updateConfig }: { config: AdminConfig; updateConfig: (path: string, value: any) => void }) {
  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'Новая услуга',
      description: 'Описание новой услуги',
      duration: 60,
      price: 3000,
      benefits: ['Преимущество 1', 'Преимущество 2']
    };
    updateConfig('services', [...config.services, newService]);
  };

  const removeService = (index: number) => {
    const newServices = config.services.filter((_, i) => i !== index);
    updateConfig('services', newServices);
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...config.services];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      (newServices[index] as any)[parent][child] = value;
    } else {
      (newServices[index] as any)[field] = value;
    }
    updateConfig('services', newServices);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">💆‍♂️ Услуги и цены</h2>
        <Button onClick={addService} className="bg-emerald-600 hover:bg-emerald-700">
          ➕ Добавить услугу
        </Button>
      </div>

      <div className="space-y-6">
        {config.services.map((service, index) => (
          <Card key={service.id} className="p-4 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Услуга #{index + 1}</h3>
              <button
                onClick={() => removeService(index)}
                className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
              >
                🗑️ Удалить
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название услуги
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Длительность (мин)
                  </label>
                  <input
                    type="number"
                    value={service.duration}
                    onChange={(e) => updateService(index, 'duration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цена (₽)
                  </label>
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) => updateService(index, 'price', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание услуги
              </label>
              <textarea
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Преимущества (по одному на строку)
              </label>
              <textarea
                value={service.benefits.join('\n')}
                onChange={(e) => updateService(index, 'benefits', e.target.value.split('\n').filter(line => line.trim()))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Компонент для управления изображениями
function ImagesSettings() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = (filePath: string) => {
    // Обновляем компонент чтобы показать новое изображение
    setRefreshKey(prev => prev + 1);
    
    // Принудительно обновляем кэш изображений
    setTimeout(() => {
      // Добавляем timestamp к URL изображений для обхода кэша
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.src.includes(filePath.replace('/images/', ''))) {
          const url = new URL(img.src);
          url.searchParams.set('t', Date.now().toString());
          img.src = url.toString();
        }
      });
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">🖼️ Управление изображениями</h2>
        <p className="text-gray-600 mb-6">
          Загрузите изображения для фонов секций, диплома и фото мастера. 
          Изменения применятся сразу после загрузки.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Фон секции "О мастере" */}
        <Card className="p-6">
          <ImageUploader
            key={`about-bg-${refreshKey}`}
            type="about-bg"
            onUploadSuccess={handleUploadSuccess}
            label="Фон секции 'О мастере'"
            description="Фоновое изображение для секции с информацией о массажисте"
            aspectRatio="aspect-video"
          />
        </Card>

        {/* Фон секции "Преимущества" */}
        <Card className="p-6">
          <ImageUploader
            key={`advantages-bg-${refreshKey}`}
            type="advantages-bg"
            onUploadSuccess={handleUploadSuccess}
            label="Фон секции 'Преимущества'"
            description="Фоновое изображение для секции с преимуществами салона"
            aspectRatio="aspect-video"
          />
        </Card>

        {/* Диплом */}
        <Card className="p-6">
          <ImageUploader
            key={`diploma-${refreshKey}`}
            type="diploma"
            onUploadSuccess={handleUploadSuccess}
            label="Диплом/Сертификат"
            description="Фотография диплома или сертификата массажиста"
            aspectRatio="aspect-[4/3]"
          />
        </Card>

        {/* Фото мастера */}
        <Card className="p-6">
          <ImageUploader
            key={`master-photo-${refreshKey}`}
            type="master-photo"
            onUploadSuccess={handleUploadSuccess}
            label="Фото мастера"
            description="Портретное фото массажиста для секции 'О мастере'"
            aspectRatio="aspect-square"
            maxWidth="max-w-xs"
          />
        </Card>
      </div>

      {/* Инструкции */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-medium text-blue-900 mb-3">💡 Рекомендации по изображениям:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Фоновые изображения:</h4>
            <ul className="space-y-1">
              <li>• Минимальный размер: 1920x1080px</li>
              <li>• Формат: JPG, PNG, WebP</li>
              <li>• Максимальный размер: 5MB</li>
              <li>• Высокое качество для четкости</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Диплом и фото мастера:</h4>
            <ul className="space-y-1">
              <li>• Диплом: соотношение 4:3</li>
              <li>• Фото мастера: квадратное 400x400px+</li>
              <li>• Хорошее освещение</li>
              <li>• Четкость и читаемость</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Компонент для управления специальными предложениями
function OffersSettings({ config, updateConfig }: { config: AdminConfig; updateConfig: (path: string, value: any) => void }) {
  const addPackage = () => {
    const newPackage = {
      id: `package-${Date.now()}`,
      enabled: true,
      title: "Новый пакет",
      description: "Описание пакета",
      sessions: 3,
      serviceId: config.services[0]?.id || "classical",
      originalPrice: 10000,
      discountPrice: 8000,
      discount: 20,
      savings: 2000
    };
    
    updateConfig('specialOffers.packages', [...config.specialOffers.packages, newPackage]);
  };

  const removePackage = (index: number) => {
    const newPackages = config.specialOffers.packages.filter((_, i) => i !== index);
    updateConfig('specialOffers.packages', newPackages);
  };

  const updatePackage = (index: number, field: string, value: any) => {
    const newPackages = [...config.specialOffers.packages];
    const keys = field.split('.');
    let current: any = newPackages[index];
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    
    // Автоматически пересчитываем скидку и экономию
    if (field === 'originalPrice' || field === 'discountPrice') {
      const pkg = newPackages[index];
      if (pkg.originalPrice > 0 && pkg.discountPrice > 0) {
        pkg.savings = pkg.originalPrice - pkg.discountPrice;
        pkg.discount = Math.round((pkg.savings / pkg.originalPrice) * 100);
      }
    }
    
    updateConfig('specialOffers.packages', newPackages);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🎁 Специальные предложения</h2>
        <p className="text-gray-600 mb-6">
          Управление специальными предложениями и пакетными скидками
        </p>
      </div>

      {/* Общие настройки */}
      <Card className="p-6">
        <h3 className="font-medium text-gray-900 mb-4">Общие настройки</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="offers-enabled"
              checked={config.specialOffers.enabled}
              onChange={(e) => updateConfig('specialOffers.enabled', e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="offers-enabled" className="ml-2 text-sm text-gray-700">
              Показывать блок специальных предложений на сайте
            </label>
          </div>
          
          {!config.specialOffers.enabled && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Блок специальных предложений скрыт на сайте
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Бесплатная консультация */}
      <Card className="p-6">
        <h3 className="font-medium text-gray-900 mb-4">🆓 Бесплатная консультация</h3>
        
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="consultation-enabled"
              checked={config.specialOffers.consultation.enabled}
              onChange={(e) => updateConfig('specialOffers.consultation.enabled', e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="consultation-enabled" className="ml-2 text-sm text-gray-700">
              Показывать бесплатную консультацию
            </label>
          </div>

          {config.specialOffers.consultation.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок
                </label>
                <input
                  type="text"
                  value={config.specialOffers.consultation.title}
                  onChange={(e) => updateConfig('specialOffers.consultation.title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Длительность (минуты)
                </label>
                <input
                  type="number"
                  value={config.specialOffers.consultation.duration}
                  onChange={(e) => updateConfig('specialOffers.consultation.duration', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={config.specialOffers.consultation.description}
                  onChange={(e) => updateConfig('specialOffers.consultation.description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Пакетные предложения */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">📦 Пакетные предложения</h3>
          <Button
            onClick={addPackage}
            variant="outline"
            size="sm"
            className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
          >
            ➕ Добавить пакет
          </Button>
        </div>

        <div className="space-y-6">
          {config.specialOffers.packages.map((pkg, index) => (
            <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pkg.enabled}
                    onChange={(e) => updatePackage(index, 'enabled', e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Показывать пакет
                  </span>
                </div>
                <Button
                  onClick={() => removePackage(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  🗑️ Удалить
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название пакета
                  </label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) => updatePackage(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество сеансов
                  </label>
                  <input
                    type="number"
                    value={pkg.sessions}
                    onChange={(e) => updatePackage(index, 'sessions', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Услуга
                  </label>
                  <select
                    value={pkg.serviceId}
                    onChange={(e) => updatePackage(index, 'serviceId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {config.services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Обычная цена (₽)
                  </label>
                  <input
                    type="number"
                    value={pkg.originalPrice}
                    onChange={(e) => updatePackage(index, 'originalPrice', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена со скидкой (₽)
                  </label>
                  <input
                    type="number"
                    value={pkg.discountPrice}
                    onChange={(e) => updatePackage(index, 'discountPrice', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Скидка / Экономия
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600">
                    {pkg.discount}% / {pkg.savings.toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание пакета
                  </label>
                  <textarea
                    value={pkg.description}
                    onChange={(e) => updatePackage(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {!pkg.enabled && (
                <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
                  ⚠️ Этот пакет скрыт на сайте
                </div>
              )}
            </div>
          ))}

          {config.specialOffers.packages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Пакетные предложения не добавлены</p>
              <p className="text-sm">Нажмите "Добавить пакет" чтобы создать первое предложение</p>
            </div>
          )}
        </div>
      </Card>

      {/* Предварительный просмотр */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-medium text-blue-900 mb-3">👁️ Предварительный просмотр:</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Общий блок: {config.specialOffers.enabled ? '✅ Показывается' : '❌ Скрыт'}</p>
          <p>• Бесплатная консультация: {config.specialOffers.consultation.enabled ? '✅ Показывается' : '❌ Скрыта'}</p>
          <p>• Активных пакетов: {config.specialOffers.packages.filter(p => p.enabled).length} из {config.specialOffers.packages.length}</p>
          {!config.specialOffers.enabled && (
            <p className="text-yellow-700 font-medium">⚠️ Весь блок специальных предложений скрыт на сайте</p>
          )}
        </div>
      </Card>
    </div>
  );
}