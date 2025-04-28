import { Request, Response } from "express";
import { User } from '../models/user.model';
const bcrypt = require('bcrypt');
const config = require('../config/env.config')
const jwt = require('jsonwebtoken');

const qryClass = new User();

export const createUser = async (request: Request, response: Response) => {
    try {
        console.log(request.body)
        if(request.body.password){
            request.body['hash_password'] = await bcrypt.hash(request.body.password, config.appConfig.bcrypt_salt);
            console.log(request.body)
            delete request.body.password
        }
        let result: any = await qryClass.createUser(request.body);
        if(result.rowCount > 0) {
            response.status(201).json({ success: true, created: true, result: result.rows, message: "User Created Successfully" })
        } else {
            response.status(409).json({ success: false, created: false, message: "User Already Exists" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false, created: false, message: "Failed to create user due to - " + new Error(error).message});
    }
}

export const loginUser = async (request: Request, response: Response) => {
    try {
        let result: any = await qryClass.loginUser(request.body);
        console.log(result);
        if(result.rowCount > 0) {
            if(await bcrypt.compare(request.body.password, result.rows[0].hash_password)) {
                const token = jwt.sign({ user_id: result.rows[0].user_id, email: result.rows[0].email, full_name: result.rows[0].full_name }, config.appConfig.jwt_secret, { expiresIn: '1h' });
                response.status(201).json({ success: true, login: true, token: token, message: "Logged in Successfully" })
            } else {
                response.status(401).json({ success: false, login: false, message: "wrong email or password" });
            }
        } else {
            response.status(404).json({ success: false, login: false, message: "User doesn't exist" });
        }
    } catch (error:any) {
        response.status(500).json({ succes: false,login: false, message: "Failed to login user due to - " + new Error(error).message});
    }
}