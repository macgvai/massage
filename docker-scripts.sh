#!/bin/bash

# Скрипты для управления Docker контейнером

case "$1" in
    "build")
        echo "🔨 Сборка Docker образа..."
        docker build -t massage-app .
        ;;
    
    "run")
        echo "🚀 Запуск контейнера..."
        docker run -d \
            --name massage-app \
            -p 3000:3000 \
            --env-file .env.production \
            -v $(pwd)/public/images:/app/public/images \
            -v $(pwd)/config:/app/config \
            massage-app
        ;;
    
    "start")
        echo "▶️ Запуск через docker-compose..."
        docker-compose --env-file .env.production up -d
        ;;
    
    "stop")
        echo "⏹️ Остановка контейнеров..."
        docker-compose down
        ;;
    
    "restart")
        echo "🔄 Перезапуск..."
        docker-compose down
        docker-compose --env-file .env.production up -d
        ;;
    
    "logs")
        echo "📋 Логи контейнера..."
        docker-compose logs -f massage-app
        ;;
    
    "shell")
        echo "🐚 Подключение к контейнеру..."
        docker exec -it massage-app sh
        ;;
    
    "clean")
        echo "🧹 Очистка..."
        docker-compose down
        docker rmi massage-app 2>/dev/null || true
        docker system prune -f
        ;;
    
    "status")
        echo "📊 Статус контейнеров..."
        docker-compose ps
        ;;
    
    *)
        echo "🐳 Управление Docker контейнером массажного салона"
        echo ""
        echo "Использование: $0 {команда}"
        echo ""
        echo "Команды:"
        echo "  build    - Собрать Docker образ"
        echo "  run      - Запустить контейнер"
        echo "  start    - Запустить через docker-compose"
        echo "  stop     - Остановить контейнеры"
        echo "  restart  - Перезапустить"
        echo "  logs     - Показать логи"
        echo "  shell    - Подключиться к контейнеру"
        echo "  clean    - Очистить все"
        echo "  status   - Показать статус"
        echo ""
        echo "Примеры:"
        echo "  $0 build"
        echo "  $0 start"
        echo "  $0 logs"
        ;;
esac