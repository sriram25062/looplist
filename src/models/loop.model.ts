const db = require("../db");

export class Loop {

    constructor() { }

    async createLoop(param:any) {
        let query: string = "INSERT INTO loops (loop_title, frequency, start_date, visibility, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
        let values: any[] = [param.loop_title, param.frequency, param.start_date, param.visibility, param.user_id];
        return await db.query(query, values);
    }

    async getUserLoops(param:any) {
        let query: string = "SELECT * FROM loops WHERE created_by = $1";
        let values: any[] = [param.user_id];
        return await db.query(query, values);
    }

    async checkIn(param:any) {
        let query: string = "INSERT INTO loop_progress (loop_id, progress_date) VALUES ($1, $2) ON CONFLICT (loop_id, progress_date) DO NOTHING RETURNING *;";
        let values: any[] = [param.loop_id, param.progress_date];
        return await db.query(query, values);
    }

    async getPublicLoops() {
        let query: string = "SELECT * FROM loops WHERE visibility = 'public'";
        let values: any[] = [];
        return await db.query(query, values);
    }

    async cloneLoop(param:any) {
        let query: string = "INSERT INTO loops (cloned_loop_id, loop_title, frequency, start_date, visibility, created_by) SELECT $1, loop_title, frequency, NOW(), visibility, $2 FROM loops WHERE loop_id = $1;";
        let values: any[] = [param.loop_id, param.user_id];
        return await db.query(query, values);
    }
}