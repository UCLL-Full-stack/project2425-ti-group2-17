type Role = 'admin' | 'salesman' | 'customer';

type AdminInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
};

type CustomerInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
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
    categories: string[];
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: string;
};

export {
    Role,
    AdminInput,
    CustomerInput,
    CartInput,
    CartItemInput,
    OrderInput,
    OrderItemInput,
    PaymentInput,
    ProductInput,
    AuthenticationResponse,
};
