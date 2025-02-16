const USER = require("../../models/userModel.js")


async function userAccountVerification(req,res){
    const  {user} = req.params
    console.log(user)
}


module.exports = userAccountVerification