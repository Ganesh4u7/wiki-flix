const express = require("express");
let bodyparser = require("body-parser");
const cors = require("cors");
let path = require('path');

const config = require("./config");

const mongo_db = require("./connections/mongo_connection");
const { validate } = require("./utils/body_checker");


let app_init = async () => {
    // ────────────────  mongodb connections ─────────────────────────────────
    
    await mongo_db.connect();
  
    // ────────────────────────────────────────────────────────────────────────────────

  const routes = require("./routes");
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());
  //  app.use(validate);
  
     app.use(bodyparser.urlencoded({ extended: false }));
  
   app.options('*', cors())
   
   app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   
     next();
   });

   app.use(express.static(path.join(__dirname, './dist/wiki-flix-frontend')));

   app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"./dist/wiki-flix-frontend/index.html"));
  });
  app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"./dist/wiki-flix-frontend/index.html"));
  });
  app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname,"./dist/wiki-flix-frontend/index.html"));
  });

   app.use(routes);
  
    app.listen(process.env.PORT || 80, () => {
      console.log(`App listening on port ${process.env.PORT || 80}`);
    });
  };
  
  app_init();
  