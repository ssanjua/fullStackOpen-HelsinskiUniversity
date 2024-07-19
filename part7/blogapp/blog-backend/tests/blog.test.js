const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Blog post 1",
      author: "Author 1",
      url: "http://example.com/1",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Blog post 2",
      author: "Author 2",
      url: "http://example.com/2",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Blog post 3",
      author: "Author 3",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
  ];

  const emptyList = [];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blogs, equals the sum of likes", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(22);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Blog post 1",
      author: "Author 1",
      url: "http://example.com/1",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Blog post 2",
      author: "Author 2",
      url: "http://example.com/2",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Blog post 3",
      author: "Author 3",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
  ];

  const emptyList = [];

  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog(emptyList);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has multiple blogs, equals the one with most likes", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual({
      title: "Blog post 3",
      author: "Author 3",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Blog post 1",
      author: "Author 1",
      url: "http://example.com/1",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Blog post 2",
      author: "Author 2",
      url: "http://example.com/2",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Blog post 3",
      author: "Author 2",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f4",
      title: "Blog post 4",
      author: "Author 3",
      url: "http://example.com/4",
      likes: 8,
      __v: 0,
    },
  ];

  const emptyList = [];

  test("of empty list is null", () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals that blog author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when list has multiple blogs, equals the author with most blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Author 2",
      blogs: 2,
    });
  });
});

describe("most likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Blog post 1",
      author: "Author 1",
      url: "http://example.com/1",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Blog post 2",
      author: "Author 2",
      url: "http://example.com/2",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Blog post 3",
      author: "Author 2",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f4",
      title: "Blog post 4",
      author: "Author 3",
      url: "http://example.com/4",
      likes: 8,
      __v: 0,
    },
  ];

  const emptyList = [];

  test("of empty list is null", () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals that blog author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has multiple blogs, equals the author with most likes", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Author 2",
      likes: 15,
    });
  });
});
