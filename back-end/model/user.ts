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
        this.validate(user);
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

    validate(user: { firstName: string; lastName: string; email: string; password: string }) {
        if (!user.firstName) throw new Error("The user's first name is required.");

        if (!user.lastName) throw new Error("The user's last name is required.");

        if (!user.email) throw new Error("The user's email is required.");

        if (!user.password) throw new Error("The user's password is required.");
    }
}
