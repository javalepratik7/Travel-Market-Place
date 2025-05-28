const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const secretKey=process.env.SECRET

function createToken(user){
    // console.log("creating")

    const payload={
        name:user.name,
        email:user.email,
        mobileNo:user.mobileNo
    }
    const a=jwt.sign(payload,secretKey)
    // console.log(a);
    return a
}

function verifyToken(token) {
    console.log("comming to verify");
    let value;
    try {
        console.log(value,token);
        value =jwt.verify(token,secretKey)
        console.log(value);
        const email=value.email;
        
    } catch (error) {
        console.log("error occures du to ",error);
    }
    return value
}

module.exports={createToken,verifyToken}

