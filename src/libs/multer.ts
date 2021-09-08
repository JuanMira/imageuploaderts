import multer from "multer";
import { dirname } from "../vars";
import fs from "fs";
import { Params, Query, Request } from "../interfaces/middlewares";
import path from "path";
import Image from "../models/Images";
import User from "../models/User";

interface RequestQuery extends Query {}

interface RequestParams extends Params {
  userId: string;
}

const storage = multer.diskStorage({
  destination(req: Request<any, RequestQuery, RequestParams>, file, cb) {
    if (fs.existsSync(`./src/uploads/${req.userId}`)) {
      cb(null, `./src/uploads/${req.userId}`);
    } else {
      fs.mkdirSync(`./src/uploads/${req.userId}`, { recursive: true });
      cb(null, dirname + `/uploads/${req.userId}`);
    }
  },
  filename(req: Request<any, RequestQuery, RequestParams>, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename: string =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
    const image = new Image({
      name: filename,
      path: dirname + `/uploads/${req.userId}`,
      userId: req.userId,
    });
    image.save();
  },
});

export const avatarStorage = multer.diskStorage({
  async destination(req: Request<any, RequestQuery, RequestParams>, file, cb) {
    if (fs.existsSync(`./src/uploads/${req.userId}/avatar/`)) {
      cb(null, `./src/uploads/${req.userId}/avatar/`);
    } else {
      fs.mkdirSync(`./src/uploads/${req.userId}/avatar/`, { recursive: true });
      cb(null, dirname + `/uploads/${req.userId}/avatar/`);
      const dest = `${dirname}/uploads/${req.userId}/avatar/${
        req.userId
      }.png`;
      await User.findByIdAndUpdate(req.userId, { avatarImage: dest });
    }
  },
  async filename(req: Request<any, RequestQuery, RequestParams>, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename: string = req.userId + ".png";
    cb(null, filename);
  },
});

export default storage;
