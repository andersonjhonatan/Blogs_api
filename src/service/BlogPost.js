const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../models');

const getExistingCategories = async (categoryIds) =>
  Category.findAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });

const createPost = async (title, content, categoryIds, userId) => {
  const existingCategories = await getExistingCategories(categoryIds);

  if (existingCategories.length !== categoryIds.length) {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }
  const updated = new Date();
  const published = new Date();

  const newPost = await BlogPost.create({ title, content, userId, updated, published });

  await Promise.all(
    existingCategories.map(({ id }) => PostCategory.create({ postId: newPost.id, categoryId: id })),
  );

  return {
    id: newPost.id,
    title: newPost.title,
    content: newPost.content,
    userId: newPost.userId,
    updated: newPost.updated,
    published: newPost.published,
  };
};

module.exports = { createPost };
