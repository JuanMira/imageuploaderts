import {Schema,model,Document} from 'mongoose'

export const ROLES = ["user","admin"];

export interface Roles{
    _id?:Schema.Types.ObjectId,
    name:string;
}

const roleSchema = new Schema<Roles>({
    name:String,
},{
    versionKey:false
})

export default model("Role",roleSchema)