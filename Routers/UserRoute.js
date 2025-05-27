const express = require("express")
const router = express.Router()
const {login,signin,forgetPassword,sendOtp,profile}=require("../controllers/UserController")
const {onlyLogin}=require("../Middlewares/middleware")


router.post("/signin",signin)
router.post("/login",login)
router.post("/forgetPassword",forgetPassword)
router.post("/sendOtp",onlyLogin,sendOtp)
router.post("/profile",onlyLogin,profile)


module.exports=router
