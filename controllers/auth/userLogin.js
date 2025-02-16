const USER = require("../../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



async function UserLogin(req,res) {
    const {userEmail,password} = req.body
    
    // Checking if we have recieved required credentials on the server or not

    if(userEmail && password){
        
        // Checking user exists or not

        const checkingUserExistence = await USER.findOne({email:userEmail})

        if(checkingUserExistence){
            const payload = {
                id:checkingUserExistence._id
            }

            // Genarating access token for 100 days

            const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"100d"})
            
            // Response, that access token is generated successfully

            res.status(200).json({
                accessToken:token,
                success:true,
                msg:"Access token generated successfully."
            })

        }else{
            res.json({
                msg:"Account not found",
                success:false
            })
        }

        // res.status(200).json({msg:"User credentials are recieved on the server",success:true})
    }else{
        res.status(400).json({msg:"User credentials are not recieved on the server",success:false})
    }
}


module.exports = UserLogin