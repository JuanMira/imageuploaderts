import {Response,NextFunction  } from 'express'
import jwt from 'jsonwebtoken'
import User,{} from '../models/User'
import Role from '../models/Roles'
import {Params,Query,Request,verifyToken,TokenPayload} from '../interfaces/middlewares'

interface RequestQuery extends Query{}

interface RequestParams extends Params {
    userId:string;
}

export default class JWTMiddleware{
    async verifyToken(req:Request<any,RequestQuery,RequestParams>,res:Response,next:NextFunction){
        try {
            const token = req.headers.authorization;
            if(!token) return res.status(403).json({message:"no token provider"})
            const decoded = verifyToken<TokenPayload>(token,process.env.SECRET)

            req.userId = decoded.id;

            const userFound = await User.findById(req.userId,{password:0});
            if(!userFound) return res.status(400).json({message:"no user found"})
            next()
        } catch (error) {
            return res.status(401).json({message:"unauthorized"})
        }
    }

    async isAdmin(req:Request<any,RequestQuery,RequestParams>,res:Response,next:NextFunction){
        const user = await User.findById(req.userId);
        const roles = await Role.find({_id:{$in:user.role}});

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === 'admin'){
                next();
                return;
            }
        }

        return res.status(403).json({message:"Require admin role"})
    }
}