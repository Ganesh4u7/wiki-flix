const mongoClient = require("../connections/mongo_connection").get();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {auth,key} = require('../config');

let algorithm = 'aes-256-cbc'; // or any other algorithm supported by OpenSSL


const ivstring = crypto.randomBytes(16); 
let iv = ivstring.toString('hex').slice(0, 16); 

// an api to to signup user into wikiflix
const user_signup = async (req,res,next) =>{

    try{
        // console.log('came here');
        
        let body = req.body;
        let cipher,encrypted;
    // encrypting user entered password
 
        let pwd = req.body.password;
        cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        encrypted = cipher.update(pwd);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

    // constructing user details object
        let user_details = {
            username:body.username,
            email:body.email,
            password:encrypted?encrypted.toString('hex'):'',
            init_vector:iv?iv.toString('hex'):'',
            isVerified:false,
            verification_code:'',
            fullname:body.fullname
        };
        

        let otp = Math.floor(100000 + Math.random() * 900000);
        await mongoClient.db.collection('user_details').insertOne({...user_details,otp:otp});
       // await mongoClient.db.collection('user_details').updateOne({email},{$set:{otp:otp}});

      // sending email to user with otp for verification 
        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",  
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers:'SSLv3'
            },
            requireTLS:true,
            port: 465,
            debug: true,
            auth: auth
          });
          let mailOptions = {
            from: 'wikiflixx@gmail.com',
            to: body.email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Your otp is ' + `${otp}`
          };

        transporter.sendMail(mailOptions, function (err1, data1) {
        if (err1) {
            console.log(err1)
        }
        else {
            // console.log('Email sent !!');
            res.send({status: true,user_data:user_details,payload:" Signup Completed and Confirmation mail sent."});
        }
        });

        res.send({status:true,user_data:user_details,payload:"User Signup completed"});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = user_signup;