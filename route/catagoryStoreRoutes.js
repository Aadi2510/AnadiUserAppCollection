const express = require('express');
const router = express.Router();


const catagoryStoreCotroller = require('../controller/catagoryStoreCotroller.js')

router.post('/saveCatagory', catagoryStoreCotroller.saveCatagory);

router.get('/getCatagory', catagoryStoreCotroller.getCatagory);

router.get('/createCatagory', catagoryStoreCotroller.createCatagory);

module.exports = router



