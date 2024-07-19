const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  
  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = _.countBy(blogs, 'author');
  const maxAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author]);
  
  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .value();

  const maxLikesAuthor = _.maxBy(authorLikes, 'likes');
  
  return {
    author: maxLikesAuthor.author,
    likes: maxLikesAuthor.likes
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}