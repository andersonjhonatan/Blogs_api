const validateBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validatePutPost = (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!id || !title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = { validateBlogPost, validatePutPost };