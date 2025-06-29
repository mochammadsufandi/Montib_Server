import express from "express";
import UserController from "../controller/userController" ;

const router = express.Router();

router.post("/createUser", UserController.createUser);
router.post("/login", UserController.login);

export default router;