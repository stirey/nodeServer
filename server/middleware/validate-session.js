// when a user signs up or logs in, we will interact with the token assigned which is why we import JWT package below.
const jwt = require('jsonwebtoken');
//we want more info about a specific user so import user model in db
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);


if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided"})
} else {
    // verify method decodes the token. if successful decodeToken will contain the decoded payload, if not it will be undefined.
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
        console.log('decodeToken -->', decodeToken);
// if there is no error and there is a decoded payload, look for specific user...
        if (!err && decodeToken) {
            User.findOne({
              where: {
                  id: decodeToken.id
              }  
            })
            .then(user => {
                console.log('decodeToken -->',user);
                if (!user) throw err;
                console.log('req -->', req);
                req.user = user;
                //next function exits us out of the function
                return next();
            }) 
            //if our pormise is rejected capture response in .catch and pass error into the next function
            .catch(err => next (err));
        } else {
            req.errors = err;
            return res.status(500).send('Not Authorized');
        }
    });
}
};

module.exports = validateSession;