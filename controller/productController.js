// controllers/productController.js

const Product = require('../models/product.js');
const fs = require('fs');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, price, discountPercentage, rating, stock, brand, returnPolicy, minimumOrderQuantity } = req.body;
        const { image1, image2 } = req.files; 

        const newProduct = new Product({
            name,
            description,
            category,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            returnPolicy,
            minimumOrderQuantity,
            image1: image1 ? image1[0].path : '',
            image2: image2 ? image2[0].path : ''
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Read all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const { name, description, category, foodtype, reviewerEmail, comment,reviewerName, price, discountPercentage, rating, stock, brand, returnPolicy, minimumOrderQuantity } = req.body;
        const { image1, image2 } = req.files;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            category,
            price,
            foodtype,
            comment,
            discountPercentage,
            rating,
            stock,
            reviewerEmail,
            reviewerName,
            brand,
            returnPolicy,
            minimumOrderQuantity,
            image1: image1 ? image1[0].path : '',
            image2: image2 ? image2[0].path : ''
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Search a product by Title
exports.searchProductByTitle = async (req, res) => {
    try {
        const searchTerm = req.params.name;
        const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Sort a product by Title
exports.sortProduct = async (req, res) => {
    try {
        const sortBy = req.query.sortBy; 
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // sort order

        const products = await Product.find().sort({ [sortBy]: sortOrder });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}




// Filter by foodtype, rating, category, price, brand endpoints

exports.filterProduct = async (req, res) => {
    try {
        let filterQuery = {};

        // Filter by foodtype
        if (req.query.foodtype) {
            filterQuery.foodtype = req.query.foodtype;
        }

        // Filter by rating
        if (req.query.rating) {
            filterQuery.rating = parseInt(req.query.rating);
        }

        // Filter by category
        if (req.query.category) {
            filterQuery.category = req.query.category;
        }

        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            filterQuery.price = {};
            if (req.query.minPrice) {
                filterQuery.price.$gte = parseInt(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                filterQuery.price.$lte = parseInt(req.query.maxPrice);
            }
        }

        // Filter by brand
        if (req.query.brand) {
            filterQuery.brand = req.query.brand;
        }

        const products = await Product.find(filterQuery);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}




// Pagination endpoint
exports.paginationProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .exec();

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}


//Add to Card API 

exports.addtoCard =  async (req, res) => {
    try {
        // Assuming req.body.productId is sent from client-side
        const productId = req.body.productId;

        // Find product by productId
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Here you can simulate adding to cart logic
        // For example, you might store the productId in session or database
        // or just send a success message if the product is found.

        res.json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}


