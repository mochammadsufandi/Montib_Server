import express from "express";
import documentRoutes from "./documentRoute";
import userRoutes from "./userRoute";
import clientRoutes from "./clientRoute";

const router = express.Router();

router.use(documentRoutes);
router.use(userRoutes);
router.use(clientRoutes);


export default router;