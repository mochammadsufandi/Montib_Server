import { Request, Response, NextFunction } from "express";
import DocumentService, { Documents } from "../service/documentService";

class DocumentController {

    static async createDocuments(req : Request, res : Response, next : NextFunction) {
        try {
            const data = req.body as Omit<Documents, "_id">;
            await DocumentService.createDocument(data);
            res.status(200).json({
                message : "Create Document is successfully",
                data
            })
        } catch (error) {
           next(error)
        }
    }

    static async getDocumentsByClientId(req : Request, res : Response, next : NextFunction) {
        try {
            const {clientId,tahun_dibuat,tahun_upload,jenis_surat } = req.query as {
                clientId : string, tahun_dibuat : string, tahun_upload : string, jenis_surat : string
            };
            const documents = await DocumentService.getDocumentsByClientId(clientId, tahun_dibuat, tahun_upload, jenis_surat);

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

