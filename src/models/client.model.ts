import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        nama_client : {
            type : String,
            required : true
        }, 
        alamat_client : {
            type : String,
            required : true
        },
        dinas_frekuensi : {
            type : String,
            required : true
        }
    }
)

const Client = mongoose.model("Client", clientSchema);

export default Client;