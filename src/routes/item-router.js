const router = require('express').Router();
const ItemController = require('../controller/item-controller');

router.post('/session/:sessionId/item/add', ItemController.addItemToCart);
router.delete('/session/:sessionId/item/:id/remove/:type', ItemController.removeItemFromCart);
router.get('/session/:sessionId/item/all', ItemController.getAllCartItems);

module.exports = router;