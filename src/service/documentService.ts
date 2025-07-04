import { ObjectId, Types } from "mongoose";
import { CustomResponseError } from "../middleware/errorHandler";
import Document from "../models/document.model";
import User from "../models/user.model";

export interface Documents {
    _id : Types.ObjectId,
    nomor_surat : string,
    nama_surat : string,
    jenis_surat : string,
    url : string,
    tanggal_dibuat : string,
    clientId? : Types.ObjectId | null,
    createdAt : Date,
    updatedAt : Date,
}


class DocumentService {

    static async getDocumentsByClientId(clientId : string) : Promise<Documents[] | null> {
        if(!clientId) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Tidak Ada Input Client Id",
                statusCode : 400
            })
        }
        const user = await User.findOne({_id : clientId});
        if(!user) {
            throw new CustomResponseError({
                name : "No User",
                message : `Tidak Ada User dengan Id ${clientId}`,
                statusCode : 400
            })
        }
        const documents = await Document.find({clientId}).populate("clientId", "nama_client");
        return documents;
    }

    static async getDocumentById(id : string) : Promise<Documents | null> {
        if(!id) {
            throw new CustomResponseError({
                name : "Id Not Found",
                message : "Id Tidak Ditemukan",
                statusCode : 400
            })
        }
        if(typeof id !== "string") {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Type Id yang digunakan tidak sesuai",
                statusCode : 400
            })
        }
        const document = await Document.findById(id);
        return document;
    }

    static async editDocumentsById(id : string, data : Partial<Documents>) : Promise<void> {
        if(!id) {
            throw new CustomResponseError({
                name : "Id Not Found",
                message : "Id Tidak Ditemukan",
                statusCode : 400
            })
        }
        if(typeof id !== "string") {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Type Id yang digunakan tidak sesuai",
                statusCode : 400
            })
        }
        const updatedDocument = await Document.findByIdAndUpdate(id, data, {new : true});
        if(!updatedDocument){
            throw new CustomResponseError({
                name : "No Document",
                message : `Dokumen dengan id : ${id} tidak ditemukan`,
                statusCode : 400
            })
        }
    }

    static async deleteDocumentsById(id : string) : Promise<void> {
        if(!id) {
            throw new CustomResponseError({
                name : "Id Not Found",
                message : "Id Tidak Ditemukan",
                statusCode : 400
            })
        }
        if(typeof id !== "string") {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Type Id yang digunakan tidak sesuai",
                statusCode : 400
            })
        }
        const deleteDocument = await Document.findByIdAndDelete(id);
        if(!deleteDocument) {
            throw new CustomResponseError({
                name : "No Document",
                message : `Dokumen dengan id ${id} tidak ditemukan`,
                statusCode : 400
            })
        }
    }
}

export default DocumentService;