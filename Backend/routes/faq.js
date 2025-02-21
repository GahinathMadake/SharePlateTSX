const express = require('express');
const router = express.Router();
const { getAllFAQs, addNewFAQ, deleteFAQ } = require('../controllers/faqController');
const { authMiddleware, isAdmin } = require('../middlewares/Authentication');

// @route   GET /api/faq
// @desc    Get all FAQs
// @access  Public
router.get('/', getAllFAQs);

// @route   POST /api/faq
// @desc    Add a new FAQ
// @access  Admin only
router.post('/', authMiddleware, isAdmin, addNewFAQ);

// @route   DELETE /api/faq/:id
// @desc    Delete a FAQ
// @access  Admin only
router.delete('/:id', authMiddleware, isAdmin, deleteFAQ);

module.exports = router;