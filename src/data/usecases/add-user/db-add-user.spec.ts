import { Encrypter } from "../../protocols/encrypter";
import { DbAddUser } from "./db-add-user";

class EncrypterStub implements Encrypter {
  async encrypt (password: string): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}

export interface SuTtypes {
  instanceEncrypter: EncrypterStub,
  sut: DbAddUser
}

const makeSut = (): SuTtypes => {

  const instanceEncrypter = new EncrypterStub()
  const sut = new DbAddUser(instanceEncrypter)

  return {
    sut,
    instanceEncrypter
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
  })

})