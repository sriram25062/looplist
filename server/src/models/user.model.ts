const db = require("../db");

export class User {

    constructor() { }

    async createUser(param:any) {
        let query: string = "INSERT INTO users (full_name, email, hash_password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING";
        let values: any[] = [param.name.trim(), param.email.trim().toLowerCase(), param.hash_password];
        return await db.query(query, values);
    }

    async loginUser(param:any) {
        let query: string = "SELECT user_id, full_name, email, hash_password FROM users WHERE LOWER(email) = $1";
        let values: any[] = [param.email.trim().toLowerCase()];
        return await db.query(query, values);
    }
}