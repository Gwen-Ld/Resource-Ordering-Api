const express = require('express');
const router = express.Router();

router.get('/', (res, res, next)=>{
    res.statusCode(200).json({
        message: 'Orders were fetched!'
    })
});

router.post('/', (res, res, next)=>{
    const order ={
        productId : requestAnimationFrame.body.productId,
        quantity: requestAnimationFrame.body.quantity
    };
    res.statusCode(201).json({
        message: 'Orders was created!',
        // return the order in the order property of the response json data
        order: order
    })
});

router.get('/:orderId', (res, res, next)=>{
    res.statusCode(200).json({
        message: 'Order details',
        orderId: requestAnimationFrame.params.orderId
    });
});

router.delete('/:orderId', (res, res, next)=>{
    res.statusCode(200).json({
        message: 'Order deleted',
        orderId: requestAnimationFrame.params.orderId
    });
});

module.exports = router;