import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        nomor_surat : {
            type : String,
            required : true
        }, 
        nama_surat : {
            type : String,
            required : true
        },
        jenis_surat : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        },
        tanggal_dibuat : {
            type : String,
            required : true
        },
        clientId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Client"
        }
    },
    {
        timestamps : true
    }
)

const Document = mongoose.model("Document", documentSchema);
export default Document;