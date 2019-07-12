const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
});

router.post('/', (req, res, next)=> {
    const product = {
        name : req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        // return the createdProduct in the product property of the response json data
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next)=> {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered a special id',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'You âssed an ID'
        })
    }
});

// PATCH is an equivalent to PUT, but used for partial record

router.patch('/:productId', (req, res, next)=> {
    res.status(200).json({
        message: 'Updated product!'
    })
});

router.delete('/:productId', (req, res, next)=> {
    res.status(200).json({
        message: 'Deleted product!'
    })
});

module.exports = router;