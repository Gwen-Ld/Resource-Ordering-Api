const express = require('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Connecting Mongo database with mongoose
mongoose.connect(
    "mongodb+srv://resource-ordering-api:"
        + process.env.MONGO_ATLAS_PWD + 
        "@resource-ordering-api-v33wq.mongodb.net/test?retryWrites=true&w=majority", 
    {
        useMongoClient: true
    }
);


app.use(morgan('dev'));
// To parse url encoded bodies - setted to false to only support simple bodies
app.use(bodyParser.urlencoded({extended: false}));
// Extract json data and make it readable
app.use(bodyParser.json());


// Preventing Cors errors - ensuring we send the right headers
app.use((req, res, next)=>{
    // which origin (client) is allowed
    res.header("Access-Contro-Allow-Origin", "*"),
    // Which type of headers is allowed
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // Check if incomming request method is equal to options
    if (req.method === 'OPTIONS'){
        // Tells the browser what he may send
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})


// Handles all the errors, no matter where they come from
app.use((error, req, res, next)=>{
    // Uses the 404 error above or 500 for all other kind of error
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;