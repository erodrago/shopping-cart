const router = require('express').Router();
const { check } = require('express-validator');

const OrderController = require('../controller/order-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       required:
 *         - totalAmount
 *         - paymentProvider
 *         - status
 *         - params
 *       properties:
 *         totalAmount:
 *           type: integer
 *           description: total amount of products
 *         paymentProvider:
 *           type: string
 *           description: return body from the payment provider
 *         status:
 *           type: boolean
 *           description: approved/failed
 *         params:
 *           type: string
 *           description: return body from the payment provider
 *       example:
 *         totalAmount: 300
 *         paymentProvider: paystack
 *         status: true
 *         params: payment succesful
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetailResult:
 *       type: object
 *       required:
 *         - totalAmount
 *         - orderTime
 *         - user_id
 *         - paymentId
 *       properties:
 *         totalAmount:
 *           type: integer
 *           description: total amount of products
 *         orderTime:
 *           type: string
 *           format: day-time
 *           description: id of product to buy
 *         user_id:
 *           type: integer
 *           description: id of user
 *         payment_id:
 *           type: integer
 *           description: id of payment record
 *       example:
 *         totalAmount: 300
 *         orderTime: 2/3/2021
 *         user_id: 32
 *         paymentId: 10
 */

/**
  * @swagger
  * tags:
  *   name: Order Controller
  *   description: This are apis for management of orders
  */


/**
 * @swagger
 * /api/v1/order/session/{sessionId}/pay:
 *   post:
 *     summary: Pays for order
 *     tags: [Order Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         description: id of current session
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The order was processed succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/OrderDetailResult'
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/session/:sessionId/pay', 
            [
              check('totalAmount', 'Total amount is required').not().isEmpty(),
              check('paymentProvider', 'Payment provider details is required').not().isEmpty(),
              check('status', 'Status of payment is required').not().isEmpty(),
              check('params', 'Dump of payment provider response is required').not().isEmpty(),
              check('sessionId', 'Customer session is required').not().isEmpty()
            ],
            OrderController.postOrderItems);

/**
 * @swagger
 * /api/v1/order/user/{uuid}/transactions:
 *   get:
 *     summary: Gets transaction details of user 
 *     tags: [Order Controller]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: uuid of user
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
 *                 $ref: '#/components/schemas/OrderDetailResult'
 */
router.get('/user/:uuid/transactions', OrderController.getUserTransactions);

module.exports = router;