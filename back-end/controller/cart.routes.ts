import { NextFunction, Request, Response, Router } from 'express';
// import cartService from "../service/cart.service";

const cartRouter = Router();

cartRouter.get('/carts', (req: Request, res: Response, next: NextFunction) => {
    try {
        // const carts = cartService.getCarts();
        // res.status(200).json(carts);
        res.status(200);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(400).json({ status: 'error', errorMessage: error });
        }
    }
});

export { cartRouter };
