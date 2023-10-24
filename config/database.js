const mongoose = require('mongoose');

const connerctDB = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDb Database with host: ${con.connections[0].host}`);
    });
};

module.exports = connerctDB;
