import { Request, Response, NextFunction } from "express";
import { CustomResponseError } from "./errorHandler";
import { verifyToken } from "../lib/jsonwebtoken";

export const authentication = async(req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        const accessToken = req.cookies.accessCookie;
        console.log(accessToken)
        if(!accessToken) {
            throw new CustomResponseError({
                name : "Invalid Token",
                message : "Login Token is not Found",
                statusCode : 400
            })
        }
        const loggedUser = verifyToken(accessToken);
        next();
    } catch (error) {
        next(error);
    }
}