import { Request, Response, NextFunction } from "express";
import Document from "../models/document.model";

class DocumentController {

    static async createDocuments(req : Request, res : Response, next : NextFunction) {
        try {
            const params = req.body;
            const document = new Document(params);
            await document.save();
            res.status(200).json({
                message : "Create Document is successfully",
                params
            })
        } catch (error) {
            res.status(500).json({
                message : `Error : ${error}`
            })
        }
    }

    static async getDocumentsByClientId(req : Request, res : Response, next : NextFunction) {
        try {
            const {clientId} = req.query;
            const documents = await Document.find({clientId}).populate("clientId", "nama_client");


            res.status(200).json({
                message : "Fetch Document is Successfully",
                documents
            })
            

        } catch (error) {
            res.status(500).json({
                message : `Error : ${error}`
            })
            
        }
    }

}

export default DocumentController;

