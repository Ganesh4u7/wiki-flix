const mongoClient = require("../connections/mongo_connection").get();

// an api to get watchlist of a user
const get_wishlist = async (req,res,next)=>{

    try{
        let username = req.body.username;

        let wishlist = await mongoClient.db.collection('wishlist')
                    .find({username}).toArray();

         res.send({status:true,payload:wishlist});           
    }
    catch(error){
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_wishlist;