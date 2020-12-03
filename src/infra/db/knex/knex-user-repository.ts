import knex from '../knex'
import { AddUserRepository } from '../../../data/protocols/add-user-repository'
import { User } from '../../../domain/models/user'

export class KnexUserRepository implements AddUserRepository {
  async add (user: Pick<User, 'name' | 'email' | 'password'>): Promise<Omit<User, 'password'>> {
    const lastId = await knex('users').insert(user)
    const { password, ...userWithoutPassword } = user
    const userAdded = Object.assign({}, userWithoutPassword, { id: lastId[0] })
    return userAdded
  }
}
