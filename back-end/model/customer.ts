/* 
    🚨 THIS IS JUST A STUB FOR TESTING PURPOSES, YOU SHOULD FOLLOW OUR DOMAIN MODEL! 
*/

type CustomerDetails = {
    id?: number;
    name: string;
    email: string;
};

export class Customer {
    private id?: number;
    private name: string;
    private email: string;

    constructor(customer: CustomerDetails) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }
}
