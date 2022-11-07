const mongoClient = require("../connections/mongo_connection").get();

const get_rating = async(req,res,next)=>{
    try{

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_rating