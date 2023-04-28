const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true

        },
        password:{
            type:String,
            require:true
        }
    },
    {
        timestamp:true
    }
)


module.exports= mongoose.model('user',userSchema)