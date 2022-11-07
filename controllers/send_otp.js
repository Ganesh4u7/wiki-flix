const mongoClient = require("../connections/mongo_connection").get();
const nodemailer = require('nodemailer');
const {auth} = require('../config');

// this function will send an otp to user email
const send_otp = async(req,res,next) => {
    try{

        let email = req.body.email;
        // generating an otp with math.random() function

        let user_exist_check = await mongoClient.db.collection('user_details').findOne({email});

        if(user_exist_check){
          
        let otp = Math.floor(100000 + Math.random() * 900000);

        await mongoClient.db.collection('user_details').updateOne({email},{$set:{otp:otp}});

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: auth
          });
          let mailOptions = {
            from: 'wikiflixx@gmail.com',
            to: email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Your otp is ' + `${otp}` 
          };

        transporter.sendMail(mailOptions, function (err1, data1) {
        if (err1) {
            console.log(err1)
        }
        else {
            // console.log('Email sent !!');
            res.send({status: true,email:email, message: 'Otp sent successfully'});
         }
        });

    }else{
        res.send({status:false,payload:"User with the entered email not found"});
    }  

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};

module.exports = send_otp; 