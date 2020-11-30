import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError, ServerError, UserAlreadyExistsError } from '../errors'
import { badRequest, serverError, ok } from '../helpers'
import { AddUser } from '../../domain/usecases/add-user'
import { User } from '../../domain/models/user'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addUser: AddUser

  constructor (
    emailValidator: EmailValidator,
    addUser: AddUser
    ) {
    this.emailValidator = emailValidator
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

      if ( ! await this.emailValidator.alreadyExists( email )) {
        errors.push( new UserAlreadyExistsError('email') )
      }

      if (errors.length === 0) {
        const createdUser: User = await this.addUser.add({
          name,
          email,
          password
        })

        return ok<User>(createdUser)
      } else {
        return badRequest(errors)
      }

    } catch (error){
      return serverError()
    }
  }
}