import { Customer } from '../model/customer';
import customerDB from '../repository/customer.db';

const getCustomers = (): Customer[] => customerDB.getCustomers();

const getCustomerById = (id: number): Customer => {
    const customer = customerDB.getCustomerById({ id });
    if (!customer) throw new Error(`Customer with id ${id} does not exist.`);
    return customer;
};

// const createCustomer = ({
//     start,
//     end,
//     course: courseInput,
//     lecturer: lecturerInput,
// }: CustomerInput): Customer => {
//     if (!courseInput.id) throw new Error('Course id is required');
//     if (!lecturerInput.id) throw new Error('Lecturer id is required');

//     if (!start || !end) {
//         throw new Error('Start and end date are required');
//     }

//     const course = courseDb.getCourseById({ id: courseInput.id });
//     const lecturer = lecturerDb.getLecturerById({ id: lecturerInput.id });

//     if (!course) throw new Error('Course not found');
//     if (!lecturer) throw new Error('Lecturer not found');

//     const existingCustomer = customerDB.getCustomerByCourseAndLecturer({
//         courseId: courseInput.id,
//         lecturerId: lecturerInput.id,
//     });

//     if (existingCustomer) throw new Error('This course is already customerd for this lecturer.');

//     const customer = new Customer({ start, end, course, lecturer, students: [] });
//     return customerDB.createCustomer(customer);
// };

export default {
    getCustomers,
    getCustomerById,
    // createCustomer,
};
