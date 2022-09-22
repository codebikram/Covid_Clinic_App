const mongoose = require('mongoose');
const { connect } = mongoose;
const url = process.env.MONGODB_URL;

const connectToMongo = async () => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb connected successfully');
  } catch (error) {
    console.log('Unable to connect \n' + error);
  }
};
module.exports = connectToMongo;
