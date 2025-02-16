const USER = require("../../models/userModel.js")
const sendAccountVerificationMail = require("../../helper/nodemailer.js")

async function CreateUser(req,res) {
    try {
       const {name,email,password} = req.body
    // Checking user existance
    const userCheckResponse = await USER.find({email:email})
    // If user doesn't exists then
    if(userCheckResponse){
        const saveUserResponse = await USER.create({
            name:name,
            email:email,
            password:password
        })

            console.log(saveUserResponse)

        // Text for user account activation link
        const textMsaageForAccountVerification = `Hey! ${saveUserResponse.name}, Your xCloud account verification link is : \n https://xcloud-server.onrender.com/auth/verified/${saveUserResponse._id}.\n Click on this link to verify your account instantly.`

        // Sending account activation link via mail
        sendAccountVerificationMail(saveUserResponse.email,textMsaageForAccountVerification,"Account activation link has been sent successfully")

        // sending response from the client that account activation link has been sent to the client form the server
        res.status(200).json({
            msg:"Account verification link has been successfully sent to the "+email,
            success:true,
            status:"200"
        })
    }else{
        // Returning response if a user already exists in the database or not
        res.json({
            msg:`${email} is already exists in the database`,
            success:false
        })
    }
    
    } catch (error) {
        // Returning the complete response weather signup is successfull or not
        res.json({
            where:"While adding a new user in the database.",
            mag:error.message,
            success:false
        })
    }
}

module.exports = CreateUser