const multer =require ("multer")
const path = require("path");


const storage=multer.diskStorage({
    destination: (req,file,cb)=> {
        console.log("commng to multer",file);
            cb(null,"./Services")
        },
        filename: (req,file,cb) =>{
            cb(null,file.originalname)
        req.info=file
        
    }
})

const upload = multer({ storage: storage });


// Export upload to be used in routes
module.exports = upload;
