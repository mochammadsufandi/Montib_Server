import express from "express";
import ClientController from "../controller/clientController";

const router = express.Router();

router.post("/createClient", ClientController.createClient);

export default router;