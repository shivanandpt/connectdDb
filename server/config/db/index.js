const MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');

var connectMongodb = url => MongoClient.connect(url, {useUnifiedTopology: true}).then(client => client.db());

var createuDbUrl = function (db) {

    if(process.env.NODE_ENV != "development") {
        return "mongodb://" + db.userName + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.name + "?" +"authSource=" + db.authSource;
    } else {
        return "mongodb://" + db.host + ":" + db.port + "/" + db.name ;
    }
};

var connectMySql = function (db) {

    return new Promise((resolve, reject) =>{

        var connection = mysql.createConnection({
            host     : db.host,
            user     : db.user,
            password : db.password,
            database : db.name
        });
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return reject(err);
            }
            return resolve(connection);
          });
    });
};

module.exports = async function(dbType, conf){

    let dataBases
    switch (dbType) {
        case "Mongodb":
            conf = conf.map(x => connectMongodb(createuDbUrl(x), conf));
            dataBases =  await Promise.all(conf);
            break;

        case "MySql":
            conf = conf.map(x => connectMySql(x));
            dataBases =  await Promise.all(conf);
            break;

        default:
            conf = conf.map(x => connectMongodb(createuDbUrl(x)));
            dataBases =  await Promise.all(conf);
            break;
    }

    return {
        core: dataBases[0],
        login: dataBases[1],
        user: dataBases[2]
    };
};