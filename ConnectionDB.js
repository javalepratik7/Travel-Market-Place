const mongoose =require ("mongoose")

async function connectToMongoose(url) {
    mongoose.connect(url)
}

module.exports={connectToMongoose}