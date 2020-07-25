const MongoClient = require('mongodb').MongoClient;

var connect = url => MongoClient.connect(url).then(client => client.db());

var createuDbUrl = function (db) {

    if(process.env.NODE_ENV != "development") {
        return "mongodb://" + db.userName + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.name + "?" +"authSource=" + db.authSource;
    } else {
        return "mongodb://" + db.host + ":" + db.port + "/" + db.name ;
    }
};

module.exports = async function(conf){

    conf = conf.map(x => connect(createuDbUrl(x)));
    let dataBases =  await Promise.all(conf);
    return {
        core: dataBases[0],
        login: dataBases[1],
        user: dataBases[2]
    };
};