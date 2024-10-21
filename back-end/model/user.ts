import { Order } from './order';

export abstract class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id?: number;
    }) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
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
}
