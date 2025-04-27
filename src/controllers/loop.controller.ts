import { Request, Response } from "express";
import { Loop } from '../models/loop.model';
const bcrypt = require('bcrypt');
const config = require('../config/env.config')

const qryClass = new Loop();

export const createLoop = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.createLoop(request.body);
        if(result.rowCount > 0) {
            response.status(201).json({ success: true, created: true, result: result.rows, message: "Loop Created Successfully" })
        } else {
            response.status(500).json({ success: false, created: false, message: "Failed to create Loop" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to create Loop due to - " + new Error(error).message});
    }
}

export const getUserLoops = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.getUserLoops(request.body);
        if(result.rowCount > 0) {
            response.status(200).json({ success: true, created: true, result: result.rows, message: "Loop(s) Fetched Successfully" })
        } else {
            response.status(500).json({ success: false, created: false, message: "Failed to fetch Loop(s)" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to fetch Loop(s) due to - " + new Error(error).message});
    }
}

export const checkIn = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.checkIn(request.body);
        if(result.rowCount > 0) {
            response.status(200).json({ success: true, created: true, result: result.rows, message: "Checked In Successfully" })
        } else {
            response.status(500).json({ success: false, created: false, message: "Already Checked In Today" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to check-in Loop(s) due to - " + new Error(error).message});
    }
}

export const getPublicLoops = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.getPublicLoops();
        if(result.rowCount > 0) {
            response.status(200).json({ success: true, created: true, result: result.rows, message: "Public Loop(s) Fetched Successfully" })
        } else {
            response.status(500).json({ success: false, created: false, message: "No Public Loop(s)" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to fetch public Loop(s) due to - " + new Error(error).message});
    }
}

export const cloneLoop = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.cloneLoop(request.body);
        if(result.rowCount > 0) {
            response.status(200).json({ success: true, created: true, result: result.rows, message: "Loop Cloned Successfully" })
        } else {
            response.status(500).json({ success: false, created: false, message: "Failed to Clone Loop" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to Clone Loop due to - " + new Error(error).message});
    }
}