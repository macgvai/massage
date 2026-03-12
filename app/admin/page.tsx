'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { AdminConfig } from '@/types';
import { GeneralTab, AboutTab, ServicesTab, OffersTab, ImagesTab } from '@/components/admin/tabs';

type Tab = 'general' | 'about' | 'services' | 'offers' | 'images';

export default function AdminPage() {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('general');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/config');
        const json = await res.json();
        if (json.success && json.config) {
          setConfig(json.config);
        } else {
          setSaveMessage('Ошибка загрузки конфигурации');
        }
      } catch (e) {
        console.error('Ошибка загрузки конфигурации', e);
        setSaveMessage('Ошибка загрузки конфигурации');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const updateConfig = (updates: Partial<AdminConfig>) => {
    setConfig((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });
      const json = await res.json();
      setSaveMessage(json.success ? '✅ Сохранено' : `❌ Ошибка: ${json.message}`);
    } catch (e) {
      console.error('Ошибка сохранения', e);
      setSaveMessage('❌ Ошибка при сохранении');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Не удалось загрузить конфигурацию</p>
          <Button onClick={() => window.location.reload()}>Обновить страницу</Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'general' as Tab, label: '🏠 Общее', icon: '🏠' },
    { id: 'about' as Tab, label: '👤 О мастере', icon: '👤' },
    { id: 'services' as Tab, label: '💆 Услуги', icon: '💆' },
    { id: 'offers' as Tab, label: '🎁 Спецпредложения', icon: '🎁' },
    { id: 'images' as Tab, label: '🖼️ Изображения', icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <Container className="py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-gray-600 text-sm">Управление контентом сайта</p>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className="text-sm font-medium px-3 py-1 rounded-lg bg-gray-100">
                  {saveMessage}
                </span>
              )}
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isSaving ? '⏳ Сохранение...' : '💾 Сохранить'}
              </Button>
            </div>
          </div>

          {/* Вкладки */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Контент */}
      <Container className="py-8">
        {activeTab === 'general' && <GeneralTab config={config} updateConfig={updateConfig} />}
        {activeTab === 'about' && <AboutTab config={config} updateConfig={updateConfig} />}
        {activeTab === 'services' && <ServicesTab config={config} updateConfig={updateConfig} />}
        {activeTab === 'offers' && <OffersTab config={config} updateConfig={updateConfig} />}
        {activeTab === 'images' && <ImagesTab />}
      </Container>
    </div>
  );
}
