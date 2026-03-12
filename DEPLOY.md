# 🚀 Инструкция по деплою

## Подготовка сервера

### 1. Требования
- Ubuntu 20.04+ / Debian 11+
- Docker 20.10+
- Docker Compose 2.0+
- Домен с настроенными DNS записями

### 2. Установка Docker

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo apt install docker-compose-plugin -y

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker
```

## Деплой приложения

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-repo/massage.git
cd massage
```

### 2. Настройка переменных окружения

```bash
# Копируем пример
cp .env.example .env.docker

# Редактируем файл
nano .env.docker
```

Заполните:
```env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
ADMIN_PASSWORD=надежный_пароль
NEXT_PUBLIC_ADMIN_KEY=секретный_ключ
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
```

### 3. SSL сертификаты (Let's Encrypt)

```bash
# Создаем директорию для сертификатов
mkdir -p ssl

# Устанавливаем certbot
sudo apt install certbot -y

# Получаем сертификат
sudo certbot certonly --standalone -d ваш-домен.ru -d www.ваш-домен.ru

# Копируем сертификаты
sudo cp /etc/letsencrypt/live/ваш-домен.ru/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/ваш-домен.ru/privkey.pem ssl/
sudo chmod 644 ssl/*.pem
```

### 4. Запуск приложения

```bash
# Сборка и запуск
docker-compose up -d --build

# Проверка логов
docker-compose logs -f app

# Проверка статуса
docker-compose ps
```

### 5. Проверка работы

```bash
# Проверка health check
curl http://localhost:3082/api/health

# Проверка через nginx
curl https://ваш-домен.ru
```

## Обновление приложения

```bash
# Остановка контейнеров
docker-compose down

# Обновление кода
git pull origin main

# Пересборка и запуск
docker-compose up -d --build

# Проверка логов
docker-compose logs -f app
```

## Бэкапы

### База данных

```bash
# Создание бэкапа
docker exec massage-app cp /app/db/db.sqlite /app/db/db.sqlite.backup

# Копирование на хост
docker cp massage-app:/app/db/db.sqlite.backup ./backups/db-$(date +%Y%m%d).sqlite

# Автоматический бэкап (cron)
# Добавьте в crontab:
0 3 * * * docker exec massage-app cp /app/db/db.sqlite /app/db/db.sqlite.backup
```

### Изображения

```bash
# Бэкап изображений
tar -czf images-backup-$(date +%Y%m%d).tar.gz public/images/
```

## Мониторинг

### Логи

```bash
# Логи приложения
docker-compose logs -f app

# Логи nginx
docker-compose logs -f nginx

# Последние 100 строк
docker-compose logs --tail=100 app
```

### Ресурсы

```bash
# Использование ресурсов
docker stats

# Размер контейнеров
docker system df
```

## Troubleshooting

### Приложение не запускается

```bash
# Проверка логов
docker-compose logs app

# Перезапуск
docker-compose restart app

# Полная пересборка
docker-compose down
docker-compose up -d --build --force-recreate
```

### Проблемы с БД

```bash
# Вход в контейнер
docker exec -it massage-app sh

# Проверка БД
ls -la /app/db/

# Пересоздание БД
npm run db:seed
```

### Проблемы с SSL

```bash
# Проверка сертификатов
sudo certbot certificates

# Обновление сертификатов
sudo certbot renew

# Копирование обновленных сертификатов
sudo cp /etc/letsencrypt/live/ваш-домен.ru/*.pem ssl/
docker-compose restart nginx
```

## SEO настройки после деплоя

### 1. Google Search Console

1. Перейдите на https://search.google.com/search-console
2. Добавьте свой сайт
3. Подтвердите владение через HTML-тег (код в `.env.docker`)
4. Отправьте sitemap: `https://ваш-домен.ru/sitemap.xml`

### 2. Яндекс Вебмастер

1. Перейдите на https://webmaster.yandex.ru
2. Добавьте сайт
3. Подтвердите владение через мета-тег
4. Отправьте sitemap

### 3. Проверка индексации

```bash
# Проверка robots.txt
curl https://ваш-домен.ru/robots.txt

# Проверка sitemap
curl https://ваш-домен.ru/sitemap.xml

# Проверка структурированных данных
# Используйте: https://search.google.com/test/rich-results
```

## Оптимизация производительности

### 1. Кэширование

Nginx уже настроен на кэширование статики. Проверьте:

```bash
# Проверка заголовков кэширования
curl -I https://ваш-домен.ru/_next/static/...
```

### 2. Мониторинг скорости

- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

### 3. CDN (опционально)

Для ускорения можно использовать Cloudflare:
1. Зарегистрируйтесь на cloudflare.com
2. Добавьте домен
3. Измените NS записи у регистратора
4. Включите кэширование и минификацию

## Безопасность

### 1. Firewall

```bash
# Установка UFW
sudo apt install ufw -y

# Разрешаем нужные порты
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Включаем firewall
sudo ufw enable
```

### 2. Автообновление сертификатов

```bash
# Добавьте в crontab
sudo crontab -e

# Добавьте строку:
0 0 1 * * certbot renew --quiet && cp /etc/letsencrypt/live/ваш-домен.ru/*.pem /path/to/massage/ssl/ && docker-compose -f /path/to/massage/docker-compose.yml restart nginx
```

### 3. Регулярные обновления

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Обновление Docker образов
docker-compose pull
docker-compose up -d
```

## Полезные команды

```bash
# Остановка всех контейнеров
docker-compose down

# Запуск в фоне
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Перезапуск сервиса
docker-compose restart app

# Очистка неиспользуемых образов
docker system prune -a

# Вход в контейнер
docker exec -it massage-app sh
```

## Контакты для поддержки

При возникновении проблем:
1. Проверьте логи: `docker-compose logs`
2. Проверьте документацию: README.md
3. Создайте issue в репозитории
