type Admin = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type Customer = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    recentOrders: Order[];
    wishlist: Product[];
};

type Cart = {
    id: number;
    customer: Customer;
    products: CartItem[];
};

type CartItem = {
    id: number;
    product: Product;
    quantity: number;
};

type Order = {
    id: number;
    customer: Customer;
    items: OrderItem[];
    date: Date;
    payment: Payment;
};

type OrderItem = {
    order: Order;
    product: Product;
    quantity: number;
};

type Payment = {
    id: number;
    amount: number;
    date: Date;
    paymentStatus: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string[];
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
};

type ProductInput = {
    name: string;
    price: number;
    stock: number;
    category: string[];
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
};

export type { Admin, Customer, Cart, CartItem, Order, OrderItem, Payment, Product, ProductInput };
