import { isValidObjectId, ObjectId, Types } from "mongoose";
import { CustomResponseError } from "../middleware/errorHandler";
import Document from "../models/document.model";
import Client from "../models/client.model";

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

    static async getDocumentsByClientId(
        clientId : string, tahun_dibuat : string, tahun_upload : string, jenis_surat : string 
    ) : Promise<Documents[] | null> {
        if(!clientId) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Tidak Ada Input Client Id",
                statusCode : 400
            })
        }
        const user = await Client.findOne({_id : clientId});
        if(!user) {
            throw new CustomResponseError({
                name : "No User",
                message : `Tidak Ada Client dengan Id ${clientId}`,
                statusCode : 400
            })
        }
        const tahun_upload_query = tahun_upload ? parseInt(tahun_upload) : new Date().getFullYear();
        const startYear = new Date(`${tahun_upload_query}-01-01T00:00:00.000Z`);
        const endYear = new Date(`${tahun_upload_query + 1}-01-01T00:00:00.000Z`);
        const query : any = {
            clientId,
            createdAt : {
                $gte : startYear,
                $lt : endYear
            }
        }
        if(jenis_surat && typeof jenis_surat === "string") {
            query.jenis_surat = jenis_surat;
        }
        const documents = await Document.find(query).populate("clientId", "nama_client");
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
        if(typeof id !== "string" || !isValidObjectId(id)) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Id yang digunakan tidak sesuai / valid",
                statusCode : 400
            })
        }
        const document = await Document.findById(id);
        return document;
    }
    
    static async createDocument(data : Omit<Documents, "_id">) : Promise<void> {
        const {nomor_surat, nama_surat, jenis_surat, url, tanggal_dibuat, clientId} = data;;
        if(!nomor_surat || !nama_surat || !jenis_surat || !url || !tanggal_dibuat || !clientId) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Field untuk menambahkan Document tidak lengkap",
                statusCode : 400
            })
        }
        const existingDocument = await Document.findOne({nomor_surat});
        if(existingDocument) {
            throw new CustomResponseError({
                name : "Existing Document",
                message : "Dokumen dengan nomor yang sama sudah ada",
                statusCode : 400

            })
        }
        const existingClient = await Client.findById(clientId);
        if(!existingClient) {
            throw new CustomResponseError({
                name : "Not Found Client",
                message : "Client tidak ditemukan/invalid",
                statusCode : 400
            })
        }
        const document = new Document(data);
        await document.save();
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