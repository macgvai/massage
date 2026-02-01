import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve('./db/db.sqlite');

let db = null;

async function initDb() {
    if (db) return db; // Reuse existing connection

    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON');

        console.log('Database connected and initialized.');
    } catch (error) {
        console.error('Error initializing the database:', error);
        throw error; // Propagate error to prevent silent failures
    }

    return db;
}

export default initDb;