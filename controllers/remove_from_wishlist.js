const mongoClient = require("../connections/mongo_connection").get();

//an api to remove a movie from users watchlist
const remove_from_wishlist = async (req,res,next)=>{

    try{
        let username = req.body.username;
        let movie_id = req.body.movie_id;

        await mongoClient.db.collection('wishlist')
                    .deleteOne({username,movie_id});

         res.send({status:true,payload:"Removed from wishlist"});           
    }
    catch(error){
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = remove_from_wishlist;