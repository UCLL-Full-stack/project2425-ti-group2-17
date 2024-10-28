import { NextFunction, Request, Response, Router } from 'express';
import cartService from '../service/cart.service';
import { CartInput } from '../types';
// import cartService from "../service/cart.service";

const cartRouter = Router();

cartRouter.get('', (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = cartService.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart = await cartService.getCartById(Number(req.params.id));
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
