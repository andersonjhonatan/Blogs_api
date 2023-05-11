const categoryModel = require('../service/Categories');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const result = await categoryModel.postCategories(name);

  if (result.status === 400) {
    return res.status(400).json({ message: result.message });
  }

  return res.status(201).json(result);
};

module.exports = { createCategory };
