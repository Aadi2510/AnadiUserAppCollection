const express = require('express');
const router = express.Router();
const upload = require('../multerConfig.js')

const nearStoreController = require('../controller/nearStoreController.js')

//Home Page Create Store Data 
router.post('/createMyStore',upload.single('image'), nearStoreController.createMyStore)

//View Home Page  Store Data 
router.get('/getMyStore', nearStoreController.getMyStore)

//View Home Page Store Data by ID
router.get('/viewMyStore/:id', nearStoreController.viewMyStore)

//Update Home Page Store Data by ID
router.put('/updateMyStore/:id',upload.single('image'), nearStoreController.updateMyStore)

// Delete Home Page Store Data by ID
router.delete('/deleteMyStore/:id', nearStoreController.deleteMyStore)

//Catagory
router.get('/catagoryStore', nearStoreController.catagoryStore)



module.exports = router




// --------------------------------------------------------------------

// Usage

// Search: Send a GET request to /api/catagoryStore?search=query.

// Sort: Send a GET request to /api/catagoryStore?sortBy=rating&order=asc or /api/catagoryStore?sortBy=rating&order=desc.

// Filter: Send a GET request to /api/catagoryStore?category=categoryName.

// Pagination: Send a GET request to /api/catagoryStore?page=page_number&limit=page_size.

