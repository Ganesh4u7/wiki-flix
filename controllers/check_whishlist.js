const mongoClient = require("../connections/mongo_connection").get();

// an api to check if the movie is in user watchlist
const check_wishlist = async (req,res,next)=>{

    try{

        let username = req.body.username;
        let titleId = req.body.titleId;

        let movie_exists = await mongoClient.db.collection('wishlist')
                                    .findOne({username,titleId});
                            

         if(movie_exists){
            res.send({status:true,payload:movie_exists});
         }  
         else{
            res.send({status:false,payload:"Movie doesn't exist in wishlist"});
         }                         
        
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"error occurred"});
    }
}

module.exports = check_wishlist;