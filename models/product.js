
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    brand: String,
    rating: Number,
    comment: String,
    foodtype: String,
    date: {
        type: String,
        default: Date.now(),
    },
    reviewerName: String,
    reviewerEmail: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    image1: { type: String },
    image2: { type: String }
});

module.exports = mongoose.model('MyProduct', productSchema);
