const express = require('express')
const app = express();
const mainRouter= require('./routers/')
const dotenv = require('dotenv')
dotenv.config('./.env')
const cookieParser = require('cookie-parser')

const port = 4000;


app.use(express.json())
app.use(cookieParser())



app.use("/api",mainRouter)





const mongoDb = require('./dbConnect')
mongoDb();
app.listen(port,()=>{
    console.log("Listening at",port);

})