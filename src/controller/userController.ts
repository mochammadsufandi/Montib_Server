import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import UserService, { loginParams, userParams } from "../service/userService";

const accessCookie = process.env.Cookie_Access_Token as string;

class UserController {

    static async createUser(req : Request, res : Response, next : NextFunction) {
        try {
            const user = req.body as userParams;
            await UserService.createUser(user);
            res.status(201).json({
                message : `Create user ${user.username} is successfully`
            })
            
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async login(req : Request, res : Response, next : NextFunction) {
        try {
            const loginPayload = req.body as loginParams;
            const token = await UserService.login(loginPayload);
            res.cookie(accessCookie, token, {
                httpOnly : true,
                secure : true,
                maxAge : 3600000
            })
            res.status(200).json({
                message : "Login Successfully",
                token
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

}

export default UserController