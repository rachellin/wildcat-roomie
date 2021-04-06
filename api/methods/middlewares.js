// module.exports = {
//     sessionChecker (req, res, next) {
//         if (req.session.user && req.cookies.user_sid) {
//             res.redirect('/testAPI');
//         } else {
//             next();
//         }    
//     }
// }

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
module.exports = {
    tokenChecker (req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
            console.log("no token")
        } else {
            jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
                console.log("invalid token")
            } else {
                req.email = decoded.email;
                next();
            }
            });
        }
    }
}