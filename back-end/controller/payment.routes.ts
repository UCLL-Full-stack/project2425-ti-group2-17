/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         amount:
 *           type: number
 *           format: float
 *         date:
 *           type: string
 *           format: date-time
 *         paymentStatus:
 *           type: string
 *           enum: [paid, unpaid]
 *
 *     PaymentInput:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *         date:
 *           type: string
 *           format: date-time
 *         paymentStatus:
 *           type: string
 *           enum: [paid, unpaid]
 */

// import { Router, Request, Response, NextFunction } from 'express';
// import paymentService from '../service/payment.service';
// import { PaymentInput } from '../types';

// const paymentRouter = Router();

// /**
//  * @swagger
//  * /payments:
//  *   put:
//  *     summary: Create a new payment for an order
//  *     tags: [Payments]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PaymentInput'
//  *     responses:
//  *       200:
//  *         description: Payment successfully processed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Payment'
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */

// paymentRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { orderId, amount } = req.body;
//         const paymentInput: PaymentInput = {
//             amount,
//             date: new Date(),
//             paymentStatus: 'paid',
//         };
//         const payment = await paymentService.makePayment(orderId, paymentInput);
//         res.status(200).json(payment);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /payments:
//  *   get:
//  *     summary: Retrieve a list of all payments
//  *     tags: [Payments]
//  *     responses:
//  *       200:
//  *         description: List of payments
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Payment'
//  *       500:
//  *         description: Internal server error
//  */

// paymentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const payments = await paymentService.getPayments();
//         res.status(200).json(payments);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /payments/{id}:
//  *   get:
//  *     summary: Get payment details by ID
//  *     tags: [Payments]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Numeric ID of the payment to retrieve
//  *     responses:
//  *       200:
//  *         description: Payment details
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Payment'
//  *       404:
//  *         description: Payment not found
//  *       500:
//  *         description: Internal server error
//  */

// paymentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const order = await paymentService.getPaymentById(Number(req.params.id));
//         res.status(200).json(order);
//     } catch (error) {
//         next(error);
//     }
// });

// export { paymentRouter };
