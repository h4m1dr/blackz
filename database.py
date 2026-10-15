import aiosqlite

DB_NAME = "store.db"

async def init_db():
    """Initialize local SQLite database"""
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT NOT NULL,
                name TEXT NOT NULL,
                priority INTEGER DEFAULT 1,
                is_default INTEGER DEFAULT 0
            )
        """)
        await db.commit()
