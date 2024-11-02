type AdminInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type CustomerInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    recentOrders?: OrderInput[];
    wishlist?: ProductInput[];
};

type CartInput = {
    id?: number;
    customer: CustomerInput;
    products: CartItemInput[];
    totalAmount: number;
};

type CartItemInput = {
    id?: number;
    product: ProductInput;
    quantity: number;
};

type OrderInput = {
    id?: number;
    customer: CustomerInput;
    items: OrderItemInput[];
    date: Date;
    payment: PaymentInput;
};

type OrderItemInput = {
    order: OrderInput;
    product: ProductInput;
    quantity: number;
};

type PaymentInput = {
    id?: number;
    amount: number;
    date: Date;
    paymentStatus: string;
};

type ProductInput = {
    id?: number;
    name: string;
    price: number;
    stock: number;
    category: string[];
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
};

export {
    AdminInput,
    CustomerInput,
    CartInput,
    CartItemInput,
    OrderInput,
    OrderItemInput,
    PaymentInput,
    ProductInput,
};
