var express = require('express');
const User = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();

// router.get('/', (req, res) => {
//     res.render('login');
// });

router.post('/', (req, res) => {
    const { email, password } = req.body;
    login(email, password, req, res);
});

async function checkPassword (email, password, req, res) {
    try {
      const hash = await User.getPassword(email);
      bcrypt.compare(password, hash, function(err, result) {
        if (result == true) {
          //req.session.user = req.body; // track user session

          // Issue token
          //const payload = email;
          const secret = 'mysecretsshhh';
          const token = jwt.sign({email}, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
          console.log("token issued")

          //res.redirect('/testAPI'); // redirect to dashboard
        } else if (result == false) {
            res.status(401).json({ error: "invalid email or password" });
            console.log("invalid login");
        //   res.render('login', {
        //       message: 'Invalid username or password',
        //       messageClass: 'alert-danger'
        //   });
        }
      });
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function login (email, password, req, res) {
    try {
        const userExists = await User.exists(email);
            if (!userExists) {
                res.status(404).json({ error: "user does not exist" });
                // res.render('login', {
                //     message: 'this email is not registered',
                //     messageClass: 'alert-danger'
                // });
            } else {
                console.log("gonna check pw")
                checkPassword(email, password, req, res);
                console.log("checked password")
            }
    } catch (error) {
        return error;
    }
}



module.exports = router;

