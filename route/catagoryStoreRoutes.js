const express = require('express');
const router = express.Router();


const catagoryStoreCotroller = require('../controller/catagoryStoreCotroller.js')

router.post('/saveCatagoryStore', catagoryStoreCotroller.saveCatagory);

router.get('/getCatagoryStore', catagoryStoreCotroller.getCatagory);

router.get('/createCatagoryStore/:catagory', catagoryStoreCotroller.createCatagory);

module.exports = router



