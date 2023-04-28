const { success } = require("../utils/responseWrapper")



const allProducts = async (req,res)=>{
    return res.send(success(200,"reached"))

}

module.exports={
    allProducts
}