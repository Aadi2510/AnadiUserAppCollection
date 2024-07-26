let mongoose = require('mongoose')

const connection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // const db = connectionInstance.connection.db;

        // // List collections
        // const collections = await db.listCollections().toArray();
        // console.log('Collections:', collections.map(collection => collection.name));
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
module.exports = connection

