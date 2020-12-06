import app from '../config/app'
import request from 'supertest'

describe('Signup Routes', () => {
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
