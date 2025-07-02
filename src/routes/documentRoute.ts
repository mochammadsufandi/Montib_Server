import express from "express";
import DocumentController from "../controller/documentController";
import { authentication } from "../middleware/auth";

const router = express.Router();

router.get("/documents", DocumentController.getDocumentsByClientId);
router.get("/documentId", DocumentController.getDocumentById);
router.post("/createDocument", DocumentController.createDocuments);
router.post("/editDocument", DocumentController.editDocumentById);
router.delete("/deleteDocument", DocumentController.deleteDocumentById);

export default router;