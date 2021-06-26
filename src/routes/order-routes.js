const router = require('express').Router();
const OrderController = require('../controller/order-controller');

router.post('/session/:sessionId/pay', OrderController.postOrderItems);

module.exports = router;