import Card from '@/components/ui/Card';
import { AdminConfig } from '@/types';

interface Props {
  config: AdminConfig;
  updateConfig: (updates: Partial<AdminConfig>) => void;
}

export default function GeneralTab({ config, updateConfig }: Props) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Основная информация</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput
              label="Название сайта"
              value={config.name}
              onChange={(v) => updateConfig({ name: v })}
              placeholder="Массажный салон"
            />
            <LabeledInput
              label="Полное название"
              value={config.fullName}
              onChange={(v) => updateConfig({ fullName: v })}
              placeholder="Массажный салон Андрея Васкеса"
            />
          </div>
          <LabeledTextArea
            label="Описание сайта"
            value={config.description}
            onChange={(v) => updateConfig({ description: v })}
            rows={3}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Контакты</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput
              label="Телефон"
              value={config.contact.phone}
              onChange={(v) => updateConfig({ 
                contact: { ...config.contact, phone: v, phoneFormatted: v.replace(/[^0-9]/g, '') }
              })}
              placeholder="+7 (916) 990-53-65"
            />
            <LabeledInput
              label="Email"
              value={config.contact.email}
              onChange={(v) => updateConfig({ contact: { ...config.contact, email: v } })}
              placeholder="info@massage-salon.ru"
            />
          </div>
          <LabeledInput
            label="Адрес"
            value={config.contact.address}
            onChange={(v) => updateConfig({ 
              contact: { ...config.contact, address: v, addressShort: v }
            })}
            placeholder="г. Симферополь, ул. Беспалова, д. 110м"
          />
          <LabeledInput
            label="Часы работы"
            value={config.contact.workingHours}
            onChange={(v) => updateConfig({ contact: { ...config.contact, workingHours: v } })}
            placeholder="Ежедневно с 9:00 до 21:00"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Социальные сети</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput
            label="Telegram"
            value={config.social.telegram}
            onChange={(v) => updateConfig({ social: { ...config.social, telegram: v } })}
            placeholder="https://t.me/massage_salon"
          />
          <LabeledInput
            label="WhatsApp"
            value={config.social.whatsapp}
            onChange={(v) => updateConfig({ social: { ...config.social, whatsapp: v } })}
            placeholder="https://wa.me/79169905365"
          />
          <LabeledInput
            label="Instagram"
            value={config.social.instagram}
            onChange={(v) => updateConfig({ social: { ...config.social, instagram: v } })}
            placeholder="https://instagram.com/massage_salon"
          />
          <LabeledInput
            label="VK"
            value={config.social.vk}
            onChange={(v) => updateConfig({ social: { ...config.social, vk: v } })}
            placeholder="https://vk.com/massage_salon"
          />
        </div>
      </Card>
    </div>
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
