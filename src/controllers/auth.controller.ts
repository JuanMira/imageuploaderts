import { Request, Response } from "express";
import { Signin, Signup, Token } from "../interfaces/auth";
import User from "../models/User";
import Role, { Roles } from "../models/Roles";
import jwt from "jsonwebtoken";

interface CustomRequest<T> extends Request {
  body: T;
}


export class AuthController {
  async signin(req: CustomRequest<Signin>, res: Response) {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username }).populate("role");

    if (!userFound) return res.status(400).json({ message: "User not found" });
    const passwordFound = await User.comparePassword(
      password,
      userFound.password
    );

    if (!passwordFound)
      return res.status(403).json({ message: "invalid password" });

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    res.json({ token });
  }

  async signup(req: CustomRequest<Signup>, res: Response) {
    const {
      username,
      email,
      firstName,
      lastName,
      password,
      avatarImage,
      role,
    } = req.body;

    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      firstName,
      lastName,
      avatarImage,
      email,
    });

    if (role) {
      const roleFound = await Role.find({ name: { $in: role } });
      newUser.role = roleFound.map((data: Roles) => data._id);
    } else {
      const roleUser = await Role.findOne({ name: "user" });
      newUser.role = [roleUser._id];
    }

    const savedUser = await newUser.save();
    res.status(200).json({ message: "user created succesfully" });
  }

  check(req:CustomRequest<Token>,res:Response){
    const token = req.body.token;    
    if(token){
      jwt.verify(token,process.env.SECRET,(err,verified)=>{
        if(err){
          res.status(400).json({error:"Token invalid"})
        }else{
          res.status(204).json({})
        }
      });      
    }    
  }
}
