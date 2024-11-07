// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.cart.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.customer.deleteMany({});
    await prisma.product.deleteMany();

    const tShirt = await prisma.product.create({
        data: {
            name: 'Basic T-Shirt',
            price: 19.99,
            stock: 100,
            category: ['Clothing', 'Tops'],
            description: 'A comfortable, everyday t-shirt available in multiple colors.',
            images: ['https://example.com/images/tshirt1.jpg'],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Red', 'Blue', 'Black'],
        },
    });

    const runningShoes = await prisma.product.create({
        data: {
            name: 'Running Shoes',
            price: 79.99,
            stock: 50,
            category: ['Footwear', 'Sports'],
            description: 'Lightweight and comfortable shoes designed for running.',
            images: ['https://example.com/images/shoes1.jpg'],
            sizes: ['M', 'L', 'XL'],
            colors: ['White', 'Black'],
        },
    });

    const casualHoodie = await prisma.product.create({
        data: {
            name: 'Casual Hoodie',
            price: 39.99,
            stock: 75,
            category: ['Clothing', 'Outerwear'],
            description: 'A cozy hoodie perfect for casual wear.',
            images: ['https://example.com/images/hoodie1.jpg'],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Gray', 'Navy'],
        },
    });

    const classicWatch = await prisma.product.create({
        data: {
            name: 'Classic Watch',
            price: 99.99,
            stock: 30,
            category: ['Accessories', 'Watches'],
            description: 'A classic watch with a sleek design.',
            images: ['https://example.com/images/watch1.jpg'],
            sizes: ['M'],
            colors: ['Black', 'Silver'],
        },
    });

    const denimJeans = await prisma.product.create({
        data: {
            name: 'Denim Jeans',
            price: 49.99,
            stock: 60,
            category: ['Clothing', 'Bottoms'],
            description: 'Classic denim jeans with a comfortable fit.',
            images: ['https://example.com/images/jeans1.jpg'],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Blue', 'Black'],
        },
    });

    const johnDoe = await prisma.customer.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            wishlist: {
                connect: [{ id: tShirt.id }],
            },
        },
    });

    const janeSmith = await prisma.customer.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'password456',
            wishlist: {
                connect: [{ id: runningShoes.id }],
            },
        },
    });

    const aliceJohnson = await prisma.customer.create({
        data: {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            password: 'password789',
            wishlist: {
                connect: [{ id: casualHoodie.id }],
            },
        },
    });

    const tempLogin = await prisma.customer.create({
        data: {
            firstName: 'Temp',
            lastName: 'Login',
            email: 'temp.login@example.com',
            password: 'loginpassword',
            wishlist: {},
        },
    });

    const cartJohn = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: johnDoe.id },
            },
            products: {
                create: [
                    {
                        product: {
                            connect: { id: tShirt.id },
                        },
                        quantity: 2,
                    },
                    {
                        product: {
                            connect: { id: runningShoes.id },
                        },
                        quantity: 1,
                    },
                ],
            },
            // totalAmount: ,
        },
    });

    const cartJaneSmith = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: janeSmith.id },
            },
            products: {
                create: [
                    {
                        product: {
                            connect: { id: tShirt.id },
                        },
                        quantity: 1,
                    },
                    {
                        product: {
                            connect: { id: casualHoodie.id },
                        },
                        quantity: 2,
                    },
                ],
            },
            // totalAmount: ,
        },
    });

    const cartAliceJohnson = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: aliceJohnson.id },
            },
            products: {
                create: [
                    {
                        product: {
                            connect: { id: runningShoes.id },
                        },
                        quantity: 2,
                    },
                    {
                        product: {
                            connect: { id: casualHoodie.id },
                        },
                        quantity: 1,
                    },
                ],
            },
            // totalAmount: ,
        },
    });

    const cartTempLogin = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: tempLogin.id },
            },
            products: {},
            // totalAmount: ,
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
