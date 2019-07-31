const mongoose = require('mongoose');
const environment = require('./env.config')
exports.connect = () => {
    mongoose.connect(environment.mongoURI, (err, res)=> {
        if(res) console.log("connected")
    }, {
        useMongoClient: true
      })
      mongoose.Promise = global.Promise;
    return mongoose;
}

exports.createConnection = () => {
    const conn = mongoose.createConnection(environment.mongoURI);
    if(conn) return conn;
    else return "Error creating connection"
}