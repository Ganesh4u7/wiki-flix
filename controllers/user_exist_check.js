const mongoClient = require("../connections/mongo_connection").get();

// this function will check if the entered email or username already exists 
const user_exist_check = async (req,res,next) => {

    try{
        let query = req.body.query;
        let user_exist = await mongoClient.db.collection('user_details')
                                .find({...query}).toArray();
        // console.log(user_exist);                        
        if(user_exist.length>0){
            res.send({status:true,found:1});
            return;
        }
        res.send({status:true,found:0});                        
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error Occurred"}); 
    }
}

module.exports = user_exist_check;