import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Mongo DB is connected from ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error}`);
        process.exit(1);
    }
}