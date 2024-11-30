import { Role } from '../types';
import { User } from './user';

export class Admin extends User {
    constructor(admin: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        id?: number;
    }) {
        super(admin);
    }
}
