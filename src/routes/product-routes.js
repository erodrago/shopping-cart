const router = require('express').Router();
const ProductController = require('../controller/product-controller');

router.post('/create', ProductController.createProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;