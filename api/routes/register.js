var express = require('express');
const User = require('../db/user');
var router = express.Router();
const jwt = require('jsonwebtoken');

var getHashedPassword = require('../methods/methods').getHashedPassword;

router.get('/', (req, res) => {
    //res.render('register');
    res.send("register");
});

router.post('/', (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // check if email is already registered
        User.exists(email)
            .then(email => {
                const exists = email;
                if (exists) {
                    res.status(500).json({ error: "account with this email already exists" }); // check that these error status are correct
                    console.log("error registering - exists");
                    return email;
                } else {
                    getHashedPassword(password, req); // hash password and store data in db
                    //res.status(200).json({ message: "welcome!!" });
                    console.log("registered");
                    // Issue token
                    const secret = 'mysecretsshhh';
                    const token = jwt.sign({email}, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .status(200).json({ message: "welcome!" });
                          
                    return email;
                    //res.redirect('/login');
                }
            });

    } else {
        res.status(500).json({ error: "passwords do not match" });
        console.log("error registering");
    }
})

module.exports = router;
