import { DbAddUser } from '../../data/usecases/add-user/db-add-user'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { KnexUserRepository } from '../../infra/db/knex/knex-user-repository'
import { SignUpController } from '../../presentation/controllers/signupController'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addUserKnex = new KnexUserRepository()
  const addUser = new DbAddUser(encrypter, addUserKnex)
  return new SignUpController(emailValidator, addUser)
}
