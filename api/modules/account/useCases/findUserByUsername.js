import { UsersRepository } from "../repositories/usersRepository.js";

export class FindUserByUsername {
    constructor(){
        this.repository = new UsersRepository();
    }

    handler = async (username) => { 
        const user = await this.repository.findUserByUsername(username);
        if(!user){
            throw new Error("User not found");
        }
        return user;
        
    }
}