import express from "express";
import dotenv from "dotenv";
import router from "./routes/mainRoute";
import { connectDB } from "./config/config";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api",router);


app.listen(5000, async() => {
    connectDB();
    console.log(`Server is listening on port 5000`);
})