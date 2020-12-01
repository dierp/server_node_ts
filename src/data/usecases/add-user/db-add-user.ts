import { User } from "../../../domain/models/user";
import { AddUser } from "../../../domain/usecases/add-user/add-user";
import { AddUserRepository } from "../../protocols/add-user-repository";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddUser implements AddUser {

    constructor(
        private readonly encrypter: Encrypter,
        private readonly addUserRepository: AddUserRepository
    ){}

    async add(user: Pick<User, "name" | "email" | "password">): Promise<Omit<User, "password">> {
        
        const hashedPassword = await this.encrypter.encrypt(user.password)
        const userAdded = await this.addUserRepository.add(
            Object.assign({}, user, { password: hashedPassword })
        )
        return new Promise(resolve => resolve(userAdded))
    }
}
