import { Order } from './order';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private isAdmin: boolean;
    private recentOrders: Order[];

    constructor(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        isAdmin: boolean;
        recentOrders: Order[];
        id?: number;
    }) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
        this.recentOrders = user.recentOrders;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    getRecentOrders(): Order[] {
        return this.recentOrders;
    }
}
