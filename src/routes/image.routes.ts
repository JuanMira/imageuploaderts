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
