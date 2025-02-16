const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    isEmailVerified:{
        type:Boolean,
        required:true,
        default:false
    },

    password:{
        type:String,
        required:true,
    }

},{timestamps:true})



userSchema.pre("save",async function(next){
    if(!this.isModified("password"))  return next()
    
        try {
            this.password = await bcrypt.hash(this.password,10)
            console.log(this.password)
            next()
        } catch (error) {
            
        }
})


const USER = mongoose.model("user",userSchema)


module.exports = USER