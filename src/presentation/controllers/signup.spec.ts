import { SignUpController } from './signupController'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse, EmailValidator } from '../protocols'
import { InvalidParamError, ServerError, UserAlreadyExistsError } from '../errors'
import { AddUser } from '../../domain/usecases/add-user'
import { User } from '../../domain/models/user'

interface Sut {
  sut: SignUpController
  instanceEmailValidator: EmailValidator,
  instanceAddUser: AddUser
}

const makeSut = (): Sut => {
  const instanceEmailValidator = makeEmailValidator()
  const instanceAddUser = makeAddUser()
  const sut = new SignUpController(instanceEmailValidator, instanceAddUser)
  return {
    sut,
    instanceEmailValidator,
    instanceAddUser
  }
}

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string) {
      return true
    }
    alreadyExists (email: string) {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddUser = () => {
  class AddUserStub implements AddUser {
    add (user: Pick<User, "name" | "email" | "password">) {
      return true
    }
  }
  return new AddUserStub()
}

describe('SingUpController', () => {
  test('Should return 400 if there is a missing parameter', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
        body: {
        }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual( [
         new MissingParamError('name'),
         new MissingParamError('email'),
         new MissingParamError('password'),
         new MissingParamError('passwordConfirmation')
        ] )
  }),

  test('Should return 400 if email is not valid', () => {

    const { sut, instanceEmailValidator } = makeSut()
    jest.spyOn(instanceEmailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual( [
      new InvalidParamError('email')
    ] )
  }),

  test('Should return 400 if email already exists', () => {
    const { sut, instanceEmailValidator } = makeSut()
    jest.spyOn(instanceEmailValidator, 'alreadyExists').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'existant@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    } 

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual( [
      new UserAlreadyExistsError('email')
    ] )
  }),

  test('Should return 400 if passwords dont match', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'different_password'
      }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual( [
      new InvalidParamError('passwordConfirmation')
        ] )
  })

  test('Should return 500 if an exception occur with emailValidator', () => {
    const { sut, instanceEmailValidator } = makeSut()
    jest.spyOn(instanceEmailValidator, 'alreadyExists').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(500)
    expect (httpResponse.body).toEqual( [
      new ServerError()
    ])
  }),

  test('Should return 500 if an exception occur with addUser', () => {
    const { sut, instanceAddUser } = makeSut()
    jest.spyOn(instanceAddUser, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(500)
    expect (httpResponse.body).toEqual( [
      new ServerError()
    ])
  })
})