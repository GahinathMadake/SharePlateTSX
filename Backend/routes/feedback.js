const express = require('express');
const router = express.Router();

const {getAllFeedbackWithDonor , getAllFeedbacksWithDonations} = require('../controllers/Feedback');
const { authMiddleware } = require('../middlewares/Authentication');


router.get('/getDonorFeedBack', authMiddleware, getAllFeedbackWithDonor);
router.get('/all-feedbacks', authMiddleware, getAllFeedbacksWithDonations);


module.exports = router;