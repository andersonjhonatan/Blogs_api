const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

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

const getAllPost = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, 
        as: 'categories' },
    ],
    attributes: { exclude: ['user_id'] },
  });
  return result;
};

const getByIdPost = async (userId) => {
  const post = await BlogPost.findByPk(userId, {
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, 
        as: 'categories' },
    ],
    attributes: { exclude: ['user_id'] },
  });

  if (!post) return { status: 404, message: 'Post does not exist' };

  return post;
};
const alterPostById = async (id, title, content) => {
const existingUserId = await User.findByPk(id);

if (existingUserId === null) return { status: 401, message: 'Unauthorized user' };

  if (await BlogPost.update({ title, content }, { where: { id } }) <= 0) {
    return { status: 401, message: 'Unauthorized user' };
  } 
  
  const user = await BlogPost.findByPk(id, {
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, 
        as: 'categories' },
      ],
      attributes: { exclude: ['user_id'] },
    });
  return user;
};

module.exports = { createPost, getAllPost, getByIdPost, alterPostById };
