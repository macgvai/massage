import Card from '@/components/ui/Card';
import { AdminConfig } from '@/types';

interface Props {
  config: AdminConfig;
  updateConfig: (updates: Partial<AdminConfig>) => void;
}

export default function AboutTab({ config, updateConfig }: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Информация о мастере</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput
            label="Имя"
            value={config.about.name}
            onChange={(v) => updateConfig({ about: { ...config.about, name: v } })}
            placeholder="Андрей Васкес"
          />
          <LabeledInput
            label="Должность"
            value={config.about.title}
            onChange={(v) => updateConfig({ about: { ...config.about, title: v } })}
            placeholder="Сертифицированный массажист"
          />
        </div>
        <LabeledInput
          label="Опыт работы"
          value={config.about.experience}
          onChange={(v) => updateConfig({ about: { ...config.about, experience: v } })}
          placeholder="7+ лет опыта"
        />
        <LabeledTextArea
          label="Описание"
          value={config.about.description}
          onChange={(v) => updateConfig({ about: { ...config.about, description: v } })}
          rows={4}
        />
        <LabeledInput
          label="Девиз"
          value={config.about.motto}
          onChange={(v) => updateConfig({ about: { ...config.about, motto: v } })}
          placeholder="Ваше здоровье и комфорт — моя главная цель"
        />
        <LabeledTextArea
          label="Достижения (по одному в строке)"
          value={config.about.achievements.join('\n')}
          onChange={(v) => updateConfig({ 
            about: { ...config.about, achievements: v.split('\n').filter((s) => s.trim()) }
          })}
          rows={5}
        />
      </div>
    </Card>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
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
