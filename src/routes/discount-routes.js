const router = require('express').Router();
const DiscountController = require('../controller/discount-controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - percentageOff
 *         - active
 *       properties:
 *         name:
 *           type: string
 *           description: Give discount name
 *         description:
 *           type: string
 *           description: the discount description
 *         percentageOff:
 *           type: integer
 *           description: the percentage off on the product
 *         active:
 *           type: boolean
 *           description: If discount should be active
 *       example:
 *         name: BLACK FRIDAY
 *         description: Discount for the whole of november
 *         percentageOff: 20
 *         active: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscountResult:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Give category name
 *         description:
 *           type: string
 *           description: the category description
 *         percentageOff:
 *           type: integer
 *           description: the percentage off on the product
 *         active:
 *           type: boolean
 *           description: If discount should be active
 *         created_at: 
 *           type: string
 *           format: date-time
 *           description: date of object creation
 *         modified_at: 
 *           type: string
 *           format: date-time
 *           description: date of object modification
 */

/**
  * @swagger
  * tags:
  *   name: Discount Controller
  *   description: This are apis for management of discounts
  */


/**
 * @swagger
 * /api/v1/discount/create:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       200:
 *         description: The discount was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountResult'
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/create', DiscountController.createDiscount);


/**
 * @swagger
 * /api/v1/discount/all:
 *   get:
 *     summary: Returns the list of all created discounts
 *     tags: [Discount Controller]
 *     parameters:
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
router.get('/all', DiscountController.getAllDiscounts);

/**
 * @swagger
 * /api/v1/discount/{id}:
 *   get:
 *     summary: Returns a discount that matches the id
 *     tags: [Discount Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of discount
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/DiscountResult'
 */
router.get('/:id', DiscountController.getDiscountById);

/**
 * @swagger
 * /api/v1/discount/{id}:
 *   put:
 *     summary: Updates a discount that matches the id
 *     tags: [Discount Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of a discount
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated discount object
 *       400:
 *         description: Missing some required parameters
 *       404:
 *          description: Discount not found
 */
router.put('/:id', DiscountController.updateDiscount);

/**
 * @swagger
 * /api/v1/discount/{id}:
 *   delete:
 *     summary: Deletes a discount
 *     tags: [Discount Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of a discount
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount was succesfully deleted
 *       404:
 *         description: Discount not found
 *       400:
 *         description: Missing some required parameters
 */
router.delete('/:id', DiscountController.deleteDiscount);

/**
 * @swagger
 * /api/v1/discount/status/switch/{id}:
 *   get:
 *     summary: Switches status of discount
 *     tags: [Discount Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of discount
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount object will be returned
 *       400:
 *         description: bad request 
 *       404: 
 *         description: provided id does not exist
 */
router.get('/status/switch/:id', DiscountController.switchDiscountActiveStatus);

module.exports = router;