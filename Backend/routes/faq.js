const express = require('express');
const router = express.Router();
const { getAllFAQs, addNewFAQ } = require('../controllers/faqController');
const { authMiddleware, isAdmin } = require('../middlewares/Authentication');

// @route   GET /api/faq
// @desc    Get all FAQs
// @access  Public
router.get('/', getAllFAQs);

// @route   POST /api/faq
// @desc    Add a new FAQ
// @access  Admin only
router.post('/', authMiddleware, isAdmin, addNewFAQ);

module.exports = router;