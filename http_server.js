const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
const cors = require('cors');

// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
// -------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ users: [] }).write();

let port = process.env.PORT || 3001;

// return all users
app.get('/data', function (req, res) {
    res.send(db.get('users').value());
});

//@ test run in a separate terminal the code:  curl -H "Content-Type: application/json" -X POST -d '{"username":"peterparker","password":"secret"}' http://localhost:3000/test then head to the node terminal to verify in the console
//! this is just a test using cURL to verify that the information goes throgh. we can use postman if we want... this is an alternative in the terminal so we dont have to switch back n forth between app
app.post('/test', function (req, res) {
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " " + req.body.password);
})

// add user object
app.post('/add', function (req, res) {
    var user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'streetaddress': req.body.streetaddress,
        'citystatezip': req.body.citystatezip,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'avatar': req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// start server
// -----------------------
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})
