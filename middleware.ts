import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем только пути админки
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Проверяем cookie авторизации (уже вошел в админку)
    const adminAuth = request.cookies.get('admin-auth');
    const isAuthenticated = adminAuth && adminAuth.value === 'authenticated';
    
    // Проверяем временный cookie доступа (нажал на секретную кнопку)
    const accessGranted = request.cookies.get('admin-access-granted');
    const hasTemporaryAccess = accessGranted && accessGranted.value === 'true';
    
    // Разрешаем доступ только если:
    // 1. Пользователь уже авторизован ИЛИ
    // 2. Есть временный доступ от секретной кнопки
    if (!isAuthenticated && !hasTemporaryAccess) {
      // Перенаправляем на главную страницу (выглядит как 404)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};