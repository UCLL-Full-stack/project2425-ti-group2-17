// npx prisma migrate dev
// npx prisma generate
// npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const calculateTotalAmount = async (
    items: { productId: number; quantity: number }[],
    prisma: PrismaClient
) => {
    let totalAmount = 0;
    for (const item of items) {
        const product = await prisma.product.findUnique({
            where: { id: item.productId },
        });
        if (product) {
            totalAmount += product.price * item.quantity;
        }
    }
    return totalAmount;
};

const main = async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.discountCode.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.product.deleteMany();

    const tShirt = await prisma.product.create({
        data: {
            name: 'Basic T-Shirt',
            price: 19.99,
            stock: 100,
            categories: ['Clothing', 'Tops'],
            description: 'A comfortable, everyday t-shirt available in multiple colors.',
            images: 'https://example.com/images/tshirt1.jpg',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Red', 'Blue', 'Black'],
        },
    });

    const runningShoes = await prisma.product.create({
        data: {
            name: 'Running Shoes',
            price: 79.99,
            stock: 50,
            categories: ['Footwear', 'Sports'],
            description: 'Lightweight and comfortable shoes designed for running.',
            images: 'https://example.com/images/shoes1.jpg',
            sizes: ['M', 'L', 'XL'],
            colors: ['White', 'Black'],
        },
    });

    const casualHoodie = await prisma.product.create({
        data: {
            name: 'Casual Hoodie',
            price: 39.99,
            stock: 75,
            categories: ['Clothing', 'Outerwear'],
            description: 'A cozy hoodie perfect for casual wear.',
            images: 'https://example.com/images/hoodie1.jpg',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Gray', 'Navy'],
        },
    });

    const classicWatch = await prisma.product.create({
        data: {
            name: 'Classic Watch',
            price: 99.99,
            stock: 30,
            categories: ['Accessories', 'Watches'],
            description: 'A classic watch with a sleek design.',
            images: 'https://example.com/images/watch1.jpg',
            sizes: ['M'],
            colors: ['Black', 'Silver'],
        },
    });

    const denimJeans = await prisma.product.create({
        data: {
            name: 'Denim Jeans',
            price: 49.99,
            stock: 60,
            categories: ['Clothing', 'Bottoms'],
            description: 'Classic denim jeans with a comfortable fit.',
            images: 'https://example.com/images/jeans1.jpg',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Blue', 'Black'],
        },
    });

    const johnDoe = await prisma.customer.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 12),
            role: 'customer',
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
            password: await bcrypt.hash('password456', 12),
            role: 'customer',
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
            password: await bcrypt.hash('password789', 12),
            role: 'customer',
            wishlist: {
                connect: [{ id: casualHoodie.id }],
            },
        },
    });

    const admin = await prisma.customer.create({
        data: {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
            wishlist: {},
        },
    });

    const salesman = await prisma.customer.create({
        data: {
            firstName: 'Salesman',
            lastName: 'User',
            email: 'salesman@example.com',
            password: await bcrypt.hash('salesman123', 12),
            role: 'salesman',
            wishlist: {},
        },
    });

    const tenPercentOff = await prisma.discountCode.create({
        data: {
            code: 'SAVE10P',
            type: 'percentage',
            value: 10,
            expirationDate: new Date('2026-12-30'),
            isActive: true,
        },
    });

    const twentyPercentOff = await prisma.discountCode.create({
        data: {
            code: 'SAVE20P',
            type: 'percentage',
            value: 20,
            expirationDate: new Date('2027-11-29'),
            isActive: true,
        },
    });

    const inactivePercentOff = await prisma.discountCode.create({
        data: {
            code: 'INACTIVEP',
            type: 'percentage',
            value: 20,
            expirationDate: new Date('2028-10-28'),
            isActive: false,
        },
    });

    const thirtyFixedOff = await prisma.discountCode.create({
        data: {
            code: 'SAVE30F',
            type: 'fixed',
            value: 30,
            expirationDate: new Date('2029-9-27'),
            isActive: true,
        },
    });

    const fiftyFixedOff = await prisma.discountCode.create({
        data: {
            code: 'SAVE50F',
            type: 'fixed',
            value: 50,
            expirationDate: new Date('2030-8-26'),
            isActive: true,
        },
    });

    const inactiveFixedOff = await prisma.discountCode.create({
        data: {
            code: 'INACTIVEF',
            type: 'fixed',
            value: 50,
            expirationDate: new Date('2031-7-25'),
            isActive: false,
        },
    });

    const cartJohn = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: johnDoe.id },
            },
            cartItems: {
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
            discountCodes: {
                connect: [{ id: twentyPercentOff.id }, { id: thirtyFixedOff.id }],
            },
            // totalAmount: ,
        },
    });

    const cartJaneSmith = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: janeSmith.id },
            },
            cartItems: {
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
            discountCodes: {
                connect: [{ id: tenPercentOff.id }, { id: thirtyFixedOff.id }],
            },
            // totalAmount: ,
        },
    });

    const cartAliceJohnson = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: aliceJohnson.id },
            },
            cartItems: {
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
            discountCodes: {
                connect: [{ id: thirtyFixedOff.id }, { id: fiftyFixedOff.id }],
            },
            // totalAmount: ,
        },
    });

    const cartAdmin = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: admin.id },
            },
            cartItems: {},
        },
    });

    const cartSalesman = await prisma.cart.create({
        data: {
            customer: {
                connect: { id: salesman.id },
            },
            cartItems: {},
        },
    });

    // const orderJohn = await prisma.order.create({
    //     data: {
    //         customer: {
    //             connect: { id: johnDoe.id },
    //         },
    //         items: {
    //             create: [
    //                 {
    //                     product: {
    //                         connect: { id: tShirt.id },
    //                     },
    //                     quantity: 2,
    //                 },
    //                 {
    //                     product: {
    //                         connect: { id: runningShoes.id },
    //                     },
    //                     quantity: 1,
    //                 },
    //             ],
    //         },
    //         date: new Date(),
    //         payment: {
    //             create: {
    //                 amount: 2 * 19.99 + 1 * 79.99,
    //                 date: new Date(),
    //                 paymentStatus: 'unpaid',
    //             },
    //         },
    //     },
    // });

    // const orderAlice = await prisma.order.create({
    //     data: {
    //         customer: {
    //             connect: { id: aliceJohnson.id },
    //         },
    //         items: {
    //             create: [
    //                 {
    //                     product: {
    //                         connect: { id: denimJeans.id },
    //                     },
    //                     quantity: 3,
    //                 },
    //                 {
    //                     product: {
    //                         connect: { id: runningShoes.id },
    //                     },
    //                     quantity: 1,
    //                 },
    //             ],
    //         },
    //         date: new Date(),
    //         payment: {
    //             create: {
    //                 amount: 3 * 49.99 + 1 * 79.99,
    //                 date: new Date(),
    //                 paymentStatus: 'unpaid',
    //             },
    //         },
    //     },
    // });
    const johnOrderItems = [
        { productId: tShirt.id, quantity: 2 },
        { productId: runningShoes.id, quantity: 1 },
    ];

    // Calculate total for John's order
    const johnTotalAmount = await calculateTotalAmount(johnOrderItems, prisma);

    const orderJohn = await prisma.order.create({
        data: {
            customer: {
                connect: { id: johnDoe.id },
            },
            items: {
                create: johnOrderItems.map((item) => ({
                    product: {
                        connect: { id: item.productId },
                    },
                    quantity: item.quantity,
                })),
            },
            date: new Date(),
            payment: {
                create: {
                    amount: johnTotalAmount,
                    date: new Date(),
                    paymentStatus: 'unpaid',
                },
            },
        },
    });

    // Order items for Alice
    const aliceOrderItems = [
        { productId: denimJeans.id, quantity: 3 },
        { productId: runningShoes.id, quantity: 1 },
    ];

    // Calculate total for Alice's order
    const aliceTotalAmount = await calculateTotalAmount(aliceOrderItems, prisma);

    const orderAlice = await prisma.order.create({
        data: {
            customer: {
                connect: { id: aliceJohnson.id },
            },
            items: {
                create: aliceOrderItems.map((item) => ({
                    product: {
                        connect: { id: item.productId },
                    },
                    quantity: item.quantity,
                })),
            },
            date: new Date(),
            payment: {
                create: {
                    amount: aliceTotalAmount,
                    date: new Date(),
                    paymentStatus: 'unpaid',
                },
            },
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
