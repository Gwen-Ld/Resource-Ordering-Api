const express = require('express');
const router = express.Router();

router.get('/', (res, res, next)=>{
    res.statusCode(200).json({
        message: 'Orders were fetched!'
    })
});

router.post('/', (res, res, next)=>{
    res.statusCode(201).json({
        message: 'Orders was created!'
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