import { Request, Response, NextFunction } from "express";
import Document from "../models/document.model";
import DocumentService, { Documents } from "../service/documentService";

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
            const {clientId} = req.query as {clientId : string};
            const documents = await DocumentService.getDocumentsByClientId(clientId);

            res.status(200).json({
                message : "Fetch Document is Successfully",
                documents
            })
            
        } catch (error) {
            next(error)
            
        }
    }

    static async getDocumentById(req : Request, res : Response, next : NextFunction) {
        try {
            const {id} = req.query as {id : string};
            const document = await DocumentService.getDocumentById(id);
            res.status(200).json({
                message : "Query Dokumen Sukses",
                document
            })

        } catch (error) {
            next(error);
        }
    }

    static async editDocumentById(req : Request, res : Response, next : NextFunction) {
        try {
            const {id} = req.query as {id : string};
            const data = req.body as Documents;
            await DocumentService.editDocumentsById(id, data);
            res.status(200).json({
                message : `Edit Dokumen dengan id ${id} berhasil`
            })
            
        } catch (error) {
            next(error);
        }
    }

    static async deleteDocumentById(req : Request, res : Response, next : NextFunction) {
        try {
            const {id} = req.query as {id : string};
            await DocumentService.deleteDocumentsById(id);
            res.status(200).json({
                message : `Delete Dokumen dengan id ${id} berhasil`
            })

        } catch (error) {
            next(error);
        }
    }

}

export default DocumentController;

