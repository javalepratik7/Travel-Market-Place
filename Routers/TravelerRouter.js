const express =require("express")
const router=express.Router()
const {applyTour,history,tours,payment}=require("../controllers/TravelerController")
const {onlyLogin}=require("../Middlewares/middleware")

router.post("/applyTour",applyTour),
router.post("/history",onlyLogin,history)
router.post("/tours",tours)
router.post("/payment",onlyLogin,payment)

module.exports=router