const express = require('express');
const userControll = require('../controllers/User.controllers');
const validatesUser = require('../middlewares/UserMiddlewares');

const userRouter = express.Router();

userRouter.post('/login', userControll.userController);
userRouter.post('/user', validatesUser, userControll.createUserController);

module.exports = userRouter;
