const express = require('express');
const userControll = require('../controllers/User.controllers');

const userRouter = express.Router();

userRouter.post('/login', userControll.userController);

module.exports = userRouter;
