const Tour = require("../Moduls/Tour")
const User = require("../Moduls/User")
const AppliedTour = require("../Moduls/AppliedTours")
const nodemailer = require("nodemailer")
const Razorpay = require("razorpay")
const { verifyToken } = require("../Services/Services")


async function applyTour(req, res) {
    // const { tourID } = req.body

    const tourID = req.query.tourID;
    const cookie = req.query.cookie;

    if (!cookie) {
        return res.status(200).json({ message: "please login aa" })
    }
    const payload = verifyToken(cookie)
    if (!payload) {
        return res.status(404).json({ message: "please login ok" })
    }
    const email = payload.email;

    try {
        // finding user and tour
        const user = await User.find({ email })
        if (!user[0]) {
            return res.status(404).json({ message: "User not found" })
        }

        const tour = await Tour.find({ _id: tourID })
        console.log(tour[0]);
        if (!tour[0]) {
            return res.status(404).json({ message: "Tour not found" })
        }
        const seat = tour[0].bookedSets ||0
        const bookedSeats = parseInt(seat)
        const addedSets = bookedSeats + 1

        const appliedTour = new AppliedTour({
            whoApplied: user[0]._id,
            whichTour: tour[0]._id,
            ticketID: addedSets,
            seatNo: addedSets,
            agentNo: tour[0].phoneNo,
        })
        await appliedTour.save()
        console.log("appliedTour", appliedTour);


        const result = await Tour.updateOne(
            { _id: tourID },
            { $set: { bookedSets: addedSets } }
        )

        const tourInfo = await AppliedTour.find({ _id: appliedTour._id })
            .populate("whoApplied")
            .populate("whichTour")
        console.log(tourInfo);



        // sending mail to user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: 'javalepratik47@gmail.com',
                pass: 'vmvk kmpk zqxg bmlt'
            },
        })

        console.log("email", email);

        const info = await transporter.sendMail({
            from: "Travel Market Place <javalepratik47@gmail.com>",
            to: email,
            subject: "🎉 Your Trip is Booked! | Travel Marketplace Confirmation",
            text: "`<p>Dear Traveler Congratulations on successfully booking your trip through our Travel Marketplace! We're thrilled to be a part of your upcoming adventure and are committed to ensuring a smooth and enjoyable experience.br>Booking Details Destination: [Destination Name] ,Travel Dates: [Start Date] - [End Date],Agency: [Travel Agency Name],Pickup Point:  [pickupPoint], Booking ID: [Booking ID]  ,  We've sent your booking information to the agency, and they will be in touch shortly with further details regarding your itinerary and any additional information you may need. Thank you for choosing the Travel Marketplace, and we wish you a fantastic journey!  Warm regards The Travel Marketplace Team javalepratik47@gmail.com", // plain text body
            html: `<p>Dear  ${tourInfo[0].whoApplied.name || "Traveler"},
        
                    <br></br><br></br>
                        Congratulations on successfully booking your trip through our Travel Marketplace! We're thrilled to be a part of your upcoming adventure and are committed to ensuring a smooth and enjoyable experience.<br></br><br></br>
                        Booking Details<br></br>
                        Travel Dates: ${tourInfo[0].whichTour.whenGo} -  ${tourInfo[0].whichTour.whenCome}<br></br>
                        Agency:  ${tourInfo[0].whichTour.companyName}<br></br>
                        Pickup Point:  ${tourInfo[0].whichTour.pickupPoint}<br></br>
                        Booking ID:  ${tourInfo[0].whichTour._id}<br></br><br></br>
                        We've sent your booking information to the agency, and they will be in touch shortly with further details regarding your itinerary and any additional information you may need.<br></br>

                        Thank you for choosing the Travel Marketplace, and we wish you a fantastic journey!<br></br><br></br>

                    Warm regards,<br></br>
                    The Travel Marketplace Team<br></br>
                    javalepratik47@gmail.com
                    `, // html body
        })
        console.log(info.messageId);


        res.status(200).redirect('http://localhost:5173');

    } catch (error) {
        res.status(500).json({ message: "server error ", error, ok: error.message })
    }

}

async function history(req, res) {
    const email = req.email
    try {
        const user = await User.find({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const appliedTour = await AppliedTour.find({ whoApplied: user[0]._id })
            .populate("whoApplied")
            .populate("whichTour")

        res.status(200).json({ message: "applied history ok", appliedTour })

    } catch (error) {
        console.log("error");
        res.status(500).json({ message: "server error ", error })
    }
}

async function tours(req, res) {
    // const email=req.email

    const info = await Tour.find()
    res.json({ message: "information is sending successfully", info })
}

async function payment(req, res) {
    try {

        var instance = new Razorpay({
            key_id: 'rzp_test_YvRIHnFAq7vpT2',
            key_secret: '0FfKQLR7FFFLw1OeZReCYLFg'
        });

        const { amount } = req.body;
        console.log(amount);
        const order = { amount, currency: "INR" }
        const orderGenerate = await instance.orders.create(order)

        res.json({ message: "ok", orderGenerate })

    } catch (error) {
        res.json({ message: "error ", error })
    }
}
module.exports = { applyTour, history, tours, payment }
