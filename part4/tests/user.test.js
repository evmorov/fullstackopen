const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('validation', () => {
  test("can't create a user without a username", async () => {
    const result = await api
      .post('/api/users')
      .send({
        name: 'Somename',
        password: 'Password123',
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain(
      'User validation failed: username: Path `username` is required.',
    )
  })

  test("can't create a user with a short username", async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: 'Ab',
        name: 'Somename',
        password: 'Password123',
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain(
      'User validation failed: username: Path `username` (`Ab`) is shorter than the minimum allowed length (3).',
    )
  })

  test("can't create a user without a password", async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: 'Someusername',
        name: 'Somename',
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password must at least 3 chars long')
  })

  test("can't create a user with a short password", async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: 'Someusername',
        name: 'Somename',
        password: 'Ab'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password must at least 3 chars long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
