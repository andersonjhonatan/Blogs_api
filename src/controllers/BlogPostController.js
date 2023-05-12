const BlogPostModel = require('../service/BlogPost');

const createPostController = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const userId = 1;

  const result = await BlogPostModel.createPost(title, content, categoryIds, userId);

  if (result.status === 400) {
    return res.status(400).json({ message: result.message });
  }

  if (authorization) return res.status(201).json(result);
};

module.exports = { createPostController };
