import mongoose from "mongoose";

export const connectDB = async() : Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Mongo DB is connected from ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error}`);
        process.exit(1);
    }
}

export const disconnectDB = async() : Promise<void> => {
    try {
        const connection = await mongoose.connection.close();
        console.log("MongoDB Disconnected");
    } catch (error) {
        console.error("MongoDB Disconnection Error : ", error);
        
    }
}