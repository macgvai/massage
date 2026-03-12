# 🐳 Запуск в Docker

## Шаг 1: Запустите Docker Desktop

1. Откройте Docker Desktop
2. Дождитесь полного запуска (иконка станет зеленой)

## Шаг 2: Выберите вариант запуска

### Вариант A: Простой запуск (только приложение)

```bash
docker-compose -f docker-compose.simple.yml up -d --build
```

Приложение будет доступно на: http://localhost:3082

### Вариант B: Полный запуск (с Nginx)

Требуется файл `.env.docker`:

```bash
# Создайте .env.docker
cp .env.local .env.docker

# Запуск
docker-compose up -d --build
```

Приложение будет доступно на:
- http://localhost:80 (через Nginx)
- http://localhost:3082 (напрямую)

## Шаг 3: Проверка

```bash
# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f app

# Проверка health check
docker-compose ps app
```

## Шаг 4: Доступ к админке

```
http://localhost:3082/?admin=massage-secret-2024
Пароль: admin123
```

## Остановка

```bash
# Остановка
docker-compose down

# Остановка с удалением volumes
docker-compose down -v
```

## Troubleshooting

### Docker Desktop не запущен
```
Error: open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```
**Решение**: Запустите Docker Desktop и дождитесь его полного запуска

### Порт занят
```
Error: port is already allocated
```
**Решение**: Измените порт в docker-compose.yml:
```yaml
ports:
  - "3083:3000"  # Вместо 3082
```

### Ошибка сборки
```bash
# Очистка и пересборка
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Вход в контейнер
docker exec -it massage-app sh

# Проверка БД внутри контейнера
docker exec -it massage-app ls -la /app/db/

# Просмотр использования ресурсов
docker stats massage-app
```
