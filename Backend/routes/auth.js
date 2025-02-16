const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const OTP = require('../models/OTP');
const { check } = require('express-validator');
const sendEmail = require('../utils/sendEmail');
const otpVerificationTemplate = require('../utils/OTPVerification');

const {sendOTPUsingEmail, OTPVerification, AuthenticateUser, ForgotPasswordOTP, ForgotPassword, resetPassword} = require('../controllers/Auth');



// @route   POST /api/auth/send-otp
// @desc    Register a new user with email verification
// @access  Public
router.post(
  '/send-otp',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  sendOTPUsingEmail
);




// @route   POST /api/auth/verify-email
// @desc    Verify email using OTP
// @access  Public
router.post('/verify-email', OTPVerification);



// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  AuthenticateUser
);



// @route   POST /api/auth/forgot-password
// @desc    Send OTP to user's email for password reset
// @access  Public
router.post('/forgot-password', ForgotPasswordOTP);




// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and allow password reset
// @access  Public
router.post('/verify-otp', ForgotPassword);



// @route   POST /api/auth/reset-password
// @desc    Reset user's password after OTP verification
// @access  Public
router.post('/reset-password', resetPassword);


module.exports = router;