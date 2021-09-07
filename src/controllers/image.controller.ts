import { Request, Response } from 'express'
import storage from "../libs/multer";
import multer from "multer";
import Images from '../models/Images';

const uploadFile = multer({dest:"uploads/",storage:storage}).array('photos')

export class ImageController{
    async upload(req:Request,res:Response){
        uploadFile(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(400).json({message:"error uploading file"})
            }else{
                return;
            }
        })                        
        res.json({message:`uploaded successfully`})
    }

    async getAllPhotos(req:Request,res:Response){
        
    }
}