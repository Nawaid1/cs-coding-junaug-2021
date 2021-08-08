// Import the express function.
const express = require('express');
// Import body-parser to parse the BODY of an HTTP request
//const bodyParser = require('body-parser');
// Import CORS (Cross-Origin Resource Sharing) to allow external 
// HTTP requests to Express
const cors = require('cors');
//dotenv will allow Express to read Environment Variables
require('dotenv').config();

// This will make 'server' an object with methods 
// for server operations
const server = express();


// Parse urlencoded bodies and where the Content-Type header matches the type option
server.use( express.urlencoded({ extended: false }) );
// Tell express to parse JSON data
server.use( express.json() );
// Tell express to allow external HTTP requests
server.use(cors());


// Import mongoose to connect to MongoDB Atlas
const mongoose = require('mongoose');



// Import the Model
const UserRoutes = require('./routes/user-routes.js')
const productRoutes = require('./routes/product-routes.js')


// NOTE: Make sure to enter your connection string.
const connectionString = "mongodb+srv://admin01:Camaro28*@cluster0.dsaee.mongodb.net/astro_jul2021?retryWrites=true&w=majority";

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
.connect(connectionString, connectionConfig)  // returns Promise
.then(
    () => {
        console.log('DB is connected');
    }
)
.catch(
    (dbError) => {
        console.log('error occurred', dbError);
    }
);

// A method to process a GET HTTP request.
// server.get(path, callbackFunction)
server.get(
    '/',                        // http://localhost:3001/
    (req, res) => { 
        res.send("<html><head><title>Home</title></head><body><h1>Welcome to Website</h1></body></html>")
    }
);

server.use(
    '/users', UserRoutes
);

server.use(
    '/products', productRoutes
);

// Get all of the users
// http://localhost:3001/users


// The .listen() will connect the server
// to an available Port
// server.listen(portNumber, callbackFunction)
server.listen(
    process.env.PORT || 3001,
    () => {
        console.log('Server is running on http://localhost:3001/');
    }
)








/*server.use (bodyParser.urlencoded({ extended: false}) );
//Tell express to Parse JSON data
server.use (bodyParser.json());

//import mongoose to connect to Mongoose Atlas
const mongoose = require('mongoose')

const connectionString = "mongodb+srv://admin01:Camaro28*@cluster0.dsaee.mongodb.net/astro_jul2021?retryWrites=true&w=majority";

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(connectionString, connectionConfig)
.then(
    () => {
        console.log('Db is connected');
    }
)
.catch(
    (dberror) => {
        console.log('error occured', dberror);
    }
)
// A method to process a GET HTTP request.
// server.get(path, callbackFunction)
server.get(
    '/home', 
    (req, res) => { 
        res.send("<html><head><title>Home</title></head><body><h1>Welcome Home</h1></body></html>")
    }
);

server.get(
    '/about', 
    (req, res) => { 
        res.send("<html><head><title>About</title></head><body><h1>About Page</h1></body></html>")
    }
);

//http://localhost:3001/uers
server.get('/users', 
    (req, res) => {

        UserModel
        .find()
        .then(
            (dbDocument)=>{
                res.send(dbDocument)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )

    }
)

server.post(
    '/users/create',
    (req, res) => {
        //use the usermodel to create 
        UserModel
        .create(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
                /* brand: "Samsung",
                model: "S21",
                description: "Mobile Phone",
                color: "Black",
                origin: "Korea",
                price: 3000 */