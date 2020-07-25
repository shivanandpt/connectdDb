const dotenv = require('dotenv').config();
const path = require('path');
const convict = require('convict');
const schema = require('./config/schema');
var rootPath = path.normalize(__dirname + "../../../");

var conf = convict(schema);
var env = conf.get('env');
conf.loadFile(rootPath + "server/conf/config/" + env + ".json");
conf.validate({ strict: true });
conf.load({
    rootPath: rootPath
});
console.log("conf loaded !!!")
module.exports = conf;