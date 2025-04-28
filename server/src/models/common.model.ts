const db = require("../db");

export class Common {

    constructor() { }

    async connectDB() {
        let query: string = "SELECT NOW();";
        let values: any[] = [];
        return await db.query(query, values);
    }
}