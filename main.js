let express = require('express')
let mongoose = require('mongoose')

let cors = require('cors')

const db = require('./dataBaseConfig.js')

const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})


let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())


app.use(express.static('uploads'))




db().then(async () => {

    // List collections
    // const collections = await db.listCollections().toArray();
    // // console.log(collections)
    // console.log('name of collections:', collections.map((data)=>data.name));
    app.listen(process.env.PORT || 8000, () => {
        console.log(`erver is running at port : ${process.env.PORT}`);
    })


    //Store Route
    const nearStoreRoutes = require('./route/nearStoreRoutes.js')

    //Product
    const productRoutes = require('./route/productRoutes.js')

    //Catagory
    const catagoryProductRoutes = require('./route/catagoryProductRoutes.js')
    const catagoryStoreRoutes = require('./route/catagoryStoreRoutes.js')



    // -------------------End URL-----------------------------

    //Store
    app.use('/api', nearStoreRoutes)

    //Product
    app.use('/api', productRoutes)
    
    //Catagory
    app.use('/api', catagoryProductRoutes)
    app.use('/api', catagoryStoreRoutes)


})
    .catch(err => console.log(err))


