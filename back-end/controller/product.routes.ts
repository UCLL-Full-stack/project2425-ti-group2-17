/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 *           format: int32
 *         category:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *         images:
 *           type: string
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: array
 *           items:
 *             type: integer
 *             format: int64
 *
 *     ProductInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 *           format: int32
 *         category:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *         images:
 *           type: string
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: array
 *           items:
 *             type: integer
 *             format: int64
 */

import { NextFunction, Request, Response, Router } from 'express';
import { ProductInput } from '../types';
import productService from '../service/product.service';

const productRouter = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = <ProductInput>req.body;
        const result = await productService.createProduct(product);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/search:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Search for products by a query string
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Query string to search products by name, category, etc.
 *     responses:
 *       200:
 *         description: A list of products matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Internal server error
 */

productRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.query as { query: string };
        const result = await productService.getProductsBySearch(query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await productService.getProductById(Number(req.params.id));
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.id);
        const productData = <ProductInput>req.body;
        const result = await productService.updateProduct(productId, productData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to delete
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await productService.deleteProduct(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}/rating:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Add a rating to a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to rate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating value between 1 and 5
 *     responses:
 *       200:
 *         description: Rating added successfully
 *       400:
 *         description: Invalid rating value
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.post('/:id/rating', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.id);
        const { rating } = req.body;
        const result = await productService.addRatingToProduct(productId, rating);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
