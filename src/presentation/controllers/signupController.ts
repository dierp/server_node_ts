import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {

  handle(httpRequest: HttpRequest): HttpResponse {
    const body = []
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]){
        body.push(new MissingParamError(field))
      }
    }

    return {
      body: body,
      statusCode: 400
    }
  }
}