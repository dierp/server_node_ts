import { Controller, EmailValidator, EmailExistance, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError, UserAlreadyExistsError } from '../errors'
import { badRequest, serverError, ok } from '../helpers'
import { AddUser } from '../../domain/usecases/add-user/add-user'
import { User } from '../../domain/models/user'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly emailExistance: EmailExistance
  private readonly addUser: AddUser

  constructor (
    emailValidator: EmailValidator,
    emailExistance: EmailExistance,
    addUser: AddUser
    ) {
    this.emailValidator = emailValidator
    this.emailExistance = emailExistance
    this.addUser = addUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{

      const errors = []
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]){
          errors.push(new MissingParamError(field))
        }
      }
  
      if (password !== passwordConfirmation) {
        errors.push(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid( email )) {
        errors.push( new InvalidParamError('email') )
      }

      if ( ! await this.emailExistance.alreadyExists( email )) {
        errors.push( new UserAlreadyExistsError('email') )
      }

      if (errors.length === 0) {
        const createdUser: Omit<User, "password"> = await this.addUser.add({
          name,
          email,
          password
        })

        return ok<Omit<User, "password">>(createdUser)
      } else {
        return badRequest(errors)
      }

    } catch (error){
      return serverError()
    }
  }
}