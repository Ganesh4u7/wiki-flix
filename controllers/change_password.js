const mongoClient = require("../connections/mongo_connection").get();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {auth,key} = require('../config');

let algorithm = 'aes-256-cbc'; // or any other algorithm supported by OpenSSL

const ivstring = crypto.randomBytes(16); 
let iv = ivstring.toString('hex').slice(0, 16);  
// to change a password
const change_password = async (req,res,next)=>{
    try{
        // console.log('came here');
        let pwd = req.body.password;
        let email = req.body.email;

        // encrypting user password
        cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        encrypted = cipher.update(pwd);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        let user_details = {
            password:encrypted?encrypted.toString('hex'):'',
            init_vector:iv?iv.toString('hex'):'',
        };

        // updating the password in db
        await mongoClient.db.collection('user_details')
                .updateOne({email:email},{$set:{...user_details}});

        res.send({status:true,payload:"Password updated"});

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};

module.exports = change_password;