const mongoClient = require("../connections/mongo_connection").get();

// an api to rate a movie in wikiflix
const rate_a_movie = async(req,res,next)=>{
    try{
        let body = req.body;

        await mongoClient.db.collection('ratings')
                        .insertOne({...body});

        res.send({status:true,payload:"Rating added"});                
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports =rate_a_movie;
