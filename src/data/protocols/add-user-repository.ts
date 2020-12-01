import { User } from "../../domain/models/user";

export interface AddUserRepository {
    add(user: Pick<User, "name" | "email" | "password">): Promise<Omit<User, "password">>
}