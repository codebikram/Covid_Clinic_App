const express = require('express');
const router = express.Router();
const Doctors = require('../models/Doctor');
const { isAdmin } = require('../middleware/authenticate');

router.get('/fetchdoctors', async (req, res) => {
  try {
    const doctors = await Doctors.find();
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

//Add doctors
router.post('/add', isAdmin, async (req, res) => {
  try {
    const doctorData = await Doctors.create(req.body);
    res.json({
      success: true,
      data: doctorData,
      message: 'Added successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

//update doctors
router.put('/update/:id', isAdmin, async (req, res) => {
  try {
    //find the doctor to be update and update it
    let doctorsDetails = await Doctors.findById(req.params.id);
    if (!doctorsDetails) {
      return res.status(404).send('Not found');
    }
    await Doctors.findByIdAndUpdate(req.params.id, req.body);
    const updateDetails = await Doctors.findById(req.params.id);
    res.json({
      success: true,
      data: updateDetails,
      message: 'Updated Successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

//delete doctors
router.delete('/delete/:id', isAdmin, async (req, res) => {
  try {
    //find the doctor to be Delete and Delete it
    let doctor = await Doctors.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send('Not found the doctors details');
    }
    doctor = await Doctors.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Deleted successfully',
      data: doctor,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
