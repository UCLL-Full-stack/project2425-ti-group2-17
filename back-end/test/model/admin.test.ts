import { Admin } from '../../model/admin';

test('given: valid values for admin, when: admin is created, then: admin is created with those values.', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@gmail.com';
    const password = 'password';
    const admin = new Admin({ firstName, lastName, email, password });

    expect(admin.getFirstName()).toEqual(firstName);
    expect(admin.getLastName()).toEqual(lastName);
    expect(admin.getEmail()).toEqual(email);
    expect(admin.getPassword()).toEqual(password);
});
