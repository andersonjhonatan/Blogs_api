const { sign, verify } = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'meusegredo';

const createToken = (item) => sign({ item }, secret, jwtConfig);

const verifyToken = (token) => verify(token, secret);

module.exports = { createToken, verifyToken };
