const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

var token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    await new User(user).save()
  }

  const user = helper.initialUsers[0]

  const login = {
    username: user.username,
    password: 'Password',
  }

  const response = await api.post('/api/login').send(login).expect(200)
  token = response.body.token
})

const validBlog = {
  title: 'Title from test',
  author: 'Author from test',
  url: 'https://google.com',
  likes: 5,
}

describe('#index', () => {
  beforeEach(async () => {
    for (let blog of helper.initialBlogs) {
      await new Blog(blog).save()
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('#create', () => {
  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(validBlog).expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('Title from test')
  })

  test('likes set to 0 if missing from the request', async () => {
    const newBlog = {
      title: 'Title from test',
      author: 'Author from test',
      url: 'https://google.com',
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.pop().likes).toEqual(0)
  })

  test("doesn't create a blog if title and url are missing", async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      url: 'https://google.com',
      likes: 5,
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test("doesn't create a blog if authorization token is incorrect", async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer incorrect')
      .send(validBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test("doesn't create a blog if authorization token is missed", async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api.post('/api/blogs').send(validBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('#update', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(validBlog).expect(201)
  })

  test('success if the owner of the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const likesAtStart = blogToUpdate.likes

    const updatedBlog = {
      likes: 100,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd[0]

    expect(blogUpdated.likes).not.toEqual(likesAtStart)
  })
})

describe('#destroy', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(validBlog).expect(201)
  })

  test('success if the owner of the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map((r) => r.content)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails if not the owner of the blog', async () => {
    const anotherUser = helper.initialUsers[1]

    const login = { username: anotherUser.username, password: 'Password' }

    const response = await api.post('/api/login').send(login).expect(200)
    const anotherToken = response.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${anotherToken}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
