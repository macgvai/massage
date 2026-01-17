import { NextRequest, NextResponse } from 'next/server';

// Пароль для доступа к админке
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    console.log('Введенный пароль:', password);
    console.log('Ожидаемый пароль:', ADMIN_PASSWORD);

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        message: 'Авторизация успешна' 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Неверный пароль' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// API для выхода
export async function DELETE() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Выход выполнен' 
  });
  
  // Удаляем cookie
  response.cookies.set('admin-auth', '', {
    expires: new Date(0),
    path: '/'
  });
  
  return response;
}