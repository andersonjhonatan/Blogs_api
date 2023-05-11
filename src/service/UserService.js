const { User } = require('../models');

const postLogin = (email) => User.findOne({ where: { email } });

const createUser = async (displayName, email, password, image) => {
  const existingUser = await User.findOne({
    where: { displayName, email, password, image },
  });

  if (existingUser) {
    return { status: 409, message: 'User already registered' };
  }
  const result = await User.create({ displayName, email, password, image });

  return result;
};

const getAllUsers = async () => {
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

const getById = async (id) => {
  const userId = parseInt(id, 10); 
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { status: 404, message: 'User does not exist' };
  }

  return user;
};

module.exports = { postLogin, createUser, getAllUsers, getById };
