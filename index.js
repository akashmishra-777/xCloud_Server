require("dotenv").config()
const express = require("express")
const app = express()
const authRoute = require("./routes/authRoute.js")
const db = require("./db/db_Connection.js")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/auth",authRoute)



app.listen(process.env.PORT,()=>{
    console.log("APP IS RUNNING ON PORT:8080")
})