import Roles from '../models/Roles'

export async function createRoles(){
    try {
        const count = await Roles.estimatedDocumentCount();
        if(count>0) return;

        const values = await Promise.all([
            new Roles({name:"user"}).save(),
            new Roles({name:"admin"}).save()
        ]);
        console.log(values)
    } catch (error) {
        console.log(error)        
    }
}