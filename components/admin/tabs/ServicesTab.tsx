import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AdminConfig, ServiceItem } from '@/types';

interface Props {
  config: AdminConfig;
  updateConfig: (updates: Partial<AdminConfig>) => void;
}

export default function ServicesTab({ config, updateConfig }: Props) {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const addService = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      title: 'Новая услуга',
      description: 'Описание услуги',
      duration: 60,
      price: 3000,
      benefits: ['Преимущество 1', 'Преимущество 2'],
    };
    updateConfig({ services: [...config.services, newService] });
    setExpandedService(newService.id);
  };

  const updateService = (index: number, updates: Partial<ServiceItem>) => {
    const services = [...config.services];
    services[index] = { ...services[index], ...updates };
    updateConfig({ services });
  };

  const removeService = (index: number) => {
    if (confirm('Удалить эту услугу?')) {
      const services = [...config.services];
      services.splice(index, 1);
      updateConfig({ services });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Услуги</h2>
          <p className="text-sm text-gray-600">Всего услуг: {config.services.length}</p>
        </div>
        <Button onClick={addService} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          ➕ Добавить услугу
        </Button>
      </div>

      {config.services.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">Пока нет услуг</p>
          <Button onClick={addService} variant="outline">Добавить первую услугу</Button>
        </Card>
      )}

      <div className="space-y-3">
        {config.services.map((service, idx) => {
          const isExpanded = expandedService === service.id;
          
          return (
            <Card key={service.id} className="overflow-hidden">
              {/* Заголовок */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedService(isExpanded ? null : service.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500">
                      {service.price.toLocaleString('ru-RU')} ₽ • {service.duration} мин
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeService(idx);
                    }}
                    className="text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                  >
                    🗑️ Удалить
                  </button>
                  <span className="text-gray-400">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Детали */}
              {isExpanded && (
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <LabeledInput
                      label="Название"
                      value={service.title}
                      onChange={(v) => updateService(idx, { title: v })}
                    />
                    <LabeledInput
                      label="Длительность (мин)"
                      type="number"
                      value={service.duration}
                      onChange={(v) => updateService(idx, { duration: parseInt(v) || 0 })}
                    />
                    <LabeledInput
                      label="Цена (₽)"
                      type="number"
                      value={service.price}
                      onChange={(v) => updateService(idx, { price: parseInt(v) || 0 })}
                    />
                  </div>
                  <LabeledTextArea
                    label="Описание"
                    value={service.description}
                    onChange={(v) => updateService(idx, { description: v })}
                    rows={3}
                  />
                  <LabeledTextArea
                    label="Преимущества (по одному в строке)"
                    value={service.benefits.join('\n')}
                    onChange={(v) => updateService(idx, { 
                      benefits: v.split('\n').filter((s) => s.trim()) 
                    })}
                    rows={4}
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  );
}

function LabeledTextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  );
}
