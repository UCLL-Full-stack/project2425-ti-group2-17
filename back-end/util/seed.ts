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
