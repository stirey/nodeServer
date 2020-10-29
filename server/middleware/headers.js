// allows us to export this module to be used in another file
// req refers to the request from the client, specificially focusing on any headers present on the request object. res refers to the response and will be used to present which types of headers are allowed by the server.
module.exports = function(req, res, next){
// res.header is called so that the server will respond with what kind of headers are allowed in the request
// access-control-allow-origin header to tell the server the specific origin location that are allowed to communicate with the server. The * is known as a wild-card. It means everything is allowed. Its saying that request originating from any location are allowed to communicate with the database.
    res.header('access-control-allow-origin', '*');
// These are the HTTP methods that the server will allow being used. Postman allows you to send 15 different http requests, our server will only accept these four.
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// next sends the request along to its next destination. This could be the API endpoint or another middleware function designed to do something else.
    next();
};










// ADDITIONAL NOTES
// next() tells the middleware to continue its process. With the above example, next() takes the request object and passes it on the endpoint on the server. Not including the next() would cause the application to break, as the server doesn't know what to do after sending the header. We could also use next() to provide additional headers if we want further restrictions on our server.