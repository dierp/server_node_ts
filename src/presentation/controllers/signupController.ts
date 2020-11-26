import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController implements Controller {

  handle(httpRequest: HttpRequest): HttpResponse {
    try{

      const errors = []
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]){
          errors.push(new MissingParamError(field))
        }
      }
  
      if (httpRequest.body.password !== httpRequest.body.password_confirmation) {
        errors.push(new InvalidParamError('passwordConfirmation'))
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
        statusCode: 200
      }
    }
  }
}