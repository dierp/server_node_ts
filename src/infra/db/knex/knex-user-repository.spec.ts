import { KnexUserRepository } from './knex-user-repository'
import knex from '../knex'

describe('KnexUserRepository', () => {
  beforeAll(async () => {
    return await knex.migrate.latest()
    // you can here also seed your tables, if you have any seeding files
  })
  afterAll(async () => {
    return await knex.migrate
      .rollback()
      .then(async () => await knex.destroy())
  })

  test('Should return created user', async () => {
    const sut = new KnexUserRepository()
    const userToAdd = {
      name: 'diego',
      email: 'diego@email.com',
      password: 'hashed_pass'
    }
    const added = await sut.add(userToAdd)
    expect(added).toBeTruthy()
    expect(added.id).toBeTruthy()
    expect(added.email).toBe(userToAdd.email)
    expect(added.name).toBe(userToAdd.name)
  })
})
