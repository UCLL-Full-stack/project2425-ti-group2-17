/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         recentOrders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         wishlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductInput'
 *
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         amount:
 *           type: number
 *           format: float
 *         date:
 *           type: string
 *           format: date-time
 *         paymentStatus:
 *           type: string
 *           example: "Completed"
 *
 *     OrderItemInput:
 *       type: object
 *       properties:
 *         order:
 *           $ref: '#/components/schemas/Order'
 *         product:
 *           $ref: '#/components/schemas/ProductInput'
 *         quantity:
 *           type: integer
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemInput'
 *         date:
 *           type: string
 *           format: date-time
 *         payment:
 *           $ref: '#/components/schemas/Payment'
 *         totalAmount:
 *           type: number
 *           format: float
 *
 *     OrderInput:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemInput'
 *         date:
 *           type: string
 *           format: date-time
 *         payment:
 *           $ref: '#/components/schemas/Payment'
 */

import { Router, Request, Response, NextFunction } from 'express';
import orderService from '../service/order.service';
import { OrderInput, OrderItemInput } from '../types';

const orderRouter = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */

orderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

orderRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrderById(Number(req.params.id));

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to delete
 *     responses:
 *       200:
 *         description: Order successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

orderRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await orderService.deleteOrder(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

orderRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = <OrderInput>req.body;
        const result = await orderService.createOrder(order);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { orderRouter };
