const { User } = require('../models');

const postLogin = (email) => User.findOne({ where: { email } });

const createUser = async (displayName, email, password, image) => {
  const existingUser = await User.findOne({ where: { displayName, email, password, image } });

  if (existingUser) {
    return { status: 409, message: 'User already registered' };
  }
  const result = await User.create({ displayName, email, password, image });

  return result;
};

module.exports = { postLogin, createUser };
