const express = require('express')
const app = express();
const mainRouter= require('./routers/')

const port = 4000;


app.use(express.json())

app.use("/api",mainRouter)



const mongoDb = require('./dbConnect')
mongoDb();


app.listen(port,()=>{
    console.log("Listening at",port);

})