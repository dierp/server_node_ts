import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {

  handle(httpRequest: HttpRequest): HttpResponse {
    const body = []
    const validationRules = {
      1: !httpRequest.body.name 
          ? body.push(new MissingParamError('name')) 
          : null,
      2: !httpRequest.body.email 
          ? body.push(new MissingParamError('email')) 
          : null,
    }

    return {
      body: body,
      statusCode: 400
    }
  }
}