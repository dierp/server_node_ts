import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController implements Controller {

  handle(httpRequest: HttpRequest): HttpResponse {
    const errors = []
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]){
        errors.push(new MissingParamError(field))
      }
    }

    return errors.length > 0 
      ? badRequest(errors)
      : {
        body: [],
        statusCode: 200
      }
  }
}