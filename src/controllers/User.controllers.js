const userService = require('../service/UserService');
const { createToken } = require('../auth/authFunction');

const userController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.postLogin(email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = createToken(email);

  res.status(200).json({ token });
};

const createUserController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const result = await userService.createUser(displayName, email, password, image);

  if (result.status === 409) {
    return res.status(409).json({ message: result.message });
  }

  const token = createToken(email);

  res.status(201).json({ token });
};

const getUserController = async (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  }
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const result = await userService.getById(id);

  if (result.status === 404) {
    return res.status(404).json({ message: result.message });
  }
  
  if (authorization) {
    res.status(200).json(result);
  }
};

module.exports = {
  userController,
  createUserController,
  getUserController,
  getByIdController,
};
