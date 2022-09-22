const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
  },
  doctorName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('appointments', AppointmentSchema);
