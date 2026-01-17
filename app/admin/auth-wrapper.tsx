'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Проверяем наличие cookie при загрузке
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-auth='));
    
    if (authCookie && authCookie.split('=')[1] === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        // Устанавливаем cookie авторизации
        document.cookie = 'admin-auth=authenticated; path=/; max-age=86400'; // 24 часа
        
        // Очищаем временный cookie доступа
        document.cookie = 'admin-access-granted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        setIsAuthenticated(true);
      } else {
        setError('Неверный пароль');
      }
    } catch (error) {
      setError('Ошибка при входе');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    // Очищаем все cookies
    document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin-access-granted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    setIsAuthenticated(false);
    setPassword('');
    
    // Перенаправляем на главную страницу
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-emerald-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container className="max-w-md">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                🔐 Вход в админку
              </h1>
              <p className="text-gray-600">
                Введите пароль для доступа к панели управления
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Введите пароль"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">❌ {error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? '🔄 Проверка...' : '🚀 Войти'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <a 
                  href="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Вернуться на сайт
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  // Если авторизован, показываем контент с кнопкой выхода
  return (
    <div>
      {/* Добавляем кнопку выхода в верхний правый угол */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="text-red-600 border-red-300 hover:bg-red-50 bg-white shadow-lg"
        >
          🚪 Выйти
        </Button>
      </div>
      {children}
    </div>
  );
}