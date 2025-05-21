const cat = require('cat-me');

// This is a simple Node.js application that uses the cat-me package to display a random cat fact.
// The cat-me package provides a random cat fact when called.
// The application listens for HTTP requests on port 3000 and responds with a random cat fact when the /cat endpoint is accessed.
/*const http = require('http');
const server = http.createServer((req, res) => {
    console.log('Request received');
    if (req.url === '/cat') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(cat());
    }
    else {
        res.end('Welcome to my server \n To See a cat, go to /cat');
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});*/


const express = require('express');
const morgan = require('morgan');
const userModel = require('./models/user');
const dbConnection = require('./config/db');
const app = express();

//setting view engine to ejs
app.set('view engine', 'ejs');

//setting up morgan middleware third party middleware
app.use(morgan('dev'));

//custom middleware
app.use((req, res, next)=>{
    console.log('Request received');
    next();
})

//built in middleware 
//express.json() is used to parse JSON data from the request body
//express.urlencoded() is used to parse URL-encoded data from the request body
//extended: true means that the data will be parsed using the qs library
//extended: false means that the data will be parsed using the querystring library
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res, ) => {
    res.render('index');
})

app.get('/cat', (req, res) => {
    res.send(cat());
})

//get method to get data from the form
/*app.get('/form-data', (req,res)=>{
    console.log(req.query);
    res.send('Form data received');
})*/

//get method to render the form
app.get('/register', (req, res) => {
    res.render('register');
})

//CRUD operations

//post method to register the user
//create operation to create a new user
app.post('/register', async (req, res) => {

    //destructuring the data from the request body
    const {name, email, password} = req.body;

    //create a new user object
    const userDetail = await userModel.create({
        name:name,
        email:email,
        password:password,
    })
    console.log(req.body);
    res.send(userDetail);
})

//read operation to get all the users
app.get('/get-users', (req,res)=> {
    //find method to find all the users
    userModel.find().then((users)=> {
        res.send(users);
    })

    //findOne method to find a single user
    /*userModel.findOne({name:p}).then((users)=> {
        res.send(users);
    })*/
})

//upate operation to update a user
app.get('/update-user', async (req,res) => {
    //find method to find a user and update it
    await userModel.findOneAndUpdate({name:'p'}, {name:'priyansh'});

    res.send('User Updated');
})

//delete operation to delete a user
app.get('/delete-user', async (req,res) => {
    await userModel.findOneAndDelete({name:'ar'});
    res.send('User Deleted');
})


app.post('/form-data', (req, res) => {
    console.log(req.body);
    res.send('Form data received');
})

app.listen(3000);