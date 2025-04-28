const db = require("../db");

export class Loop {

    constructor() { }

    async createLoop(param:any) {
        let query: string = "INSERT INTO loops (loop_title, frequency, start_date, visibility, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
        let values: any[] = [param.loop_title, param.frequency, param.start_date, param.visibility, param.user_id];
        return await db.query(query, values);
    }

    async getUserLoops(param:any) {
        let query: string = "SELECT l.*, CASE WHEN lp.loop_progress_id IS NULL THEN FALSE ELSE TRUE END AS completed FROM loops l LEFT JOIN loop_progress lp ON lp.loop_id = l.loop_id AND lp.progress_date = CURRENT_DATE WHERE created_by = $1";
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

    async getPersonalFeed(param: any) {
        let query: string = "SELECT l.*, COALESCE(l.updated_at, l.created_at) last_updated_at, u.full_name AS created_by_name FROM loops l LEFT JOIN users u ON u.user_id = l.created_by WHERE l.created_by IN (SELECT invited_friend_id FROM friends WHERE invitee_friend_id = $1 AND visibility = 'friends') OR l.visibility = 'public' ORDER BY last_updated_at DESC;";
        let values: any[] = [param.user_id];
        return await db.query(query, values);
    } 
}