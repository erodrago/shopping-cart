const router = require('express').Router();
const ItemController = require('../controller/item-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - quantity
 *         - amount
 *       properties:
 *         quantity:
 *           type: integer
 *           description: No of items to add to cart
 *         product_id:
 *           type: integer
 *           description: id of product to buy
 *       example:
 *         quantity: 3
 *         amount: 500
 */

/**
  * @swagger
  * tags:
  *   name: Cart Items Controller
  *   description: This are apis for management of cart items
  */


/**
 * @swagger
 * /api/v1/cart/session/{sessionId}/item/add:
 *   post:
 *     summary: Adds item to cart
 *     tags: [Cart Items Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         description: id of current session
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The item was successfully added to cart
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/session/:sessionId/item/add', ItemController.addItemToCart);

/**
 * @swagger
 * /api/v1/cart/session/{sessionId}/item/{id}/remove/{type}:
 *   delete:
 *     summary: Removes an item from cart
 *     tags: [Cart Items Controller]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         description: id of current session
 *         required: true   
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         description: id of item to remove
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: type
 *         description: type can be either one to remove an item or all to remove all
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item was succesfully removed
 *       404:
 *         description: Item not found
 *       400:
 *         description: Missing some required parameters
 */
router.delete('/session/:sessionId/item/:id/remove/:type', ItemController.removeItemFromCart);

/**
 * @swagger
 * /api/v1/cart/session/{sessionId}/item/all:
 *   get:
 *     summary: Gets all items in cart
 *     tags: [Cart Items Controller]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         description: id of session
 *         required: true
 *       - in: query
 *         name: page
 *         description: no of pages to retrieve
 *         required: true   
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         required: true
 *         description: size of records per page
 *         schema: 
 *           type: integer  
 *     responses:
 *       200:
 *         description: Paginated list of all discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountResult'
 */
router.get('/session/:sessionId/item/all', ItemController.getAllCartItems);

module.exports = router;