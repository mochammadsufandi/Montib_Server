import express from "express";
import ClientController from "../controller/clientController";

const router = express.Router();

router.get("/clientByService", ClientController.getClientByService);
router.get("/client", ClientController.getClientById);
router.post("/createClient", ClientController.createClient);
router.post("/editClient", ClientController.editClient);
router.delete("/deleteClient", ClientController.deleteClient);

export default router;