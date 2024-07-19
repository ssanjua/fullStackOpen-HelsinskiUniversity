const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const initialBlogs = [
  {
    title: "Lorem ipsum dolor sit amet",
    author: "John Doe",
    url: "https://example.com/blog/1",
    likes: 5,
  },
  {
    title: "Consectetur adipiscing elit",
    author: "Jane Smith",
    url: "https://example.com/blog/2",
    likes: 10,
  },
  {
    title: "Sed do eiusmod tempor incididunt",
    author: "Bob Johnson",
    url: "https://example.com/blog/3",
    likes: 2,
  },
  {
    title: "Ut labore et dolore magna aliqua",
    author: "Alice Williams",
    url: "https://example.com/blog/4",
    likes: 7,
  },
  {
    title: "Duis aute irure dolor in reprehenderit",
    author: "David Brown",
    url: "https://example.com/blog/5",
    likes: 3,
  },
  {
    title: "Excepteur sint occaecat cupidatat non proident",
    author: "Emily Davis",
    url: "https://example.com/blog/6",
    likes: 1,
  },
  {
    title: "Sunt in culpa qui officia deserunt mollit",
    author: "Michael Wilson",
    url: "https://example.com/blog/7",
    likes: 8,
  },
  {
    title: "Anim id est laborum",
    author: "Sarah Thompson",
    url: "https://example.com/blog/8",
    likes: 6,
  },
  {
    title: "Lorem ipsum dolor sit amet",
    author: "Jessica Anderson",
    url: "https://example.com/blog/9",
    likes: 4,
  },
  {
    title: "Nisi ut aliquip ex ea commodo consequat",
    author: "Christopher Taylor",
    url: "https://example.com/blog/10",
    likes: 9,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const InsertTestBlogs = async () => {
  const id = await getTestUserId();
  const initialBlogsArr = initialBlogs.map((e) => ({ ...e, user: id }));
  await Blog.insertMany(initialBlogsArr);
  return id;
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Lorem ipsum",
    author: "John Doe",
    url: "https://example.com/blog/1",
    likes: 5,
  });
  const res = await blog.save();
  const id = res.id;
  await Blog.findByIdAndRemove(id);
  return id;
};

async function getTestUserId() {
  const testuser = await User.findOne({ username: "testuser" });
  if (!testuser) {
    const user = new User({
      username: "testuser",
      name: "test",
      password: "qwerty",
    });
    const result = await user.save();
    return result.id;
  }
  return testuser.id;
}

async function getJwtTokken(id) {
  const userobj = await User.findById(id);
  if (userobj) {
    const tokenPayload = {
      username: userobj.username,
      id: userobj.id,
    };
    return jwt.sign(tokenPayload, SECRET, { expiresIn: 60 * 60 });
  }
}

module.exports = {
  usersInDb,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  InsertTestBlogs,
  getJwtTokken,
};
