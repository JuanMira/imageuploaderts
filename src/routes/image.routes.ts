import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import TokenMiddleware from "../middlewares/checkToken";
import { imageStorage } from '../libs/multer'
import multer from "multer";

const router = Router();
const imageController = new ImageController();
const tokenMiddleware = new TokenMiddleware();
const upload = multer({storage: imageStorage})

router.post(
  "/upload",
  tokenMiddleware.verifyToken,
  upload.array("photos"),
  imageController.upload
);

router.get(
  "/download",
  tokenMiddleware.verifyToken,
  imageController.getAllPhotos
)

router.delete(
  "/delete",
  tokenMiddleware.verifyToken,
  imageController.deletePhotos
)

router.delete(
  "/delete/:imageId",
  tokenMiddleware.verifyToken,
  imageController.deletePhoto
)

export default router;
