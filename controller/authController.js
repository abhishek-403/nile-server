const User = require('../models/Users');
const { success, error } = require('../utils/responseWrapper');

const signUpController = async (req,res)=>{

    try {
        const {name,email,password} = req.body;
        if(!email || !password){
            return res.send(error(400,"All fields required!"))
        }


        const invalid = await User.findOne({email});

        if(invalid){
            return res.send(error(400,"User already exists."))

        }

              
        
        const currUser= await User.create({
            name,email,password
        })
        
        return res.send(success(200,{currUser}))
    } 
    catch (e) {
        return res.send(error(500, e.message))
        
    }



}

const loginController = async (req,res)=>{

    try {





        
    } catch (e) {
        return res.send(error(500, e.message))
    }
    


}



module.exports ={
    signUpController

}