import { NextFunction, Request, Response } from "express"

export const validateParameters = (requiredFields: string[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const missingFields = requiredFields.filter(field => !request.body[field]);

        if(missingFields.length > 0) {
            return response.status(400).json( { success: false, message: `Missing required fields: ${missingFields.join(', ')}`})
        }

        next();
    }
}