const express = require('express');
const authenticateToken = require('../middlewares/Token.middlewares');
const categoryController = require('../controllers/CategoriesControllers');

const categoryRouter = express.Router();

categoryRouter.post('/categories', authenticateToken, categoryController.createCategory);

module.exports = categoryRouter;
