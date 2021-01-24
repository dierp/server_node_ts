import { SignUpController } from './signupController'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse, EmailValidator } from '../protocols'
import { InvalidParamError, ServerError } from '../errors'
import { AddUser } from '../../domain/usecases/add-user/add-user'
import { User } from '../../domain/models/user'

interface Sut {
  sut: SignUpController
  instanceEmailValidator: EmailValidator
  // instanceEmailExistance: EmailExistance
  instanceAddUser: AddUser
}

const makeSut = (): Sut => {
  const instanceEmailValidator = makeEmailValidator()
  // const instanceEmailExistance = makeEmailExistance()
  const instanceAddUser = makeAddUser()
  const sut = new SignUpController(
    instanceEmailValidator,
    instanceAddUser)
  return {
    sut,
    instanceEmailValidator,
    instanceAddUser
  }
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

// const makeEmailExistance = (): EmailExistance => {
//   class EmailExistanceStub implements EmailExistance {
//     async alreadyExists (email: string): Promise<boolean> {
//       return true
//     }
//   }
//   return new EmailExistanceStub()
// }

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (user: Pick<User, 'name' | 'email' | 'password'>): Promise<User> {
      return new Promise(resolve => resolve({
        id: 1,
        name: 'fake_name',
        email: 'fake_email',
        password: 'fake_password'
      })
      )
    }
  }
  return new AddUserStub()
}

describe('SingUpController', () => {
  test('Should return 400 if there is a missing parameter', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
      }
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual([
      new MissingParamError('name'),
      new MissingParamError('email'),
      new MissingParamError('password'),
      new MissingParamError('passwordConfirmation')
    ])
  }),

  test('Should return 400 if email is not valid', async () => {
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
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual([
      new InvalidParamError('email')
    ])
  }),

  // test('Should return 400 if email already exists', async () => {
  //   const { sut, instanceEmailExistance } = makeSut()
  //   jest.spyOn(instanceEmailExistance, 'alreadyExists').mockImplementationOnce(async () => {
  //     return new Promise((resolve, reject) => {
  //       resolve(false)
  //     })
  //   })
  //   const httpRequest: HttpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'existant@mail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse: HttpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual([
  //     new UserAlreadyExistsError('email')
  //   ])
  // }),

  test('Should return 400 if passwords dont match', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'different_password'
      }
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual([
      new InvalidParamError('passwordConfirmation')
    ])
  }),

  // test('Should return 500 if an exception occur during handle', async () => {
  //   const { sut, instanceEmailExistance } = makeSut()
  //   jest.spyOn(instanceEmailExistance, 'alreadyExists').mockImplementationOnce(async () => {
  //     return new Promise((resolve, reject) => {
  //       reject(new Error())
  //     })
  //   })

  //   const httpRequest: HttpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'email@mail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse: HttpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(500)
  //   expect(httpResponse.body).toEqual([
  //     new ServerError()
  //   ])
  // }),

  test('Should return 500 if an exception occur with addUser', async () => {
    const { sut, instanceAddUser } = makeSut()
    jest.spyOn(instanceAddUser, 'add').mockImplementationOnce((): any => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual([
      new ServerError()
    ])
  }),

  test('Should return 200 and added user if data is correct', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'fake_name',
      email: 'fake_email',
      password: 'fake_password'
    })
  })
})
