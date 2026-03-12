@echo off
echo ========================================
echo   Запуск проекта в Docker
echo ========================================
echo.

REM Проверка Docker Desktop
echo [1/4] Проверка Docker Desktop...
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Docker не найден!
    echo Установите Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo [OK] Docker установлен
echo.

REM Проверка запущен ли Docker
echo [2/4] Проверка статуса Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Docker Desktop не запущен!
    echo Запустите Docker Desktop и повторите попытку
    pause
    exit /b 1
)
echo [OK] Docker запущен
echo.

REM Остановка старых контейнеров
echo [3/4] Остановка старых контейнеров...
docker-compose -f docker-compose.simple.yml down >nul 2>&1
echo [OK] Старые контейнеры остановлены
echo.

REM Сборка и запуск
echo [4/4] Сборка и запуск приложения...
echo Это может занять несколько минут при первом запуске...
echo.
docker-compose -f docker-compose.simple.yml up -d --build

if errorlevel 1 (
    echo.
    echo [ОШИБКА] Не удалось запустить приложение
    echo Проверьте логи: docker-compose logs
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Приложение успешно запущено!
echo ========================================
echo.
echo Приложение доступно на:
echo   http://localhost:3082
echo.
echo Админка:
echo   http://localhost:3082/?admin=massage-secret-2024
echo   Пароль: admin123
echo.
echo Просмотр логов:
echo   docker-compose -f docker-compose.simple.yml logs -f
echo.
echo Остановка:
echo   docker-compose -f docker-compose.simple.yml down
echo.
echo ========================================

REM Открыть браузер
timeout /t 3 >nul
start http://localhost:3082

pause
