const express = require('express');
const app = express();
const morgan = require ('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

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