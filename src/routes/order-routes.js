const router = require('express').Router();
const OrderController = require('../controller/order-controller');

router.post('/session/:sessionId/pay', OrderController.postOrderItems);
router.get('/user/:uuid/transactions', OrderController.getUserTransactions);

module.exports = router;