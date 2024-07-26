let nearStore = require('../models/nearStore.js')
const mongoose = require('mongoose');



exports.saveCatagory =  (req, res) => {
 
    let finalData = new nearStore({
       catagory: req.body.catagory
    });
    console.log(finalData)
    finalData.save()
        .then(() => res.send("catagory created"))
        .catch(err => console.log(err))
    }


exports.getCatagory = async (req, res) => {
    let data = await nearStore.find({})
    res.json(data)
}


exports.createCatagory = (req, res) => {
    let catagoryname = req.params.catagory
    let NearStoreSchema = new mongoose.Schema({
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
    mongoose.model(`${catagoryname}`, NearStoreSchema)
    res.send("Near Store created")
}

