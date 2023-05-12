const express = require('express');
const authenticateToken = require('../middlewares/Token.middlewares');
const categoryController = require('../controllers/CategoriesControllers');

const categoryRouter = express.Router();

categoryRouter.post('/categories', authenticateToken, categoryController.createCategory);
categoryRouter.get('/categories', authenticateToken, categoryController.getAllCategories);

module.exports = categoryRouter;
