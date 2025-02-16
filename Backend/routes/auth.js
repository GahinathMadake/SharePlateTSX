const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const OTP = require('../models/OTP');
const { check, validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');
const otpVerificationTemplate = require('../utils/OTPVerification');

// @route   POST /api/auth/register
// @desc    Register a new user with email verification
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, location, phone, registrationNumber } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const otp = crypto.randomBytes(3).toString('hex');
      await OTP.create({ email, otp });

      // Split name into first and last name
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Send OTP via email using the template
      const subject = 'Email Verification - SharePlate';
      const htmlContent = otpVerificationTemplate(firstName, lastName, otp, 'verification');
      await sendEmail(email, subject, null, htmlContent);

      res.json({ msg: 'OTP sent to your email for verification' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST /api/auth/forgot-password
// @desc    Send OTP to user's email for password reset
// @access  Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const otp = crypto.randomBytes(3).toString('hex');
    await OTP.create({ email, otp });

    // Split name into first and last name
    const [firstName, ...lastNameParts] = user.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    // Send OTP via email using the template
    const subject = 'Password Reset - SharePlate';
    const htmlContent = otpVerificationTemplate(firstName, lastName, otp, 'reset');
    await sendEmail(email, subject, null, htmlContent);

    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email using OTP
// @access  Public
router.post('/verify-email', async (req, res) => {
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
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
);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and allow password reset
// @access  Public
router.post('/verify-otp', async (req, res) => {
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
});

// @route   POST /api/auth/reset-password
// @desc    Reset user's password after OTP verification
// @access  Public
router.post('/reset-password', async (req, res) => {
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
});


module.exports = router;