const router = require('express').Router();
const DiscountController = require('../controller/discount-controller.js');

router.post('/create', DiscountController.createDiscount);
router.get('/all', DiscountController.getAllDiscounts);
router.get('/:id', DiscountController.getDiscountById);
router.put('/:id', DiscountController.updateDiscount);
router.delete('/:id', DiscountController.deleteDiscount);
router.get('/discount/status/switch/:id', DiscountController.switchDiscountActiveStatus);

module.exports = router;