import { Router } from "express";
import UserController from "../controllers/user.controller";
import TokenMiddleware from "../middlewares/checkToken";

const router = Router();
const userController = new UserController();
const middlewareToken = new TokenMiddleware();

router.get("/getuser", middlewareToken.verifyToken, userController.getUser);
router.put("/upload", middlewareToken.verifyToken, userController.uploadImage);

export default router;
