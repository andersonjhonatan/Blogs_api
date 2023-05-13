const express = require('express');
const userControll = require('../controllers/User.controllers');
const validatesUser = require('../middlewares/UserMiddlewares');
const authenticateToken = require('../middlewares/Token.middlewares');

const userRouter = express.Router();

userRouter.post('/login', userControll.userController);
userRouter.post('/user', validatesUser, userControll.createUserController);
userRouter.get('/user', authenticateToken, userControll.getUserController);
userRouter.get('/user/:id', authenticateToken, userControll.getByIdController);
userRouter.delete('/user/me', authenticateToken, userControll.deleteUser);

module.exports = userRouter;
