// Create a new file (e.g., ApiData.js) to define your Mongoose schema
const mongoose = require('mongoose');

const ApiDataSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  response: {
    type: Object, // You can adjust this as per the structure of the received response
    required: true
  }
});

const ApiData = mongoose.model('ApiData', ApiDataSchema);

module.exports = ApiData;
