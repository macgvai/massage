import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { name, phone, comment, service } = body;

    const message = `
        📝 *Новая запись*
        ━━━━━━━━━━━━━━
        💆 Услуга: *${service}*
        👤 Имя: *${name}*
        📞 Телефон: *${phone}*
        💬 Комментарий: ${comment || "-"}
    `;

    console.log('Отправка сообщения:', message);

    // Отладочная информация о переменных окружения
    console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'установлен' : 'НЕ УСТАНОВЛЕН');
    console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID);
    console.log('TELEGRAM_CHAT_IDS_EXTRA:', process.env.TELEGRAM_CHAT_IDS_EXTRA);
    console.log('TELEGRAM_ALL_CHATS:', process.env.TELEGRAM_ALL_CHATS);

    // Собираем все Chat ID
    let chatIds = [];
    
    // Способ 1: Основной чат + дополнительные
    if (process.env.TELEGRAM_CHAT_ID) {
        chatIds.push(process.env.TELEGRAM_CHAT_ID);
    }
    
    // Добавляем дополнительные чаты из TELEGRAM_CHAT_IDS_EXTRA
    if (process.env.TELEGRAM_CHAT_IDS_EXTRA) {
        const extraChats = process.env.TELEGRAM_CHAT_IDS_EXTRA
            .split(',')
            .map(id => id.trim())
            .filter(Boolean);
        chatIds.push(...extraChats);
    }
    
    // Способ 2: Все чаты в одной переменной (альтернативный)
    if (process.env.TELEGRAM_ALL_CHATS) {
        chatIds = process.env.TELEGRAM_ALL_CHATS
            .split(',')
            .map(id => id.trim())
            .filter(Boolean);
    }
    
    // Убираем дубликаты
    chatIds = [...new Set(chatIds)];

    console.log('Отправка в чаты:', chatIds);
    
    // Проверяем наличие получателей
    if (chatIds.length === 0) {
        console.error('ОШИБКА: Нет получателей для отправки сообщения!');
        console.error('Проверьте переменные окружения TELEGRAM_CHAT_ID или TELEGRAM_ALL_CHATS');
        return NextResponse.json({ 
            success: false, 
            error: 'Нет получателей для отправки сообщения' 
        }, { status: 400 });
    }

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Отправляем сообщение в каждый чат
    const sendPromises = chatIds.map(chatId => 
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }),
        }).catch(error => {
            console.error(`Ошибка отправки в чат ${chatId}:`, error);
            return null; // Не прерываем выполнение при ошибке в одном чате
        })
    );

    // Ждем отправки во все чаты
    await Promise.all(sendPromises);

    return NextResponse.json({ success: true });
}
