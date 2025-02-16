const express = require("express")
const router = express.Router()
const path = require("path")
const createUser = require("../controllers/user/userSignup.js")
const USER = require("../models/userModel.js")
const UserLogin = require("../controllers/auth/userLogin.js")



// Route for creating new users in the database 
router.post("/create-user",createUser)


// Route for verifying users accounts via verification link
router.get("/verified/:signature/:id",async (req,res)=>{
    const {signature,id} = req.params
    
    //Checking that both params are recieved on the server 

    if(signature && id){

        const checkUserExistance = await USER.find({_id:id})
        if(!checkUserExistance){
            res.json({
                msg:"User doesn't exist.",
                success:false
            })
        }else{
            const updationResponse = await USER.findByIdAndUpdate(id, {isEmailVerified:true})
            
            // check status updated or not
                res.sendFile(path.join(__dirname,"../public","index.html"))
        }

    }else{
        console.log("Both things are not recieved on the server")
    }

   
})


router.post("/userLogin",UserLogin)





module.exports = router