const express = require('express');
const router = express.Router();
const { isUser, isAdmin } = require('../middleware/authenticate');
const Appointments = require('../models/Appointment');

// fetch all appointments for admin only
router.get('/fetchAll', isAdmin, async (req, res) => {
  try {
    const appointDetails = await Appointments.find();
    res.json({ success: true, data: appointDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});
// fetch his own appointments for a particular patient
router.get('/fetchAppoints', isUser, async (req, res) => {
  try {
    const patientId = req.user.id;
    const appointDetails = await Appointments.find({ patientId });
    res.json({ success: true, data: appointDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});
//Add Appointments
router.post('/add', isUser, async (req, res) => {
  try {
    // console.log(req.body);
    const appointmentDetails = await Appointments.create(req.body);
    res.json({
      success: true,
      data: appointmentDetails,
      message: 'Appointment booked successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

//update doctors
// router.put('/update/:id', isAdmin, async (req, res) => {
//   try {
//     //find the doctor to be update and update it
//     let doctorsDetails = await Doctors.findById(req.params.id);
//     if (!doctorsDetails) {
//       return res.status(404).send('Not found');
//     }
//     await Doctors.findByIdAndUpdate(req.params.id, req.body);
//     const updateDetails = await Doctors.findById(req.params.id);
//     res.json({
//       success: true,
//       data: updateDetails,
//       message: 'Updated Successfully',
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// Delete an appointment
router.delete('/deleteAppoint/:id', isUser, async (req, res) => {
  try {
    let details = await Appointments.findById(req.params.id);
    if (!details) {
      return res.status(404).send('Not found any Appointment details');
    }
    if (
      details.patientId.toString() === req.user.id ||
      req.user.role === 'admin'
    ) {
      details = await Appointments.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: 'Deleted successfully',
        data: details,
      });
    } else {
      return res.status(401).send('Not Allowed');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
