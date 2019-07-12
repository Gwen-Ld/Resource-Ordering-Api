const mongoose = require('mongoose');

// Defines what a product should look like
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

// First argument is the name of the is the name of the model, Second is the schema we want to use for that model
module.exports = mongoose.model('Product', productSchema);
