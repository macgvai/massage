'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdminAccessButton() {
  const [showButton, setShowButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Проверяем наличие секретного параметра в URL
    const adminKey = searchParams.get('admin');
    const secretKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'show-admin';
    
    if (adminKey === secretKey) {
      setShowButton(true);
      
      // Обратный отсчет
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowButton(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [searchParams]);

  // Функция для скрытия кнопки вручную
  const hideButton = () => {
    setShowButton(false);
  };

  if (!showButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 max-w-xs">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">
            🔐 Админ-доступ
          </h3>
          <button
            onClick={hideButton}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        </div>
        
        {/* Кнопка входа */}
        <a
          href="/admin"
          onClick={() => {
            // Устанавливаем временный cookie для доступа
            document.cookie = 'admin-access-granted=true; path=/; max-age=300'; // 5 минут
          }}
          className="block w-full text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg mb-3"
        >
          🛠️ Открыть админку
        </a>
        
        {/* Таймер */}
        <div className="text-center">
          <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            ⏱️ Скроется через {timeLeft} сек
          </div>
        </div>
        
        {/* Индикатор прогресса */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-emerald-500 h-1 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}