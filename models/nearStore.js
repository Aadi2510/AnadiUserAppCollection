const mongoose = require('mongoose');

let storeShema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    subName:  {
        type: String,
        lowercase: true,
        trim: true, 
        index: true
    },
    description:  {
        type: String,
        lowercase: true,
        trim: true, 
        index: true
    },
    rating:  {
        type: Number,
        lowercase: true,
        trim: true, 
        index: true
    },    
    category:  {
        type: [String],
        required: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    image: String,
},
{
    timestamps: true
})

module.exports = mongoose.model('UserStoreData', storeShema)
