import express from "express";
import dotenv from "dotenv";
import router from "./routes/mainRoute";
import { connectDB } from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());
app.use("/api",router);
app.use("/api",errorHandler);


app.listen(5000, async() => {
    connectDB();
    console.log(`Server is listening on port 5000`);
})