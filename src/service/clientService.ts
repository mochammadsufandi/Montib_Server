import { Types } from "mongoose";
import { CustomResponseError } from "../middleware/errorHandler";
import Client from "../models/client.model";

export interface Clients {
    _id : Types.ObjectId,
    nama_client : string,
    alamat_client : string,
    dinas_frekuensi : string,
}

class ClientService {

    static async getClientByService(dinas_frekuensi : string) : Promise<Clients[]> {
         if(!dinas_frekuensi) {
            throw new CustomResponseError({
                name : "Dinas_frekuensi Not Found",
                message : "Dinas Frekuensi Tidak Ditemukan",
                statusCode : 400
            })
        }
        if(typeof dinas_frekuensi !== "string") {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Type Service yang digunakan tidak sesuai",
                statusCode : 400
            })
        }
        const clients = await Client.aggregate([
            {$match : {dinas_frekuensi}},
            {
                $lookup : {
                    from : "documents",
                    localField : "_id",
                    foreignField : "clientId",
                    as : "document"
                }
            },
            {
                $addFields : {
                    total_documents : {$size : "$document"},
                    tanggal_terakhir_document : {$max : "$document.createdAt"}
                }
            },
            {
                $project : {document : 0}
            }
        ])
        return clients
    }

    static async getClientById(id : string) : Promise<Clients | null> {
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
        const client = await Client.findById(id);
        return client;
    }

    static async createClient(params : Omit<Clients, "_id">) : Promise<void> {
        const {nama_client, alamat_client, dinas_frekuensi} = params;
        if(!nama_client || !alamat_client || !dinas_frekuensi) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Field untuk menambahkan client tidak lengkap",
                statusCode : 400
            })
        }
        const existingClient = await Client.findOne({nama_client});
        if(existingClient) {
            throw new CustomResponseError({
                name : "Existing Client",
                message : "Nama client telah dimasukkan sebelumnya, silahkan cek kembali",
                statusCode : 400
            })
        }
        const client = new Client(params);
        await client.save();
    }

    static async editClient(id : string, params : Partial<Clients>) : Promise<void> {
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
        const updatedClient = await Client.findByIdAndUpdate(id, params, {new : true});
        if(!updatedClient) {
            throw new CustomResponseError({
                name : "No Client",
                message : `Dokumen dengan id : ${id} tidak ditemukan`,
                statusCode : 400
            })
        }
    }

    static async deleteClient(id : string) : Promise<void> {
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
        const deleteClient = await Client.findByIdAndDelete(id);
        if(!deleteClient) {
            throw new CustomResponseError({
                name : "No Client",
                message : `Client dengan id ${id} tidak ditemukan`,
                statusCode : 400
            })
        }
    }

}

export default ClientService;