const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  qualification: {
    type: String,
  },
  specialization: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  location: {
    type: String,
  },
  availability: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  yoe: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('doctors', DoctorSchema);
