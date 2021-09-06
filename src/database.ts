import {connect} from 'mongoose'


export class Database {
    private mongoUser:string = process.env.MONGO_USERNAME;
    private mongoPassword:string = process.env.MONGO_PASSWORD;   
    private connectionString:string = `mongodb+srv://${this.mongoUser}:${this.mongoPassword}@cluster0.5ioh5.mongodb.net/imageuploader?retryWrites=true&w=majority`
    client:any


    async connection(){
        return await connect(this.connectionString).then(client=>{
            console.log('setting client');
            this.client = client;
        }).catch(error=>{
            console.log("error during connecting mongo");
            console.log(error)
        });

    }
}