const express = require("express")
const router = express.Router()
const {tour,history,appliedInfo,deleteTour}=require("../controllers/AgentController")
const upload=require("../Middlewares/fileUpload")
const {onlyLogin}=require("../Middlewares/middleware")


router.post("/tour", upload.single('Images'),onlyLogin, tour);
router.post("/history",onlyLogin,history)
router.post("/appliedInfo",onlyLogin,appliedInfo)
router.post("/deleteTour",onlyLogin,deleteTour)

module.exports=router
