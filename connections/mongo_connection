const mongodb = require("mongodb");
const config = require("../config.js");

var state = {
    db: null
};

module.exports.connect = () =>
    new Promise((resolve, reject) => {
        if (state.db) return resolve();

        mongodb.MongoClient.connect(
            config.mongo_url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            function (err, database) {
                if (err) {
                    reject(err);
                    console.log(err);
                    process.exit(1);
                }
                // Save database object from the callback for reuse.
                client = database.db(config.database_name);
                state.db = client;
                resolve();
                //  /console.log(db)
                console.log("Database connection ready");
            }
        );
    });

module.exports.get = function () {
    return state;
};
