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

    console.log(message)
    debugger
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
        }),
    });

    return NextResponse.json({ success: true });
}
