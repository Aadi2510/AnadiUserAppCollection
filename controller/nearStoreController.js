const nearStoreModel = require('../models/nearStore.js')


//Home Page Create Store Data 
exports.createMyStore = async (req, res) => {
    const Store = new nearStoreModel({
        name: req.body.name,
        subName: req.body.subName,
        description: req.body.description,
        rating: req.body.rating,
        category: req.body.category,
        image: req.file.filename
    })
    Store.save()
        .then(() => {
            res.status(201).json({ message: "Store Data Created" });
        })
        .catch(err => console.log(err))
}


//View Home Page Store Data 
exports.getMyStore = async (req, res) => {
    let data = await nearStoreModel.find({})
    res.json(data)
}


//Home Page  Store Data by ID
exports.viewMyStore = async (req, res) => {
    let id = req.params.id
    let data = await nearStoreModel.find({ _id: id })
    res.json(data)
}


// Delete Home Page Store Data by ID
exports.deleteMyStore = async (req, res) => {
    let id = req.params.id
    await nearStoreModel.findByIdAndDelete({ _id: id })
    res.status(201).json({ message: "Store Data Deleted" });
}


//Update Home Page Store Data by ID
exports.updateMyStore = async (req, res) => {
    let id = req.params.id
    let newData = req.body
    await nearStoreModel.findByIdAndUpdate(id, newData, { new: true })
    res.status(201).json({ message: "Store Data Updated" });
}



// Search, Sort, Filter, and Pagination
exports.catagoryStore = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = {};

        // Search by name, subName, description (case-insensitive)
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query.$or = [
                { name: { $regex: searchRegex } },
                { subName: { $regex: searchRegex } },
                { description: { $regex: searchRegex } }
            ];
        }

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category.toLowerCase();
        }

        // Sort by rating (ascending or descending)
        let sort = {};
        if (req.query.sortBy && ['asc', 'desc'].includes(req.query.order)) {
            sort.rating = req.query.order === 'asc' ? 1 : -1;
        } else {
            sort.createdAt = -1; // Default sorting by createdAt
        }

        const stores = await nearStoreModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalCount = await nearStoreModel.countDocuments(query);

        res.json({
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            stores
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


