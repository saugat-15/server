const mongoose = require("mongoose");
const appConfig = require("../../config/app-config.json");
const connectionString = appConfig.uri;
const connect = async () => {
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
    // console.log(connectionString);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connect;

// akjsdaihsdkashdkj
