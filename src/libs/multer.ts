import multer from "multer";
import { dirname } from "../vars";
import fs from "fs";
import { Params, Query, Request } from "../interfaces/middlewares";
import path from "path";
import Image from "../models/Images";

interface RequestQuery extends Query {}

interface RequestParams extends Params {
  userId: string;
}

const storage = multer.diskStorage({
  destination: function (
    req: Request<any, RequestQuery, RequestParams>,
    file,
    cb
  ) {
    if (fs.existsSync(`./src/uploads/${req.userId}`)) {
      cb(null, `./src/uploads/${req.userId}`);
    } else {
      fs.mkdirSync(`./src/uploads/${req.userId}`, { recursive: true });
      cb(null, dirname + `/uploads/${req.userId}`);
    }
  },
  filename: function (
    req: Request<any, RequestQuery, RequestParams>,
    file,
    cb
  ) {
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

export default storage;
