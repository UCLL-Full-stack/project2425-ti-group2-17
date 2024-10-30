/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         date:
 *           type: string
 *           format: date
 *         payment:
 *           $ref: '#/components/schemas/Payment'
 *
 *     OrderInput:
 *         customer:
 *           $ref: '#/components/schemas/CustomerInput'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemInput'
 *         date:
 *           type: string
 *           format: date-time
 *         payment:
 *           $ref: '#/components/schemas/PaymentInput'
 */

import { Router, Request, Response, NextFunction } from 'express';
import orderService from '../service/order.service';

const orderRouter = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: All Orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
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
 *     summary: Get a order by id
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The order id.
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: The order with that id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
 *     summary: Delete a order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the order
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deletion confirmed
 */

orderRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await orderService.deleteOrder(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { orderRouter };
