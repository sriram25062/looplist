import { Request, Response } from "express";
import { Common } from '../models/common.model';

const qryClass = new Common();

export const connectDB = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.connectDB();
        if(result.rowCount > 0) {
            response.status(200).json({ success: true, created: true, result: result.rows, message: "DB Connected Successfully" })
        } else {
            response.status(500).json({ success: true, created: false, message: "DB Connection Failure" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, message: "DB Connection Failure due to - " + new Error(error).message});
    }
}