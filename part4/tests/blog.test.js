const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier of blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Title from test',
      author: 'Author from test',
      url: 'https://google.com',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('Title from test');
  });

  test('likes set to 0 if missing from the request', async () => {
    const newBlog = {
      title: 'Title from test',
      author: 'Author from test',
      url: 'https://google.com',
    };

    await api.post('/api/blogs').send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.pop().likes).toEqual(0);
  });

  test("doesn't create a blog if title and url are missing", async () => {
    const newBlog = {
      url: 'https://google.com',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
