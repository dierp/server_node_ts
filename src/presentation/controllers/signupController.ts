import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError, ServerError, UserAlreadyExistsError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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

      if (!this.emailValidator.alreadyExists( email )) {
        errors.push( new UserAlreadyExistsError('email') )
      }
  
      return errors.length > 0 
        ? badRequest(errors)
        : {
          body: [],
          statusCode: 200
        }
    } catch (error){
      return {
        body: [ new ServerError() ],
        statusCode: 500
      }
    }
  }
}