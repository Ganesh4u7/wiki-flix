const mongoClient = require("../connections/mongo_connection").get();

// an api to check if a user rated a movie
const check_user_rating = async(req,res,next)=>{
    try{
        let body = req.body;

        let rating_exists = await mongoClient.db.collection('ratings')
                                        .findOne({...body});

        console.log(rating_exists)                                
            
        if(rating_exists){
            res.send({status:true,payload:rating_exists});                               
        }   
        else{
            res.send({status:false,payload:{}});                               
        }                             
        
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = check_user_rating;