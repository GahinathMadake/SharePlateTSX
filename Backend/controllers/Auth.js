
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
   console.log("Request is Coming");

  const { name, email, password, confirmPassword, role, registrationNumber } = req.body;

    if (!name || !email || !password || !confirmPassword || !role){
      return res.status(400).json({
        success:false,
        message:"All fields are Manadetory",
      });
    }

    if(password !== confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Password and Confirm password not Matching",
      });
    }

    if(role==="NGO" && !registrationNumber){
      return res.status(400).json({
        success:false,
        message:"Registration Number is Required",
      });
    }

    try {

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success:false,
          message:"User aleready exist",
        });
      }

      // Generate OTP
      const otp = crypto.randomBytes(3).toString('hex').toLowerCase(); // Generates a 6-character OTP

      // Save OTP to database
      await OTP.create({ email, otp });

      // Send OTP via email
      const subject = 'Shareplat - Verify your Eamail';
      const text = `Your OTP for email verification is: ${otp}. It is valid for 5 minutes.`;
      const htmlBody = otpVerificationTemplate(name, otp, "verification");

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

  const { email, name, password, role, registrationNumber } = req.body.userData;
  const {otp} = req.body;
  try {

    // Find OTP in database
    const storedOTP = await OTP.findOne({ email })
        .sort({ createdAt: -1 })
        .limit(1);

    if (!storedOTP && otp !== storedOTP) {
      return res.status(400).json({
        success:false,
        message: 'Invalid OTP' 
      });
    }
    

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
      registrationNumber,

      isVerified: role=="NGO"?false:true, // Default to false for NGOs
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        email:email,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      sameSite: "Strict",
      maxAge: 12 * 60 * 60 * 1000,
    }).status(200)
      .json({
        success: true,
        message: "User registered successfully!",
    });

  } 
  catch (err) {
    console.error(err.message);
    res.status(500).json({
      success:false,
      message:err.message,
     })
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
          email: user.email,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        sameSite: "Strict",
        maxAge: 12 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User Login successfull!",
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
    const otp = crypto.randomBytes(3).toString('hex').toLowerCase();
    console.log(`Generated OTP for ${email}: ${otp}`);

    // Save OTP to database
    const otpEntry = new OTP({ email, otp });
    await otpEntry.save();

    // Send OTP via email
    const subject = 'Password Reset OTP';
    const htmlBody = otpVerificationTemplate(user.name, otp, 'reset');
    
    try {
      await sendEmail(email, subject, '', htmlBody);
      res.json({ msg: 'OTP sent to your email' });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Clean up OTP if email fails
      await OTP.deleteOne({ email, otp });
      return res.status(500).json({ 
        msg: 'Failed to send OTP email',
        error: emailError.message 
      });
    }
  } catch (err) {
    console.error('Error in ForgotPasswordOTP:', err);
    res.status(500).json({ 
      msg: 'Server error',
      error: err.message 
    });
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

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Find OTP in database
    const storedOTP = await OTP.findOne({ email, otp: otp.toLowerCase() });
    if (!storedOTP) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }
    
    // Log the OTP for debugging
    console.log(`Retrieved OTP for ${email}: ${storedOTP.otp}`);

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete OTP from database
    await OTP.deleteOne({ email, otp: otp.toLowerCase() });

    res.json({ success: true, msg: 'Password reset successfully' });
  } catch (err) {
    console.error('Error in resetPassword:', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {sendOTPUsingEmail, OTPVerification, AuthenticateUser, ForgotPasswordOTP, ForgotPassword, resetPassword}