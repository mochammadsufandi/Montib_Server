import express from "express";
import UserController from "../controller/userController" ;

const router = express.Router();

router.post("/createUser", UserController.createUser);

export default router;