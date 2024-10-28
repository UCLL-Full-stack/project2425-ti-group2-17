/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         recentOrders:
 *           type: array
 *
 *     CustomerInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           default: name@email.be
 *         password:
 *           type: string
 *           default: password
 */

import { NextFunction, Request, Response, Router } from 'express';
import customerService from '../service/customer.service';
import { CustomerInput } from '../types';

const customerRouter = Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get  all customers
 *     responses:
 *       200:
 *         description: All customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

customerRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customerService.getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by id
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The customer id.
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: The customer with that id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

customerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customerService.getCustomerById(Number(req.params.id));
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: The new customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

customerRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = <CustomerInput>req.body;
        const result = await customerService.createCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update an existing customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the customer
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: The updated customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

customerRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = <CustomerInput>req.body;
        const result = await customerService.updateCustomer(Number(req.params.id), customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deletion confirmed
 */

customerRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await customerService.deleteCustomer(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { customerRouter };
