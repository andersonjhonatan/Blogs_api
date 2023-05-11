const { User } = require('../models');

const postLogin = (email) => User.findOne({ where: { email } });

module.exports = { postLogin };
