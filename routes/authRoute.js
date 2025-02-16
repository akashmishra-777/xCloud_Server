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

    if(signature && id.length == 24){

        const checkUserExistance = await USER.find({_id:id})
        if(!checkUserExistance){
            res.json({
                msg:"User doesn't exist.",
                success:false
            })
        }else{
           try {
            const updationResponse = await USER.findByIdAndUpdate(id, {isEmailVerified:true})
            res.sendFile(path.join(__dirname,"../public","index.html"))
           } catch (error) {
            console.log(error.message)
            res.json({msg:"Invalid params",success:false,acknowledge:"akashdev"})
           }
            
            // check status updated or not
              
        }

    }else{
        res.json({msg:"Invalid credentials",success:false})
    }

   
})


router.post("/userLogin",UserLogin)





module.exports = router