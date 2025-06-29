import { Request, Response, NextFunction } from "express";
import Client from "../models/client.model";

class ClientController {

    static async createClient(req : Request, res : Response, next : NextFunction) {
        try {
            const params = req.body;
            const client = new Client(params);
            await client.save();
            res.status(201).json({
                message : "Create Client is Successfully"
            })
            
        } catch (error) {
            console.error(error);
            res.status(500).json({message : "Error"});
        }
    }
}


export default ClientController;