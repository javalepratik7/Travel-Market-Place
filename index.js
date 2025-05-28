const express=require("express")
const app=express()
const cors=require("cors")
const crypto =require("crypto")
// 1)dotenv
// 2)cookie-parser
// 3)cors

const userRouter=require("./Routers/UserRoute")
const agentRouter=require("./Routers/AgentRoute")
const travelerRouter=require("./Routers/TravelerRouter")
const {onlyLogin}=require("./Middlewares/middleware")
const {connectToMongoose}=require("./ConnectionDB")
const path=require("path")



const port=8080

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.use(cors())

app.use("/user",userRouter)
app.use("/agent",agentRouter)
app.use("/traveler",travelerRouter)
app.get("/" ,(req,res)=>{
  res.send("Welcome to the Travel Market place website")
})

connectToMongoose("mongodb+srv://test-yt:fbpeRfQjLM2RPPO6@travel.oxp093u.mongodb.net/")
.then(()=>console.log("connection successfully"))
.catch(err => console.log("error", err))

app.listen(port,()=>console.log("server started"))
