const router = require('express').Router();
const CategoryController = require('../controller/category-controller.js');
const Category = require('../database/models/category.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Give category name
 *         description:
 *           type: string
 *           description: the category description
 *       example:
 *         name: ELECTRONICS,
 *         description: This category handles electronic products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryResult:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Give category name
 *         description:
 *           type: string
 *           description: the category description
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
  *   name: Category
  *   description: THis are apis for management of categories
  */


/**
 * @swagger
 * /api/v1/category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResult'
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/create', CategoryController.createCategory);

/**
 * @swagger
 * /api/v1/category/all:
 *   get:
 *     summary: Returns the list of all created categories
 *     tags: [Category]
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
 *         description: Paginated list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResult'
 */
router.get('/all', CategoryController.getAllCategories);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Returns a category that matches the id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of category
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CategoryResult'
 */
router.get('/:id', CategoryController.getCategoryById);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Updates a category that matches the id
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of a category
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated category object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CategoryResult'
 */
router.put('/:id', CategoryController.updateCategory);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Deletes a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: no of pages to retrieve
 *         required: true   
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category was succesfully deleted
 *       404:
 *         description: Category not found
 *       400:
 *         description: Missing some required parameters
 */
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;