import { User } from "../../../domain/models/user";
import { AddUserRepository } from "../../protocols/add-user-repository";
import { Encrypter } from "../../protocols/encrypter";
import { DbAddUser } from "./db-add-user";

class EncrypterStub implements Encrypter {
  async encrypt (password: string): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}

class AddUserRepositoryStub {
  async add(user: Pick<User, "name" | "email" | "password">): 
    Promise<Omit<User, "password">>{
    return new Promise((resolve, reject) => {
      resolve(
        {
          id: 1,
          name: "valid_name",
          email: "valid_email"
        }
      )
    })
  }
}

export interface SutTypes {
  instanceEncrypter: EncrypterStub,
  addUserRepository: AddUserRepository,
  sut: DbAddUser
}

const makeSut = (): SutTypes => {

  const instanceEncrypter = new EncrypterStub()
  const addUserRepository = new AddUserRepositoryStub()
  const sut = new DbAddUser(instanceEncrypter, addUserRepository)

  return {
    sut,
    instanceEncrypter,
    addUserRepository
  }
}

describe('Add User', () => {
  test('Should call encrypt with correct param(password) and receive the hashed value', async () => {
    const { sut, instanceEncrypter } = makeSut()
    const encrypterSpy = jest.spyOn(instanceEncrypter, 'encrypt')
    const add = await sut.add({
        name: "valid_name",
        email: "valid_email",
        password: "valid_pass"
    })
    expect(encrypterSpy).toHaveBeenCalledWith('valid_pass')
  }),

  test('Should throw error if Encrypter throws', async () => {
    const { sut, instanceEncrypter } = makeSut()
    jest.spyOn(instanceEncrypter, 'encrypt').mockReturnValueOnce(
      new Promise<string>((resolve, reject) => {
        reject(new Error())
      })
    )
    const add = sut.add({
      name: "valid_name",
      email: "valid_email",
      password: "valid_pass"
    })

    await expect(add).rejects.toThrow()
  }),

  test('Should throw error if AddUserRepository throws', async () => {
    const { sut, addUserRepository } = makeSut()
    jest.spyOn(addUserRepository, 'add').mockReturnValueOnce(
      new Promise<Omit<User, "password">>((resolve, reject) => {
        reject(new Error())
      })
    )
    const add = sut.add({
      name: "valid_name",
      email: "valid_email",
      password: "valid_pass"
    })

    await expect(add).rejects.toThrow()
  }),

  test('Should call AddUserRepository with correct params', async () => {
    const { sut, addUserRepository } = makeSut()
    const addSpy = jest.spyOn(addUserRepository, 'add')
    const add = await sut.add({
        name: "valid_name",
        email: "valid_email",
        password: "valid_pass"
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password"
    })
  })

})