const mongoose=require("mongoose")

const toursSchema=new mongoose.Schema({
    email:{
        type:String,
        requird:true
    },
    phoneNo:{
        type:String,
        requird:true
    },
    companyName:{
        type:String,
        requird:true
    },
    Images:{
        type:String,
        requird:true
    },
    path:{
        type:String,
        requird:true
    },
    allInformation:{
        type:String,
        requird:true
    },
    prise:{
        type:String,
        requird:true
    },
    seats:{
        type:String,
        requird:true
    },

    bookedSets:{
        type:String,
        requird:true
    },
    days:{
        type:String,
        requird:true
    },
    whenGo:{
        type:String,
        requird:true
    },
    whenCome:{
        type:String,
        requird:true
    },
    rating:{
        type:String,
        requird:true
    },
    pickupPoint:{
        type:String,
        requird:true
    },
    transportType:{
        type:String,
        requird:true
    }
})

const Tour=mongoose.model("Tour",toursSchema)

module.exports=Tour