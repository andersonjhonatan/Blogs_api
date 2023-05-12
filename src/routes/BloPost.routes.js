const express = require('express');
const authenticateToken = require('../middlewares/Token.middlewares');
const blogModelController = require('../controllers/BlogPostController');
const validateBlogPost = require('../middlewares/BlogMiddlewares');

const BlogPostRouter = express.Router();

BlogPostRouter.post(
  '/post',
  authenticateToken,
  validateBlogPost,
  blogModelController.createPostController,
);
BlogPostRouter.get(
  '/post',
  authenticateToken,
  blogModelController.getAllPost,
);

module.exports = BlogPostRouter;
