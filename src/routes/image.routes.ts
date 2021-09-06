import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import TokenMiddleware from "../middlewares/checkToken";

const router = Router();
const imageController = new ImageController();
const tokenMiddleware = new TokenMiddleware();


router.post(
  "/upload",  
  tokenMiddleware.verifyToken,  
  imageController.upload
);



export default router;
