const express = require('express');
const router = express.Router();


const catagoryProductCotroller = require('../controller/catagoryProductCotroller.js')

router.post('/saveCatagoryProduct', catagoryProductCotroller.saveCatagory);

router.get('/getCatagoryProduct', catagoryProductCotroller.getCatagory);

router.get('/createCatagoryProduct/:catagory', catagoryProductCotroller.createCatagory);

module.exports = router



