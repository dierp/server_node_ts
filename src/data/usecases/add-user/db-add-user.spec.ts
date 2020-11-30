import { DbAddUser } from "./db-add-user";

class EncrypterStub {
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
  test('Should call encrypt and receive the hashed value', () => {
    const { sut, instanceEncrypter } = makeSut()
    const encrypterSpy = jest.spyOn(instanceEncrypter, 'encrypt')
    const add = sut.add({
        name: "valid_name",
        email: "valid_email",
        password: "valid_pass"
    })
    expect(encrypterSpy).toHaveBeenCalledWith('valid_pass')
  })
})