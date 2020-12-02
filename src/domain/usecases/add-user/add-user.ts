import { User } from '../../models/user'

export interface AddUser {
  add: (user: Pick<User, 'name' | 'email' | 'password'>) => Promise<Omit<User, 'password'>>
}
