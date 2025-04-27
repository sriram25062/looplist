import { NextFunction, Request, Response } from "express";

const conf = require("../config/env.config");
const jwtSecret = conf.appConfig.jwt_secret;

const jwt = require("jsonwebtoken");

const authToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    const token = authHeader&& authHeader.split(' ')[1];

    if(!token) return response.status(401).json({ message: "Missing Authorization Header"});

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
        if(err) return response.status(403).json({ message: "Invalid Token"});
        request.body = Object.assign(request.body || {}, user);
        next(); 
    });
};

module.exports = authToken;