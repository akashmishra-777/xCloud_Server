const nodemailer = require("nodemailer")

async function SendMail(to,text,successMsg) {
    
const auth  =  nodemailer.createTransport({
    service:"gmail",
    secure:true,
    port:465,
    auth:{
        user:"xcloud.akashdev@gmail.com",
        pass:process.env.APP_PASSWORD
    }
})


const reciever = {
    from:"xcloud.akashdev@gmail.com",
    to:to,
    subject:"Account verification link from xCloud",
    text:text
}

auth.sendMail(reciever,(error)=>{
    if(error){
        return {success:false,why:error.message}
    }else{
        return {success:true,msg:successMsg}
    }
    
})
}


module.exports = SendMail