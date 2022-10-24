const mongoClient = require("../connections/mongo_connection").get();
const nodemailer = require('nodemailer');
const {auth} = require('../config');

// this function will verify if the otp entred by the user is correct 
const verify_account = async(req,res,next)=>{
    try{
        let email =req.body.email;
        let entered_otp = req.body.otp;

        let user_details = await mongoClient.db.collection('user_details').findOne({email});
        // console.log(typeof(parseInt(entered_otp)),typeof(user_details.otp));

        if(user_details.otp === parseInt(entered_otp)){
            await mongoClient.db.collection('user_details').updateOne({email},{$set:{isVerified:true}});
            res.send({status:true,payload:"Account successfully verified"});
            return;
        }
            res.send({status:false,payload:"Invalid OTP"});
        

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = verify_account;