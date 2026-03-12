# Массажный салон - Landing Page

Лендинг массажного салона на Next.js 16 с админ-панелью и интеграцией с Telegram.

## 🚀 Технологии

- **Next.js 16** (App Router, React 19)
- **TypeScript 5**
- **Tailwind CSS 4** + HeroUI
- **SQLite3** (база данных)
- **Framer Motion** (анимации)
- **Docker** (контейнеризация)

## 📦 Установка

```bash
# Установка зависимостей
npm install

# Инициализация базы данных
npm run db:seed

# Запуск dev-сервера
npm run dev
```

Сайт будет доступен по адресу: http://localhost:3082

## 🗄️ База данных

Все данные хранятся в SQLite БД (`db/db.sqlite`) в одной таблице `key_value`:

- Конфигурация сайта (название, контакты, услуги)
- Информация о мастере
- Специальные предложения
- **Ссылки на изображения**

### Структура данных

```typescript
{
  name: string              // Название салона
  fullName: string          // Полное название
  description: string       // Описание
  contact: {...}            // Контакты (телефон, email, адрес)
  social: {...}             // Соцсети
  about: {...}              // О мастере
  services: [...]           // Услуги с ценами
  specialOffers: {...}      // Спецпредложения
  advantages: [...]         // Преимущества
  images: {                 // Ссылки на изображения
    'about-bg': string
    'advantages-bg': string
    'diploma': string
    'master-photo': string
  }
}
```

### Команды БД

```bash
# Заполнить БД дефолтными данными
npm run db:seed

# Пересоздать БД (удалить старую и создать новую)
rm db/db.sqlite && npm run db:seed
```

## 🖼️ Работа с изображениями

Изображения загружаются через админ-панель и:
1. Сохраняются в `public/images/`
2. **Ссылки автоматически сохраняются в БД**
3. Старые файлы удаляются автоматически

### Типы изображений

- `about-bg` - Фон секции "О мастере" (1920x1080)
- `advantages-bg` - Фон секции "Преимущества" (1920x1080)
- `diploma` - Диплом/сертификат (4:3)
- `master-photo` - Фото мастера (квадрат 800x800)

## 🔐 Админ-панель

### Доступ к админке

1. **Скрытая кнопка**: Добавьте `?admin=massage-secret-2024` к URL
   ```
   http://localhost:3082/?admin=massage-secret-2024
   ```

2. **Прямой доступ**: Перейдите на `/admin`
   ```
   http://localhost:3082/admin
   ```

3. **Пароль**: `admin123` (настраивается в `.env.local`)

### Структура админки

Админка разделена на 5 вкладок для удобства:

#### 🏠 Общее
- Название сайта и описание
- Контактная информация (телефон, email, адрес)
- Социальные сети (Telegram, WhatsApp, Instagram, VK)

#### 👤 О мастере
- Имя и должность
- Опыт работы
- Описание и девиз
- Достижения

#### 💆 Услуги
- Список всех услуг
- Название, описание, цена, длительность
- Преимущества каждой услуги
- Сворачиваемые карточки для удобства

#### 🎁 Спецпредложения
- Бесплатная консультация
- Пакеты услуг со скидками
- Настройка видимости

#### 🖼️ Изображения
- Фон секции "О мастере"
- Фон секции "Преимущества"
- Диплом/сертификат
- Фото мастера
- **Ссылки автоматически сохраняются в БД**

## 📱 Telegram интеграция

При отправке заявки с сайта, уведомление приходит в Telegram.

### Настройка

В `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
TELEGRAM_CHAT_IDS_EXTRA=chat_id_2,chat_id_3
```

## 🐳 Docker

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up -d
```

## 📝 Скрипты

```bash
npm run dev          # Запуск dev-сервера (порт 3082)
npm run build        # Сборка для production
npm run start        # Запуск production сервера
npm run lint         # Проверка кода
npm run db:seed      # Заполнение БД
```

## 🔧 Переменные окружения

Создайте `.env.local`:

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id

# Админка
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_KEY=massage-secret-2024
```

## 📂 Структура проекта

```
├── app/
│   ├── api/              # API routes
│   │   ├── admin/        # Админ API
│   │   └── services/     # Сервисы для работы с БД
│   ├── admin/            # Админ-панель
│   └── page.tsx          # Главная страница
├── components/           # React компоненты
├── db/
│   ├── client.js         # Подключение к БД
│   ├── seed.ts           # Сиды
│   └── db.sqlite         # База данных
├── public/images/        # Загруженные изображения
└── types/                # TypeScript типы
```

## 🎨 Кастомизация

### Изменить цвета

Отредактируйте `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#10b981',  // emerald-500
    }
  }
}
```

### Изменить порт

В `package.json`:

```json
"dev": "next dev -p 3000"
```

## 🚀 Деплой

### Vercel

```bash
vercel deploy
```

### VPS

```bash
npm run build
npm run start
```

## 📄 Лицензия

MIT
