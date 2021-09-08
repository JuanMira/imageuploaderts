import express,{Request,Response} from "express";
import morgan from 'morgan';
import dotenv from 'dotenv';
import pkg from '../package.json';
import './database'
import { Database } from "./database";
import authRoute from "./routes/auth.routes"
import imageRoute from "./routes/image.routes"
import userRoute from './routes/user.routes'
import {createRoles} from './libs/initialSetup'
import cors from 'cors'

dotenv.config()
const db = new Database();
db.connection();

const app = express()
createRoles();
app.set('pkg',pkg);
app.use(express.json())
app.use(cors())

app.get("/",(req:Request,res:Response)=>{
    res.json({
        author:pkg.author,
        description:pkg.description,
        version:pkg.version
    })
});

app.use('/api/auth',authRoute)
app.use('/api/image',imageRoute)
app.use('/api/user',userRoute)

app.use(morgan('dev'))
app.use(express.json())


export default app