/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         quantity:
 *           type: integer
 *           description: Quantity of the product in the cart
 *
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *
 *     CartInput:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 */

import { NextFunction, Request, Response, Router } from 'express';
import cartService from '../service/cart.service';
import { CartInput, CartItemInput } from '../types';

const cartRouter = Router();

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve a list of carts
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: A list of carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Internal server error
 */

cartRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = cartService.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the cart to retrieve
 *     responses:
 *       200:
 *         description: Cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

cartRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart = await cartService.getCartById(Number(req.params.id));
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /carts/items/{cartId}/{productId}/{quantity}:
 *   put:
 *     summary: Add an item to the cart or increase it's quantity
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the cart
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the product
 *       - in: path
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quantity of the product to add to the cart
 *     responses:
 *       200:
 *         description: Cart item successfully added or updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 */

cartRouter.put(
    '/items/:cartId/:productId/:quantity',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = Number(req.params.cartId);
            const productId = Number(req.params.productId);
            const quantity = Number(req.params.quantity);
            const result = await cartService.addCartItem(cartId, productId, quantity);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

export { cartRouter };
