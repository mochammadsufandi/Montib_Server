import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

class UserController {

    static async createUser(req : Request, res : Response, next : NextFunction) {
        try {
            const user = req.body;
            const newUser = new User(user);
            await newUser.save();
            res.status(201).json({
                message : "Create user is successfully"
            })
            
        } catch (error) {
            console.error(error);
            res.status(500).json({message : "Error"});
        }

    }
}

export default UserController