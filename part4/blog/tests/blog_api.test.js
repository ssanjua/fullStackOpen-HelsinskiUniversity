// tests/blog_api.test.js

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const Blog = require('../models/blog')
const api = supertest(app);

jest.setTimeout(20000);

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author 1',
    url: 'http://example.com/1',
    likes: 1
  },
  {
    title: 'Second blog',
    author: 'Author 2',
    url: 'http://example.com/2',
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).not.toBeDefined();
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author 3',
    url: 'http://example.com/3',
    likes: 3,
    userId: "664dfd2aff75a56b8c6900a7",
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain('New blog');
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Author 4',
    url: 'http://example.com/4',
    likes: 4,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without URL',
    author: 'Author 5',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
})


test('delete a blog by id', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).not.toContain(blogToDelete.title);
})

test('update likes of a blog by id', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];
  const newLikes = blogToUpdate.likes + 1;

  const updatedBlog = {
    likes: newLikes
  };

  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(updatedBlog)
    .expect(200);

  const blogsAtEnd = await Blog.find({});
  const updatedBlogAtEnd = blogsAtEnd.find(blog => blog._id.toString() === blogToUpdate._id.toString());
  expect(updatedBlogAtEnd.likes).toBe(newLikes);
})

afterAll(() => {
  mongoose.connection.close();
})
