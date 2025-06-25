import { Request, Response, NextFunction } from "express";

class DocumentController {

    static async getAllDocuments(req : Request, res : Response, next : NextFunction) {
        try {
            const params = req.body;
            console.log(params);
            res.status(200).json({
                message : "Fetch All Documents is successfully",
                params
            })
        } catch (error) {
            next(error);
        }
    }

}

export default DocumentController;

