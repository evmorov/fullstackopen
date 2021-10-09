const _ = require('lodash');

const dummy = (blogs) => {
  return blogs.length + 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, { title, author, likes }) => {
    return favorite.likes > likes ? favorite : { title, author, likes };
  });
};

const mostBlogs = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .entries()
    .map(([author, blogsByAuthor]) => ({ author: author, blogs: blogsByAuthor.length }))
    .maxBy('blogs');
};

const mostLikes = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .entries()
    .map(([author, blogsByAuthor]) => ({ author: author, likes: _.sumBy(blogsByAuthor, 'likes') }))
    .maxBy('likes');
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  dummy,
};
