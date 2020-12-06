import app from '../config/app'
import request from 'supertest'
import knex from '../../infra/db/knex'

describe('Signup Routes', () => {
  beforeAll(async () => {
    return await knex.migrate.latest()
    // you can here also seed your tables, if you have any seeding files
  })
  afterAll(async () => {
    return await knex.migrate
      .rollback()
      .then(async () => await knex.destroy())
  })
  test('Should return an user on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      })
      .expect(200)
  })
})
