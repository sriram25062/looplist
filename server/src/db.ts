import { Pool } from "pg";
const config = require("./config/db.config");

const pool = new Pool({
    user: config.dbConfig.user,
    host: config.dbConfig.host,
    database: config.dbConfig.database,
    password: config.dbConfig.password,
    port: config.dbConfig.port,
});

pool.on("error", (err) => {
    console.error("❌ PostgreSQL Connection Error:", err);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export const connectDB = () => pool.query("SELECT NOW()", []);

export default pool;
