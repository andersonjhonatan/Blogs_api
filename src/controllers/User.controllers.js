const jwt = require('jsonwebtoken');
const userService = require('../service/UserService');

const userController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.postLogin(email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const payload = { email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  res.status(200).json({ token });
};

const createUserController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const result = await userService.createUser(displayName, email, password, image);

  if (result.status === 409) {
    return res.status(409).json({ message: result.message });
  }

  const payload = { email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  res.status(201).json({ token });
};

module.exports = { userController, createUserController };
