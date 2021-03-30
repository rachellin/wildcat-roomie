const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../db/user');

module.exports = {
    getHashedPassword (password, req) {
        console.log('func start');
        const saltRounds = 10;
        const { email, firstName, lastName } = req.body;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            const newUser = {
                firstName,
                lastName,
                email,
                password: hash
            };
            // store in db
            User.add(newUser);
            console.log(newUser);
        });
    }
    // users: users = [
    //     {
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'johndoe@email.com',
    //         password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    //     }
    // ]
}