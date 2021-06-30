const router = require('express').Router();
const UserController = require('../controller/user-controller.js');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - password
 *         - phoneNumber
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: last name
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: password
 *         phoneNumber:
 *           type: string
 *           description: phone number
 */

/**
  * @swagger
  * tags:
  *   name: User Controller
  *   description: This are apis for management of users
  */


/**
 * @swagger
 * /api/v1/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing some required params
 *       500:
 *         description: Server error
 */
router.post('/create', UserController.createUser);

/**
 * @swagger
 * /api/v1/user/all:
 *   get:
 *     summary: Returns the list of all created users
 *     tags: [User Controller]
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
 *         description: Paginated list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/all', UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/user/{uuid}:
 *   get:
 *     summary: Returns a user that matches the uuid
 *     tags: [User Controller]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: id of user
 *         required: true   
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/:uuid', UserController.getUserById);

/**
 * @swagger
 * /api/v1/user/{uuid}:
 *   put:
 *     summary: Updates a user that matches the uuid
 *     tags: [User Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: id of a user
 *         required: true   
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated user object will be returned
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.put('/:uuid', UserController.updateUser);

/**
 * @swagger
 * /api/v1/user/{uuid}:
 *   delete:
 *     summary: Deletes a user
 *     tags: [User Controller]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: id of a user
 *         required: true   
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User was succesfully deleted
 *       404:
 *         description: User not found
 *       400:
 *         description: Missing some required parameters
 */
router.delete('/:uuid', UserController.deleteUser);

module.exports = router;