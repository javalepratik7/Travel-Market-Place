const {verifyToken}=require("../Services/Services")

async function onlyLogin(req,res,next) {
    const {cookie}=req.body
    console.log("comming in middleware",req.body,cookie);

    if(!cookie){
        return res.status(200).json({message:"please login aa"})
    }
    const payload=verifyToken(cookie)
    // console.log("payload",payload);
    if (!payload ) {
       return res.status(404).json({message:"please login ok"})
    }
    const email=payload.email;
    req.email=email
    // console.log("login successfully");
    
    next()
}

module.exports={onlyLogin}