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

const getAllPost = async (req, res) => {
  const { authorization } = req.headers;

  const result = await BlogPostModel.getAllPost();

  if (authorization) return res.status(200).json(result);
};

const getByIdPostController = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const result = await BlogPostModel.getByIdPost(id);

  if (result.status === 404) return res.status(404).json({ message: result.message });

  if (authorization) return res.status(200).json(result);
};

const putPostController = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = 1;

  const result = await BlogPostModel.alterPostById(id, title, content, userId);

  if (result.status === 401) return res.status(401).json({ message: result.message });

  if (authorization) return res.status(200).json(result);
};

const deletePostIds = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const result = await BlogPostModel.deletePostById(id);

  if (result.status === 404 || result.status === 401) {
    return res.status(result.status).json({ message: result.message });
  }

  if (authorization) {
    return res.status(result.status).end();
  }
};

const getSearchTermController = async (req, res) => {
  const { authorization } = req.headers;
  const { q } = req.query;

  const result = await BlogPostModel.getSearchTermAndBlog(q);

  if (authorization) {
    return res.status(200).json(result);
  }
};

module.exports = {
  createPostController,
  getAllPost,
  getByIdPostController,
  putPostController,
  deletePostIds,
  getSearchTermController,
};
