import { Order } from './order';
import { Product } from './product';
import { User } from './user';
import {
    Order as OrderPrisma,
    Product as ProductPrisma,
    Customer as CustomerPrisma,
} from '@prisma/client';

export class Customer extends User {
    private wishlist: Product[];
    private orders: Order[];

    constructor(customer: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        wishlist: Product[];
        orders?: Order[];
        id?: number;
    }) {
        super(customer);
        this.wishlist = customer.wishlist;
        this.orders = customer.orders || [];
    }

    getWishlist(): Product[] {
        return this.wishlist;
    }

    getOrders(): Order[] {
        return this.orders;
    }

    addProductToWishlist(product: Product) {
        if (this.wishlist.includes(product)) {
            throw new Error('Product is already in the wishlist.');
        }

        this.wishlist.push(product);
        return product;
    }

    removeProductFromWishlist(product: Product) {
        const productIndex = this.wishlist.indexOf(product);

        if (productIndex === -1) {
            throw new Error('Product is not in the wishlist.');
        }

        this.wishlist = this.wishlist.filter((item) => item !== product);
        return 'Product removed from wishlist.';
    }

    static from({
        id,
        firstName,
        lastName,
        email,
        password,
        wishlist,
        orders,
    }: CustomerPrisma & { wishlist: ProductPrisma[]; orders: Order[] }) {
        return new Customer({
            id,
            firstName,
            lastName,
            email,
            password,
            wishlist: wishlist.map((product: ProductPrisma) => Product.from(product)),
            orders: orders.map((order: OrderPrisma) => Order.from(order)),
        });
    }

    static fromWithoutWishlist({ id, firstName, lastName, email, password }: CustomerPrisma) {
        return new Customer({
            id,
            firstName,
            lastName,
            email,
            password,
            wishlist: [],
            orders: [],
        });
    }
}
