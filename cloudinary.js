const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dfj0ds2pr', 
    api_key: '746486236681365', 
    api_secret: '6nfsifBWa2-pmzL63_90lxZ5SXg' 
});

// async function uploadOnCloudinary(localFilePath) {
    
//     console.log("comming to cloudinary");
    
//     try {
//         if (!localFilePath) {
//             return null
//         }
//         const responce=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
//         //uploader.upload this is thefunction using we can upload files () here we give file path and which type of file
        
//         console.log("file is uploaded on cloudinary",responce);
//         return responce
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         console.log(error);   
//         return error
//     }
// }


module.exports={cloudinary}