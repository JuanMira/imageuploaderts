import { Response } from "express";
import storage from "../libs/multer";
import fs from "fs";
import multer from "multer";
import Images, { Image } from "../models/Images";
import { Params, Query, Request } from "../interfaces/middlewares";
import rimraf from "rimraf";
import mongoose from "mongoose";

const uploadFile = multer({ dest: "uploads/", storage }).array("photos");

interface RequestQuery extends Query {
  page: string;
}

interface RequestParams extends Params {
  userId: string;
  imageId: string;
}

export class ImageController {
  async upload(req: Request<any, RequestQuery, RequestParams>, res: Response) {
    uploadFile(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "error uploading file" });
      } else {
        return;
      }
    });
    res.json({ message: `uploaded successfully` });
  }

  async getAllPhotos(
    req: Request<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    try {
      const dataImages = await Images.find({ userId: req.userId });
      res.status(200).json({ data: dataImages });
    } catch (error) {
      res.status(400).json({ message: "Error fetching images" });
    }
  }

  async deletePhotos(
    req: Request<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    try {
      const deleted = await Images.deleteMany({ userId: req.userId });
      rimraf.sync(`./src/uploads/${req.userId}`);
      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "error deleting folder" });
    }
  }

  async deletePhoto(
    req: Request<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    try {
      const imageId = new mongoose.Types.ObjectId(req.params.imageId);
      const image: Image = await Images.findById({ _id: imageId });
      const path = `./src/uploads/${req.userId}/${image.name}`;
      await Images.findOneAndDelete({ imageId });
      fs.unlinkSync(path);
      res.status(200).json({ message: "image successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: "error deleting image" });
    }
  }
}
