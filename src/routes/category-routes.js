const router = require('express').Router();
const CategoryController = require('../controller/category-controller.js');

router.post('/create', CategoryController.createCategory);
router.get('/all', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;