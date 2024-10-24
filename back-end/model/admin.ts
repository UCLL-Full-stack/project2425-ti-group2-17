import { User } from './user';

export class Admin extends User {
    constructor(admin: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id?: number;
    }) {
        super(admin);
    }
}
