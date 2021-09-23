import { Request, Response } from "express";
import User from "../models/User";
import {
  Params,
  Query,
  Request as CustomRequest,
} from "../interfaces/middlewares";
import multer from "multer";
import { avatarStorage } from "../libs/multer";

const upload = multer({ storage: avatarStorage }).single("avatar");

interface RequestQuery extends Query {
  page: string;
}

interface RequestParams extends Params {
  userId: string;
  imageId: string;
}

export default class UserController {
  async getUser(
    req: CustomRequest<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    const user = await User.findById(req.userId).populate("role");
    if (user) {
      user.password = "";
      return res.status(200).json({ data: user });
    }
    return res.status(400).json({ message: "user not found" });
  }

  async uploadImage(
    req: CustomRequest<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "Cannot upload avatar image" });
      } else {
        return;
      }
    });

    return res
      .status(200)
      .json({ message: "Avatar image uploaded successfully" });
  }
}
