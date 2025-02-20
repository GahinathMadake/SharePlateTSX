const FAQ = require('../models/FAQ');
const { authMiddleware, isAdmin } = require('../middlewares/Authentication');

// @desc    Get all FAQs
// @route   GET /api/faq
// @access  Public
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(faqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add a new FAQ
// @route   POST /api/faq
// @access  Admin only
const addNewFAQ = async (req, res) => {
  const { question, answer } = req.body;
  console.log("Question:", question);
  console.log("Answer:", answer);
  try {
    const newFAQ = new FAQ({
      question,
      answer,
    });

    const savedFAQ = await newFAQ.save();
    res.json(savedFAQ);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete a FAQ
// @route   DELETE /api/faq/:id
// @access  Admin only
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ msg: 'FAQ not found' });
    }

    await FAQ.deleteOne({ _id: req.params.id });

    res.json({ msg: 'FAQ removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllFAQs,
  addNewFAQ,
  deleteFAQ,
};