import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode : number
}


export class CustomResponseError extends Error implements CustomError {
    statusCode: number;

    constructor({message, statusCode, name} : CustomError) {
        super(message);
        this.statusCode = statusCode;
        this.name = name

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name
    }
}

export const errorHandler : ErrorRequestHandler = async(
    error : CustomError,
    req : Request,
    res : Response,
    next : NextFunction
) : Promise<void> => {
    switch(true) {
        case error instanceof CustomResponseError :
            res.status(error.statusCode).json({
                message : error.message
            })
        default : 
            res.status(500).json({message : "Internal Server Error"});
    }
    next();
}


