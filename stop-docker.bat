@echo off
echo ========================================
echo   Остановка Docker контейнеров
echo ========================================
echo.

docker-compose -f docker-compose.simple.yml down

echo.
echo [OK] Контейнеры остановлены
echo.
pause
