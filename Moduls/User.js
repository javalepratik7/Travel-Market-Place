const mongoose=require("mongoose")
const {createHmac,randomBytes}=require("crypto")
const {createToken}=require("../Services/Services")

const schema=new mongoose.Schema({
    name:{
        type:String,
        requird:true
    },
    email:{
        type:String,
        requird:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        requird:true,
    },
    password:{
        type:String,
        requird:true
    },
    address:{
        type:String,
        requird:true
    },
    role:{
        type:String,
        enum:["user","agent"],
        default:"user"
    },
    
    companyName:{
        type:String,
        requird:true
    },
    pincode:{
        type:String,
        requird:true
    },
    city:{
        type:String,
        requird:true
    },
    otp:{
        type:String,
        requird:true
    },
    salt:{
        type:String
    }
})

schema.pre("save", function (next) {
    const thisUser = this;

    if (!thisUser.isModified("password")) {
        return next(); // ✅ important
    }
    console.log("working")
    const salt = randomBytes(16).toString("hex"); // ✅ fix encoding
    const hashedPassword = createHmac("sha256", salt)
        .update(thisUser.password)
        .digest("hex");

    thisUser.salt = salt;
    thisUser.password = hashedPassword;
    next();
});


schema.static("matchPassword",
    async function (email ,password) {
        const user=await this.findOne({email})
        if (!user) {return false }
        const userSalt=user.salt
        const userPassword=user.password

        const hashedPassword=createHmac("sha256",userSalt).update(password).digest("hex")

        if(userPassword !==hashedPassword){
            return false
        }
        const token=createToken(user)
        console.log("Token",token,user);
        return token
        // return true
    }
)

const User=mongoose.model("User",schema)

module.exports=User
