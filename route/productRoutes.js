const express = require('express');
const router = express.Router();
const upload = require('../multerConfig.js')

const productController = require('../controller/productController.js')

// Routes
router.post('/createProduct', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/updateProductById/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), productController.updateProductById);
router.delete('/deleteProductById/:id', productController.deleteProductById);
router.get('/searchProductByTitle/:name', productController.searchProductByTitle);
router.get('/sortProduct', productController.sortProduct);
router.get('/filterProduct', productController.filterProduct);
router.get('/paginationProduct', productController.paginationProduct);


module.exports = router;



// Usage:
// Search: Make a GET request to /api/products/search?q=query where query is your search term.
// Sort: Make a GET request to /api/products/sort?sortBy=field&sortOrder=asc/desc to sort by field.
// Filter: Make a GET request to /api/products/filter?foodtype=type&rating=number&category=category&minPrice=min_price&maxPrice=max_price&brand=brand_name to filter by any combination of foodtype, rating, category, price, or brand.
// Pagination: Make a GET request to /api/products?page=page_number&limit=page_size for paginated results.

