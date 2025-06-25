import express from "express";
import DocumentController from "../controller/documentController";

const router = express.Router();

router.get("/documents", DocumentController.getAllDocuments);

export default router;