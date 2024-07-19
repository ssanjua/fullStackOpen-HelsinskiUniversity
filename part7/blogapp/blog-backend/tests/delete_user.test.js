const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("when there is initially one user and one blog in db", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET);

    const blog = new Blog({
      title: "Test Blog",
      author: "Test Author",
      url: "http://test.com",
      user: savedUser._id,
    });

    await blog.save();
  });

  test("succeeds with status 204 if the user is the creator", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status 403 if the user is not the creator", async () => {
    const newUser = new User({
      username: "anotheruser",
      passwordHash: await bcrypt.hash("anothersecret", 10),
    });

    await newUser.save();

    const userForToken = {
      username: newUser.username,
      id: newUser._id,
    };

    const newToken = jwt.sign(userForToken, process.env.SECRET);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${newToken}`)
      .expect(403);

    expect(result.body.error).toContain("only the creator can delete the blog");

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("fails with status 401 if no token is provided", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});
