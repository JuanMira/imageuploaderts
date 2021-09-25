import { Request, Response } from "express";
import User, { User as UserType } from "../models/User";
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

  async updateProfile(
    req: CustomRequest<any, RequestQuery, RequestParams>,
    res: Response
  ) {
    const body: UserType = req.body;    
    try {
      await User.findByIdAndUpdate(req.userId,body)
      res.status(200).json({message:"user updated successfully"})
      
    } catch (error) {
      res.status(404).json({ message: "Something went wrong please try again" });
    }
  }
}
