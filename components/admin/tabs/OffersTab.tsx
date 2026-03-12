import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AdminConfig, SpecialOfferPackage } from '@/types';

interface Props {
  config: AdminConfig;
  updateConfig: (updates: Partial<AdminConfig>) => void;
}

export default function OffersTab({ config, updateConfig }: Props) {
  const addPackage = () => {
    const newPackage: SpecialOfferPackage = {
      id: `package-${Date.now()}`,
      enabled: true,
      title: 'Новый пакет',
      description: 'Описание пакета',
      sessions: 1,
      serviceId: config.services[0]?.id || '',
      originalPrice: 0,
      discountPrice: 0,
      discount: 0,
      savings: 0,
    };
    updateConfig({
      specialOffers: {
        ...config.specialOffers,
        packages: [...config.specialOffers.packages, newPackage],
      },
    });
  };

  const updatePackage = (index: number, updates: Partial<SpecialOfferPackage>) => {
    const packages = [...config.specialOffers.packages];
    packages[index] = { ...packages[index], ...updates };
    updateConfig({
      specialOffers: { ...config.specialOffers, packages },
    });
  };

  const removePackage = (index: number) => {
    if (confirm('Удалить этот пакет?')) {
      const packages = [...config.specialOffers.packages];
      packages.splice(index, 1);
      updateConfig({
        specialOffers: { ...config.specialOffers, packages },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Общие настройки */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Общие настройки</h2>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.specialOffers.enabled}
            onChange={(e) =>
              updateConfig({
                specialOffers: { ...config.specialOffers, enabled: e.target.checked },
              })
            }
            className="h-5 w-5 text-emerald-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Показывать блок спецпредложений на сайте
          </span>
        </label>
      </Card>

      {/* Бесплатная консультация */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Бесплатная консультация</h2>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.specialOffers.consultation.enabled}
              onChange={(e) =>
                updateConfig({
                  specialOffers: {
                    ...config.specialOffers,
                    consultation: {
                      ...config.specialOffers.consultation,
                      enabled: e.target.checked,
                    },
                  },
                })
              }
              className="h-5 w-5 text-emerald-600 rounded"
            />
            <span className="text-sm text-gray-700">Показывать</span>
          </label>
        </div>
        <div className="space-y-4">
          <LabeledInput
            label="Заголовок"
            value={config.specialOffers.consultation.title}
            onChange={(v) =>
              updateConfig({
                specialOffers: {
                  ...config.specialOffers,
                  consultation: { ...config.specialOffers.consultation, title: v },
                },
              })
            }
          />
          <LabeledTextArea
            label="Описание"
            value={config.specialOffers.consultation.description}
            onChange={(v) =>
              updateConfig({
                specialOffers: {
                  ...config.specialOffers,
                  consultation: { ...config.specialOffers.consultation, description: v },
                },
              })
            }
          />
          <LabeledInput
            label="Длительность (мин)"
            type="number"
            value={config.specialOffers.consultation.duration}
            onChange={(v) =>
              updateConfig({
                specialOffers: {
                  ...config.specialOffers,
                  consultation: {
                    ...config.specialOffers.consultation,
                    duration: parseInt(v) || 0,
                  },
                },
              })
            }
          />
        </div>
      </Card>

      {/* Пакеты */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Пакеты услуг</h2>
            <p className="text-sm text-gray-600">Всего пакетов: {config.specialOffers.packages.length}</p>
          </div>
          <Button onClick={addPackage} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            ➕ Добавить пакет
          </Button>
        </div>

        {config.specialOffers.packages.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500 mb-4">Пакеты не добавлены</p>
            <Button onClick={addPackage} variant="outline">Добавить первый пакет</Button>
          </Card>
        )}

        <div className="space-y-3">
          {config.specialOffers.packages.map((pkg, idx) => (
            <Card key={pkg.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pkg.enabled}
                    onChange={(e) => updatePackage(idx, { enabled: e.target.checked })}
                    className="h-5 w-5 text-emerald-600 rounded"
                  />
                  <span className="font-medium text-gray-900">{pkg.title}</span>
                </label>
                <button
                  onClick={() => removePackage(idx)}
                  className="text-red-600 hover:text-red-700 text-sm px-3 py-1 rounded hover:bg-red-50"
                >
                  🗑️ Удалить
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <LabeledInput
                    label="Название"
                    value={pkg.title}
                    onChange={(v) => updatePackage(idx, { title: v })}
                  />
                  <LabeledInput
                    label="Количество сеансов"
                    type="number"
                    value={pkg.sessions}
                    onChange={(v) => updatePackage(idx, { sessions: parseInt(v) || 0 })}
                  />
                  <LabeledInput
                    label="Цена без скидки (₽)"
                    type="number"
                    value={pkg.originalPrice}
                    onChange={(v) => updatePackage(idx, { originalPrice: parseInt(v) || 0 })}
                  />
                  <LabeledInput
                    label="Цена со скидкой (₽)"
                    type="number"
                    value={pkg.discountPrice}
                    onChange={(v) => updatePackage(idx, { discountPrice: parseInt(v) || 0 })}
                  />
                  <LabeledInput
                    label="Скидка (%)"
                    type="number"
                    value={pkg.discount}
                    onChange={(v) => updatePackage(idx, { discount: parseInt(v) || 0 })}
                  />
                  <LabeledInput
                    label="Экономия (₽)"
                    type="number"
                    value={pkg.savings}
                    onChange={(v) => updatePackage(idx, { savings: parseInt(v) || 0 })}
                  />
                </div>
                <LabeledTextArea
                  label="Описание"
                  value={pkg.description}
                  onChange={(v) => updatePackage(idx, { description: v })}
                />
              </div>
            </Card>
          ))}
        </div>
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
  rows = 2,
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
