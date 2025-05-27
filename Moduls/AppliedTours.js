const Tour=require("./Tour")
const User=require("./User")
const mongoose=require("mongoose")


const appliedTourSchema=new mongoose.Schema({
    whoApplied:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requird:true,
    },
    whichTour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tour',
        requird:true
    },
    ticketID:{
        type:String,
        requird:true
    },
    seatNo:{
        type:String,
        requird:true
    },
    agentNo:{
        type:String,
        requird:true
    },
    paymentCompleted:{
        type:String,
        enum:["yes","no"],
        default:"no"
    },
})

const AppliedTours=mongoose.model("AppliedTour",appliedTourSchema)

module.exports=AppliedTours