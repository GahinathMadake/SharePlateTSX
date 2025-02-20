const express = require('express');
const router = express.Router();
const { uploadImageToR2 } = require('../utils/imageupload');

router.post('/', async (req, res) => {
  try {
    const { base64Image, folder } = req.body;
    const imageUrl = await uploadImageToR2(base64Image, folder);
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;