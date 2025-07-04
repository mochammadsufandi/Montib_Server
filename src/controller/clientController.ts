import { Request, Response, NextFunction } from "express";
import Client from "../models/client.model";
import ClientService, { Clients } from "../service/clientService";

class ClientController {

    static async getClientByService(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const {dinas_frekuensi} = req.query as {dinas_frekuensi : string};
            const clients = await ClientService.getClientByService(dinas_frekuensi);
            res.status(200).json({
                message : `Query Client dengan service ${dinas_frekuensi} berhasil`,
                clients
            })

        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getClientById(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const {id} = req.query as {id : string};
            const client = await ClientService.getClientById(id);
            res.status(200).json({
                message : "Query client sukses",
                client
            })

        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async createClient(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const params = req.body as Clients;
            await ClientService.createClient(params);
            res.status(201).json({
                message : "Create Client is Successfully"
            })
            
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async editClient(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const {id} = req.query as {id : string};
            const params = req.body as Partial<Clients>;
            await ClientService.editClient(id, params);
            res.status(200).json({
                message : "Edit Client Sukses"
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async deleteClient(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const {id} = req.query as {id : string};
            await ClientService.deleteClient(id);
            res.status(200).json({
                message : "Delete Client Sukses"
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}


export default ClientController;