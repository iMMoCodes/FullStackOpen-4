const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('creation fails with proper statuscode and message if username already taken', async () => {
  const newUser = {
    username: 'user1',
    name: 'test user1',
    password: 's4l4s4n4',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.text).toContain('This username is already in use')
})

test('creation fails if no username or password or they are not atleast 3 characters', async () => {
  const newUserOne = {
    name: 'test userOne',
    password: 's4l4s4n4',
  }

  const newUserTwo = {
    username: 'testuser1',
    name: 'test userTwo',
  }

  const newUserThree = {
    username: 'us',
    name: 'test userThree',
    password: '23',
  }

  const resultOne = await api
    .post('/api/users')
    .send(newUserOne)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const resultTwo = await api
    .post('/api/users')
    .send(newUserTwo)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const resultThree = await api
    .post('/api/users')
    .send(newUserThree)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(resultOne.text).toContain('Please provide username and password')
  expect(resultTwo.text).toContain('Please provide username and password')
  expect(resultThree.text).toContain(
    'Username and password has to be atleast 3 characters'
  )
})
