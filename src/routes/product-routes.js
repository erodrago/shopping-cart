const router = require('express').Router();
const ProductController = require('../controller/product-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - sku
 *         - quantity
 *         - price
 *         - categoryId
 *         - discountId
 *       properties:
 *         name:
 *           type: string
 *           description: Give product name
 *         description:
 *           type: string
 *           description: the product description
 *         sku:
 *           type: string
 *           description: stock keeping unit
 *         quantity:
 *           type: integer
 *           description: the no of items present
 *         price:
 *           type: integer
 *           description: product price
 *         categoryId: 
 *           type: integer
 *           description: id of category of product
 *         discountId: 
 *           type: integer
 *           description: id of discount to be applied to product
 */

/**
  * @swagger
  * tags:
  *   name: Product Controller
  *   description: This are apis for management of products
  */


/**
 * @swagger
 * /api/v1/product/create:
 *   post:
 *     summary: Create a new Product
 *     tags: [Product Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/create', ProductController.createProduct);

/**
 * @swagger
 * /api/v1/product/all:
 *   get:
 *     summary: Returns the list of all created products
 *     tags: [Product Controller]
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
 *         description: Paginated list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/all', ProductController.getAllProducts);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Returns a product that matches the id
 *     tags: [Product Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of product
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/:id', ProductController.getProductById);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Updates a product that matches the id
 *     tags: [Product Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of a product
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated product object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Product'
 */
router.put('/:id', ProductController.updateProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Deletes a product
 *     tags: [Product Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of a product
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product was succesfully deleted
 *       404:
 *         description: Product not found
 *       400:
 *         description: Missing some required parameters
 */
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;