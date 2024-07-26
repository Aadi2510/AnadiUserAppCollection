let catagoryProduct = require('../models/catagoryProduct.js')
const mongoose = require('mongoose');



exports.saveCatagory =  (req, res) => {
 
    let finalData = new catagoryProduct({
       catagory: req.body.catagory
    });
    console.log(finalData)
    finalData.save()
        .then(() => res.send("catagory created"))
        .catch(err => console.log(err))
    }


exports.getCatagory = async (req, res) => {
    let data = await catagoryProduct.find({})
    res.json(data)
}


exports.createCatagory = (req, res) => {
    let catagoryname = req.params.catagory
    let ProductSchema = new mongoose.Schema({
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
    })

    mongoose.model(`${catagoryname}`, ProductSchema)
    res.send("Products created")
}

