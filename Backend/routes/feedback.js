const express = require('express');
const router = express.Router();

const {getAllFeedbackWithDonor} = require('../controllers/Feedback');
const { authMiddleware } = require('../middlewares/Authentication');

router.get('/getDonorFeedBack', authMiddleware, getAllFeedbackWithDonor);

module.exports = router;