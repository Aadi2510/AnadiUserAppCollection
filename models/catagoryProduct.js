const mongoose = require('mongoose');

let catagoryProducts = new mongoose.Schema({
    catagory:  {
        type: String,
        required: true,
        unique: true,
    },
    description:  {
        type: String,
        lowercase: true,
        trim: true, 
        index: true
    },
    date: {
        type: String,
        default: Date.now(),
    }
})

module.exports = mongoose.model('catagoryProductData', catagoryProducts)


