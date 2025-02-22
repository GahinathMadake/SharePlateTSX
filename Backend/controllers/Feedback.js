const Feedback = require('../models/Feedback');

const getAllFeedbackWithDonor = async (req, res) => {
  try {
    const userID = req.user.id;
    const feedbacks = await Feedback.find({donor:userID})
      .populate('ngo', 'name email')

    res.status(200).json({
        success: true,

        feedback: feedbacks 
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'Server Error'
    });
  }
};

module.exports = { getAllFeedbackWithDonor };
