const mongoClient = require("../connections/mongo_connection").get();

// an api to rate a movie in wikiflix
const review_a_movie = async(req,res,next)=>{
    try{
        let body = req.body;
        let titleId = req.body.titleId;
        await mongoClient.db.collection('reviews')
                        .insertOne({...body});
        let reviews = await mongoClient.db.collection('reviews')
                                .find({titleId}).toArray();


        res.send({status:true,payload:"Review added",reviews:reviews});                
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports =review_a_movie;