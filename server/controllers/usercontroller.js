// here we have combined two lines of code. Import the Express framework and access the Router() method, assigning it to a variable called router
const router = require('express').Router();
// 2 lines of code combined below. Import the user model through our db.js and store it in User variable
const User = require('../db').import('../models/user');


// let express = require('express');
// let router = express.Router();
//bringing in the database
// let sequelize = require('../db');
// let User = sequelize.import('../models/user.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//Create a new endpoint : /create
//The endpoint is going to be a post request
//Have an object that matches the model of UserTable (email/password)
//Let sequelize create a new record in the database (create)

//******USER SIGNUP**************** */
//********************************* */

// We use the router object by using the router variable to get access into the Router() object methods.
// post() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP POST request. We pass two arguments into the .post method. The first argument'/create' is the path. The second argument is a callback function. This is also sometimes called a “handler function”. This function gets called when the application receives a request to the specified route and HTTP method. The application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.
router.post('/create', function(req, res){
    // The User variable we created at the top accesses the model that we created in model folder>user.js.This grants us access to the User model properties and to Sequelize methods. .create() is a Sequelize method that allows us to create an instance of the User model and send it off to the database as long as the data types match the model. 
    User.create({
        // req is the request. body is where data is being held. user is a property of body and email/password are properties of user
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    // User.create returns a promise since we queried from a model in our database. We capture this Promise with a .then() when successful or a .catch() to perform some error handling.
    .then(
        function createSuccess(user) {
            // token variable stores the token, then call upon jwt variable which is referring to the jsonwebtoken dependency we installed. .sign is a method that creates the token. 
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '30d' });

            //You may find yourself asking: "What is the difference between res.send() and res.json()?"There is not much different about the two methods. The two are actually identical. They can both pass objects and arrays. res.json() even calls .send at the end of its action. The only difference is the fact that res.json() will convert non objects (such as null and undefined) into valid JSON while res.send() cannot.
        res.json({
            // left user is name of our object, right user is the parameter from createSuccess() function
            user: user,
            message: 'User successfully created!',
            //add a key of sessionToken and pass it the value of the token. the server has now assigned a token to a specific user
            sessionToken: token
            });
        }
    )
    // If the promise gets rejects, use a .catch method to capture the error and send ourselves a 500 error with a JSONified message
    .catch(err => res.status(500).json({error: err}))
    });


//Create a new endpoint : /login
//The endpoint is going to be a post request
//Build a query statement (Hard code in a user's email that exists in your database)
//Use FindOne
//Let sequelize return a success
//If we find one return user info and if user doesn't exist return "user does not exist"

/******************USER SIGNIN ******************************/
//********************************************************* */
// post method accepts 2 arguments login is the path, then the callback function that allows us to access to the request and/or the response
router.post('/login', function(req, res){
    // findOne is a seqelize method that tries to find something within the database that we tell it to look for(Data Retrieval) https://sequelize.org/master/manual/models-usage.html
    User.findOne ({
        where: {
            email: req.body.user.email
        }
        })
        .then(function loginSuccess(user) {
            if(user){
                bcrypt.compare(req.body.user.password, user.password, function (err, matches){
                    if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '30d'}) 
                    
                    res.status(200).json({ 
                    user: user,
                    message: "User successfully logged in!",
                    sessionToken: token
                    })

                    }   else {
                    res.status(502).send({error: 'Login Failed'});
                    }
                    });
                    // we add an else statement to catch untrue values
                    } else {
                    res.status(500).json({error:'User does not exist.'})
                    }    
                    })
            .catch(err => res.status(500).json({ error: err}))
            });
            
// export the module for usage outside the file below
module.exports = router;
//below is an alternative way to write the above code
// const router = require('express').Router();
// const User = require("../db").import("../models/user.js");

