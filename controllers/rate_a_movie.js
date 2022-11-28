const mongoClient = require("../connections/mongo_connection").get();

// an api to rate a movie in wikiflix
const rate_a_movie = async(req,res,next)=>{
    try{
        let body = req.body;
        let titleId = req.body.titleId;

        await mongoClient.db.collection('ratings')
                        .insertOne({...body});

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

        res.send({status:true,payload:"Rating added",rating:rating[0]});                
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports =rate_a_movie;
