import { NextFunction, Request, Response, Router } from 'express';
import customerService from '../service/customer.service';
import { CustomerInput } from '../types';

const customerRouter = Router();

customerRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customerService.getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
});

customerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customerService.getCustomerById(Number(req.params.id));
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
});

customerRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = <CustomerInput>req.body;
        const result = await customerService.createCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { customerRouter };
