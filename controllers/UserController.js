const { match } = require("assert");
const User = require("../Moduls/User")
const {createHmac,randomBytes}=require("crypto")
const nodemailer = require("nodemailer")


async function login(req, res) {
    const {email,password}=req.body
    console.log("email ,password",email,password);
    const login=await User.matchPassword(email,password)
    console.log(login);
    
    if (login == false) {
        // console.log("user not found");
        return res.json({ message: "User not found" })
    }
    const role=await User.find({email})
    res.cookie("token",login).json({"token":login,message:"login successfully",role:role[0].role})
}


async function signin(req, res) {
    const { name, email, password, address, role, companyName, pincode, city, phoneNumber,otp } = req.body
    const data = await User.find({ email })
    if (data[0] ) {
        // console.log("data", data);
        return res.json({ message: "user already exist ", name, email, password, address, role, companyName, pincode, city, phoneNumber ,otp})
    }
    const newUser = new User({
        name, email, password, address, role, companyName, pincode, city, phoneNumber,otp
    });
    await newUser.save();
    res.json({ message: "signin successfully", name, email, password, address, role, companyName, pincode, city })
}


async function sendOtp(req,res) {
    const {email}=req.body

    const userInfo=await User.find({email})

    if (!userInfo) {
        return res.json({message:"user not found"})
    }
    let randomOtp=Math.round(Math.random()*10000)
    if (randomOtp<1000) {
    randomOtp=9999
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'javalepratik47@gmail.com',
            pass: 'vmvk kmpk zqxg bmlt'
        },
    })

    // console.log("email", email);

    const info = await transporter.sendMail({
        from: "Travel Market Place <javalepratik47@gmail.com>",
        to: email,
        subject: "Change password",
        text: `otp:${randomOtp}`, // plain text body
        html: `<b> OTP:${randomOtp}<b/>
                `, // html body
    })
    // console.log(info.messageId);

    if (info.messageId) {
        const otp=await User.updateOne(
            {  email},
            {$set:{otp:randomOtp}}
        )
    }
    res.json({message:"OTP send successfully"})
}

async function forgetPassword(req,res) {

    const {email,password,otp}=req.body
    console.log(email,password,otp,req.body);
    
    const userInfo=await User.find({email})
    const userSalt=userInfo[0].salt
    if (!userInfo) {
        return res.json({message:"user not found"})
    }
     if (userInfo[0].otp!==otp) {
        return res.json({message:"Invalid OTP"})
    }

    const hashedPassword=createHmac("sha256",userSalt).update(password).digest("hex")

    const result=await User.updateOne(
        {  email},
        {$set:{password:hashedPassword}}
    )
    // console.log(userInfo[0].otp !== otp,userInfo[0].otp,otp);
    res.json({userInfo,message:"password change successfully"})

}
async function profile(req,res) {
    const email=req.email
    const userInfo=await User.find({email})
    console.log(userInfo,email);
    res.json({userInfo,message:"User information",email})
    
}
module.exports = { login, signin,forgetPassword ,sendOtp,profile}