import initDb from "@/db/client";
import {AboutProps} from "@/types";

export async function getAbout(): Promise<AboutProps | null> {
    try {
        const db = await initDb();
        const rows = await db.all("SELECT * FROM about");

        if (rows && rows.length > 0) {
            const data = rows[0];

            // Парсим achievements, если это строка
            if (typeof data.achievements === 'string') {
                try {
                    const parsed = JSON.parse(data.achievements);
                    data.achievements = Array.isArray(parsed)
                        ? parsed.map(item => String(item))
                        : [];
                } catch (e) {
                    console.warn("Failed to parse achievements as JSON", e);
                    data.achievements = [];
                }
            } else {
                // Если achievements не строка — приводим к массиву строк
                data.achievements = [];
            }

            return data as AboutProps;
        }

        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function updateAbout(data: AboutProps): Promise<void> {
    const db = await initDb();
    try {
        const res = await db.run(
            "UPDATE about SET name = ?, title = ?, experience = ?, description = ?, achievements = ?, motto = ?",
            [data.name, data.title, data.experience, data.description, JSON.stringify(data.achievements), data.motto]
        );
        return res;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}