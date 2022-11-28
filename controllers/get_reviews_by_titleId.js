const mongoClient = require("../connections/mongo_connection").get();

// an api to get wikiflix reviews for a movie
// returns NA if there aren't any wikiflix reviews for that particular movie
const get_Reviews = async(req,res,next)=>{
    try{
        let titleId = req.body.titleId;

        let reviews = await mongoClient.db.collection('reviews')
                                .find({titleId}).toArray();

                                    
        if(reviews.length > 0){
            res.send({status:true,payload:reviews});
        }    
        else{
            res.send({status:true,payload:[]});
        }                    
                                  
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_Reviews;