const { Category } = require('../models');

const postCategories = (name) => {
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }

  const result = Category.create({ name });

  return result;
};

module.exports = { postCategories };
