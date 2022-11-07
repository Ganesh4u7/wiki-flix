const mongoClient = require("../connections/mongo_connection").get();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const {xtoken} =require('../config');


let key = require('../config').key;

let algorithm = 'aes-256-cbc'; // or any other algorithm supported by OpenSSL

// an api to validate a user's ceredentails and login

const user_login = async(req,res,next) => {

    try{
        let user = req.body.username;
        let pwd,encrypted,user_data;
        let email_check = req.body.email_check;


        
        if(email_check){
            user_data = await mongoClient.db.collection('user_details').findOne({email:user});
            encrypted = user_data.password;
        }
        else{
            user_data = await mongoClient.db.collection('user_details').findOne({username:user});
            encrypted = user_data.password;
        }

            pwd = req.body.password;
            let decipher = crypto.createDecipheriv(algorithm, key, user_data.init_vector);

            let decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

            //  console.log(decrypted);

            if(decrypted == pwd){

            let token = jwt.sign({username:user},xtoken,{
                    expiresIn: 86400 // expires in 24 hours
                });

                res.send({status:true,token,user_data,payload:"Valid Credentials"});
                return;
            }

        
        res.send({status:false,payload:"Invalid Credentials"});
        return;

    }
    catch(error){
        console.log(error);
    }
}

module.exports = user_login;