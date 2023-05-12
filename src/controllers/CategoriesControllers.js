const categoryModel = require('../service/Categories');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const result = await categoryModel.postCategories(name);

  if (result.status === 400) {
    return res.status(400).json({ message: result.message });
  }

  return res.status(201).json(result);
};

const getAllCategories = async (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const result = await categoryModel.getAllCategories();
    return res.status(200).json(result);
  }
};

module.exports = { createCategory, getAllCategories };
