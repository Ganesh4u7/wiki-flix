const mongoClient = require("../connections/mongo_connection").get();

// an api to add a movie to a users wishlist
const add_to_wishlist = async (req,res,next)=>{

    try{
        
        let data = req.body;
        let wishlisted = await mongoClient.db.collection('wishlist')
                                .findOne({username:data.username,titleId:data.titleId});

        console.log(wishlisted); 
        if(!wishlisted){
            await mongoClient.db.collection('wishlist')
                                .insertOne({...data});
        }                        

         res.send({status:true,payload:"Added to wishlist"});           
    }
    catch(error){
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = add_to_wishlist;