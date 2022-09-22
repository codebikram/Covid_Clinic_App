const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { isUser } = require('../middleware/authenticate');

//secret for JWT token
const JWT_SECRET = process.env.SECRET_KEY;

//sign up
router.post('/createuser', async (req, res) => {
  let success = false;
  try {
    if (!req.body.name) throw Error('Please enter your name');
    if (!req.body.email) throw Error('Please enter your email');
    if (!req.body.contactNo) throw Error('Please enter your contact number');
    if (!req.body.location) throw Error('Please enter your location');
    if (!req.body.password) throw Error('Please enter password');
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      //password hashing
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      //save user data in mongodb
      let userData = await User.create({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        contactNo: req.body.contactNo,
        password: securePassword,
      });
      success = true;
      res.json({ success, message: 'user register successfully' });
    } else {
      return res
        .status(400)
        .json({ success, error: 'Sorry a user with this email alredy exists' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success, erorr: error.message });
  }
});

//log in
router.post('/login', async (req, res) => {
  let success = false;
  try {
    if (!req.body.email) throw Error('Please enter email');
    if (!req.body.password) throw Error('Please enter password');
    let { email, password } = req.body;
    //find the user from db
    const user = await User.findOne({ email });
    if (user) {
      //check the password matched or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        const data = {
          user: {
            id: user.id,
            role: user.role,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({
          success,
          authtoken,
          userData: user,
          message: 'Loged in successfully',
        });
      } else {
        return res
          .status(400)
          .json({ success, error: 'Please enter correct details' });
      }
    } else {
      return res
        .status(400)
        .json({ success, error: 'Please enter correct details' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success, error: error.message });
  }
});

router.get('/getuser', isUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json({ success: true, userData: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

router.put('/updateuser/:id', isUser, async (req, res) => {
  try {
    if (!req.body.name) throw Error('Please enter your name');
    if (!req.body.email) throw Error('Please enter your email');
    if (!req.body.contactNo) throw Error('Please enter your contact number');
    if (!req.body.location) throw Error('Please enter your location');
    //find the note to be update and update it
    let userDetails = await User.findById(req.params.id);
    if (!userDetails) {
      return res.status(404).send('Not found ');
    }
    await User.findByIdAndUpdate(req.params.id, req.body);
    let user = await User.findById(req.params.id);
    res.json({ success: true, message: 'Updated Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
