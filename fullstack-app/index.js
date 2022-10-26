const express = require('express');
const app     = express();
const cors    = require('cors');
const dal     = require('./dal.js');
const admin   = require('./admin.js');
const res     = require('express/lib/response');

// used to serve static files from the public directory
app.use(express.static('public'));
app.use(cors());

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        admin.auth().verifyIdToken(token)
            .then(decodedToken => {
                console.log('Decoded Token: ', decodedToken);
                return next();
            }).catch(err => {
                return res.status(401).send('Unauthorized');
        })
    }
    else {
        return res.status(401).send('No token found');
    }
}


// create user account
app.get('/account/create/:name/:email/:password', (req,res) => {
    // else create user
    const params = req.params;

    dal.create(params.name,params.email,params.password) 
        .then(user => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/:email', verifyToken, (req,res) => {
    dal.findOne(req.params.email)
    .then(user => {
        console.log(user);
        res.send(user);
    });
});


app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.get('/account/update/:email/:amount', verifyToken, (req,res) => {
    
    const params = req.params;

    dal.update(params.email, parseInt(params.amount))
        .then(user => {
            console.log(user);
            res.send(user);
        });
});

// all accounts
app.get('/account/all', verifyToken, (req,res) => {
    
    dal.all()
        .then(users => {
            console.log(users);
            res.send(users);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' , port);