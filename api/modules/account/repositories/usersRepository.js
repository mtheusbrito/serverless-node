import { getCollection } from "../../../config/db-connect.js"
export class UsersRepository {
    
   

    findUserByUsername = async(username) =>{
        const collection = await getCollection('users');

        const user = await collection.findOne({
            username: username
          });
          return user;

    }
    
}