var express = require('express');
const User = require('../db/user');
const bcrypt = require('bcrypt');
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
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);


          //res.redirect('/testAPI'); // redirect to dashboard
        } else if (result == false) {
            res.status(401).json({ error: "invalid email or password" });
        //   res.render('login', {
        //       message: 'Invalid username or password',
        //       messageClass: 'alert-danger'
        //   });
        }
      });
    } catch (error) {
        return error;
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
                checkPassword(email, password, req, res);
            }
    } catch (error) {
        return error;
    }
}



module.exports = router;

