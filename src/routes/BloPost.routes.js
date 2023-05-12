const express = require('express');
const authenticateToken = require('../middlewares/Token.middlewares');
const blogModelController = require('../controllers/BlogPostController');
const { validateBlogPost, validatePutPost } = require('../middlewares/BlogMiddlewares');

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
BlogPostRouter.get(
  '/post/:id',
  authenticateToken,
  blogModelController.getByIdPostController,
);
BlogPostRouter.put(
  '/post/:id',
  authenticateToken,
  validatePutPost,
  blogModelController.putPostController,
);

module.exports = BlogPostRouter;
