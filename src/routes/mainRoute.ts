import express from "express";
import documentRoutes from "./documentRoute";
import userRoutes from "./userRoute";

const router = express.Router();

router.use(documentRoutes);
router.use(userRoutes);

export default router;