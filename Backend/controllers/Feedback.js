const Feedback = require('../models/Feedback');


const getAllFeedbackWithDonor = async (req, res) => {
  try {
    const userID = req.user.id;
    // Corrected query to use "donor" instead of "donar"
    const feedbacks = await Feedback.find({ donor: userID }).populate('donor').populate('ngo').populate('donation');
    console.log("Feedbacks found:", feedbacks);

    if (feedbacks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for the specified donor.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback Sent Successfully",
      feedback: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = { getAllFeedbackWithDonor };
