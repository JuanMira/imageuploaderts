import { Router } from "express";
import UserController from "../controllers/user.controller";
import TokenMiddleware from "../middlewares/checkToken";
import multer from "multer";
import { avatarStorage } from "../libs/multer";

const router = Router();
const userController = new UserController();
const middlewareToken = new TokenMiddleware();
//const upload = multer({ storage: avatarStorage });

router.get("/getuser", middlewareToken.verifyToken, userController.getUser);
router.put(
  "/upload",
  middlewareToken.verifyToken,  
  userController.uploadImage
);

router.put(
  "/updateUser",
  middlewareToken.verifyToken,
  userController.updateProfile
)

export default router;
