type Role = 'admin' | 'salesman' | 'customer';

type Admin = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type Customer = {
    id?: number;
    firstName?: string;
    lastName?: string;
    fullname?: string;
    email?: string;
    password?: string;
    wishlist?: Product[];
    role?: Role;
};

type Cart = {
    id?: number;
    customer: Customer;
    products: CartItem[];
    totalAmount: number;
};

type CartItem = {
    id?: number;
    product: Product;
    quantity: number;
};

type Order = {
    id?: number;
    customer: Customer;
    items: OrderItem[];
    date: Date;
    payment: Payment;
};

type OrderItem = {
    id?: number;
    order: Order;
    product: Product;
    quantity: number;
};

type Payment = {
    id?: number;
    amount: number;
    date: Date;
    paymentStatus: string;
};

type Product = {
    id?: number;
    name: string;
    price: number;
    stock: number;
    categories: string[];
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
};

type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};

export type { Admin, Customer, Cart, CartItem, Order, OrderItem, Payment, Product, StatusMessage };
