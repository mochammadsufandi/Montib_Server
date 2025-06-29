import express from "express";
import DocumentController from "../controller/documentController";
import { authentication } from "../middleware/auth";

const router = express.Router();

router.get("/documents", authentication, DocumentController.getDocumentsByClientId);
router.post("/createDocument", DocumentController.createDocuments)

export default router;