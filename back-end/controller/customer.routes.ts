import { NextFunction, Request, Response, Router } from 'express';
import customerService from '../service/customer.service';

const customerRouter = Router();

customerRouter.get('/customers', (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = customerService.getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(400).json({ status: 'error', errorMessage: error });
        }
    }
});

export { customerRouter };
