const Tour = require("../Moduls/Tour")
const User = require("../Moduls/User")
const AppliedTour = require("../Moduls/AppliedTours");
const { cloudinary } = require("../cloudinary");
const fs = require("fs");

async function tour(req, res) {

    const { Images, path, allInformation, prise, seats, bookedSets, days, whenGo, whenCome, rating, companyName, phoneNo, pickupPoint, transportType } = req.body

    const file = req.info
    console.log("file is ", req.body);

    // uploding file on cloud
    const par = "Services/" + file.originalname

    try {
        var responce = await cloudinary.uploader.upload(par, { resource_type: "auto" })
        fs.unlinkSync(par)

    } catch (error) {
        fs.unlinkSync(par)
        return res.json({ message: "file is not uplodaded on cloudinary ", error })

    }

    const email = req.email
    const agentInfo = await User.find({ email })

    if (agentInfo[0].role == 'user') {
        return res.json({ message: "You are User ,You cannot fill this form" })
    }

    const newTour = new Tour({
        Images: responce.url, path, allInformation, prise, seats, bookedSets, days, whenGo, whenCome, rating, companyName: agentInfo[0].companyName, email, phoneNo: agentInfo[0].phoneNumber, pickupPoint, transportType
    });

    await newTour.save();

    res.json({ message: "Data uplodad successfully " })
}

async function history(req, res) {
    const email = req.email;
    const tours = await Tour.find({ email })
    // console.log(tours);
    res.status(200).json({ tours })
}

async function appliedInfo(req, res) {
    const { tour_id } = req.body
    const applied = await AppliedTour.find({ whichTour: tour_id }).populate("whoApplied").populate("whichTour")
    res.status(200).json({ message: "featchin data succefully", applied })
}

async function deleteTour(req,res) {
    const { tour_id } = req.body
    await Tour.deleteOne({_id:tour_id})
    const email = req.email;
    const tours = await Tour.find({ email })
    res.status(200).json({ tours ,message:"Tour deleted successfully"}) 
}
module.exports = { tour, history, appliedInfo,deleteTour }
