import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

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