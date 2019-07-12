const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Search in Product model of database
router.get('/', (req, res, next)=> {
    Product.find()
        .exec()
        .then(docs=> {
            console.log(docs);
            // if (docs.length >= 0){
            res.status(200).json(docs);    
            // } else {
            //     res.status(404).json({
            //         message: 'No entries found'
            //     })
            // }
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next)=> {
    
    // Instantiate a product in Product model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name,
        price : req.body.price
    });
    // Store in the database and catch potetial errors
    product
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                // return the createdProduct in the product property of the response json data
                message: 'Handling POST requests to /products',
                createdProduct: result
            })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});


router.get('/:productId', (req, res, next)=> {
    const id = req.params.productId;
    // Search in the Product model of the database
    Product.findBy(id)
        .exec()
        .then(doc=>{
            console.log("From the database", doc);
            // If doc is not null, then i want to send a response with the document
            if (doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message: 'No valid entry find for provided ID'});                
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


// PATCH is an equivalent to PUT, but used for partial record
router.patch('/:productId', (req, res, next)=> {
    const id = req.params.productId;
    const updateOps = {};
    // Gives the possibilty to save a particular key value, name or price
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    // The update takes 2 parameters, the id and $set to register new datas
    Product.update({ _id:id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(res);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

router.delete('/:productId', (req, res, next)=> {
    const id = req.params.productId
    Product.remove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error:err
            });
        });
});

module.exports = router;