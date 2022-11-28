const mongoClient = require("../connections/mongo_connection").get();

// an api to get wikiflix rating for a movie
// returns NA if there is not wikiflix rating for that particular movie
const get_rating = async(req,res,next)=>{
    try{
        let titleId = req.body.titleId;

        let rating = await mongoClient.db.collection('ratings')
                                .aggregate([{$match:{titleId}},
                                    {
                                      $group:
                                        {
                                          _id: "$titleId",
                                          rating: { $avg: "$rating" },
                                          count: { $sum: 1 }
                                        }
                                    }
                                  ]).toArray();
                                    
        if(rating.length >0){
            res.send({status:true,payload:rating[0]});
        }    
        else{
            res.send({status:true,payload:false});
        }                    
                                  
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_rating;