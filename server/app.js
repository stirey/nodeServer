require("dotenv").config();
//Here we require the use of the express npm package that we've installed in our dependencies
let express = require('express');
//we create an instance of express. We're actually firing off a top-level express() function, a function exported by the Express module. This allows up to create an Express app.
let app = express();
let sequelize = require('./db');

let journal = require('./controllers/journalcontroller');
//here we import the usercontroller.js and assign it to a variable called user
let user = require('./controllers/usercontroller');
sequelize.sync();
//sequelize.sync({force: true})
// here we activate our headers. The file will be read sequentially, meaning that the headers must come before the routes are declared.
app.use(require('./middleware/headers')); 
//below code will allow us to accept the json into our server and convert it to an object that can be used in our controller
//Express has functionality built into it, that allows it to be able to process requests that come into our server. And in order to use the req.body middleware, we need to use a middleware function called express.json().  Express needs to JSON-ify  the request to be able to parse and interpret the body of data being sent through the request.
// This app.use statement MUST go above any routes. Any routes above this statement will not be able to use the express.json() function, so they will break.
// Here's a recommended article to get a starter understanding of how express.json() is working with req.body. Warning: this will lead you down a rabbit hole of understanding.
// app.use(express.json());
//we call upon the use() method from the Express framework and create a route to access any future functions in our usercontroller.js The string /user is setting up the endpoint our URL will need to include to access a controller. The user variable is the same as user variable on line 10 and specifies which controller this endpoint is connected to 
app.use(express.json());

//************************
//*****Exposed route******
//***********************/
app.use('/user', user );


//************************
//*****Protected route****
//***********************/
//import validate session middleware. checks to see if the incoming request has a token. Anything beneath this will require a token to access, becoming protected. Anything above will not be protected. User is not protected, journal is.
// app.use(require('./middleware/validate-session'));
app.use('/journal', journal);





// app.listen will use express to start a UNIX socket and listen for connections on the given path. The given path is localhost:3000 indicated by the parameter 3000
app.listen(3000, function(){
    console.log('App is listening on port 3000');
})
//above line- we call a callback function when the connection happens with a simple console.log. This allows us to see a message with the port that the server is running on. 





//NOTES

// When we use require( ' dependency ' ) such as on line 1, we are importing and accessing dependencies we installed in our project. Our project's dependencies are housed in the package.json. This is a great place to check for spelling errors.

// When we use require( ' . /foldername/filename ' ) such as on line 6 to access information, we are following our file structure to walk through our various folders and access the correct file or function. This is another place to check for spelling errors.