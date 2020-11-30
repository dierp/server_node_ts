import { User } from "../../../domain/models/user";
import { AddUser } from "../../../domain/usecases/add-user/add-user";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddUser implements AddUser {

    constructor(private encrypter: Encrypter){}

    async add(user: Pick<User, "name" | "email" | "password">): Promise<User> {
        
        await this.encrypter.encrypt(user.password)
        return new Promise(resolve => resolve({
            id: 1,
            name: "created_name",
            email: "created_email",
            password: "created_pass"
        }))
    }
}
