import {Model, Schema, model, ObjectId } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    avatarImage: string;
    role: ObjectId[]
}

interface UserModel extends Model<User>{
    encryptPassword(password:string):string;
    comparePassword(passwird:string,receivedPassword:string):boolean
}

const schema = new Schema<User,UserModel>({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatarImage: { type: String, default: "" },
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false
})

schema.static('encryptPassword',async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
})

schema.static('comparePassword',async (password: string, receivedPassword: string) => {
    return await bcrypt.compare(password,receivedPassword);
})

export default model<User,UserModel>('User', schema);