
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const OTP = require('../models/OTP');
const { check, validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

// Import OTP Templates
const otpVerificationTemplate = require('../helper/OTPVerification');


// ----------------------------------------   Send Email while Registration ---------------------------------------

const sendOTPUsingEmail = async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password, role, location, phone, registrationNumber } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Generate OTP
      const otp = crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP

      // Save OTP to database
      await OTP.create({ email, otp });

      // Send OTP via email
      const subject = 'Email Verification OTP';
      const text = `Your OTP for email verification is: ${otp}. It is valid for 5 minutes.`;
      const htmlBody = otpVerificationTemplate(name, otp);
      await sendEmail(email, subject, text, htmlBody);

      return res.status(200).json({ 
        success:true,
        message: 'OTP sent to your email for verification'
      });

    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}





// ----------------------------------------  Verify email using OTP  ---------------------------------------- 

const OTPVerification = async(req, res)=>{
  const { email, otp, name, password, role, location, phone, registrationNumber } = req.body;

  try {
    // Find OTP in database
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      location,
      phone,
      registrationNumber,
      isVerified: false, // Default to false for NGOs
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Delete OTP from database
    await OTP.deleteOne({ email, otp });

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}





//  ----------------------------------------    Authenticate user and get token   ---------------------------------------- 

const AuthenticateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}




// ----------------------------------------    Send OTP to user's email for password reset   ---------------------------------------- 
const ForgotPasswordOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP

    // Save OTP to database
    await OTP.create({ email, otp });

    // Send OTP via email
    const subject = 'Password Reset OTP';
    const text = `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`;
    await sendEmail(email, subject, text);

    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





// ----------------------------------------   Verify OTP and allow password reset   ---------------------------------------- 

const ForgotPassword = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find OTP in database
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    res.json({ msg: 'OTP verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}



// -----------------------------------------  Reset user's password after OTP verification     -----------------------------------------

const resetPassword =  async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find OTP in database
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete OTP from database
    await OTP.deleteOne({ email, otp });

    res.json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {sendOTPUsingEmail, OTPVerification, AuthenticateUser, ForgotPasswordOTP, ForgotPassword, resetPassword}