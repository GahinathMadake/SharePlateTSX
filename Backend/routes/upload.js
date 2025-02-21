const express = require('express');
const router = express.Router();
const { uploadImageToR2 } = require('../utils/imageupload');

// Route handler with better error handling
router.post('/', async (req, res) => {
  console.log("Upload endpoint hit");
  
  try {
    // Validate request
    if (!req.body || !req.body.base64Image || !req.body.folder) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: base64Image or folder"
      });
    }
    
    const { base64Image, folder } = req.body;
    
    // Log size for debugging (optional)
    const sizeInMB = (base64Image.length * 0.75) / (1024 * 1024);
    console.log(`Attempting to upload image of size: ${sizeInMB.toFixed(2)}MB to folder: ${folder}`);
    
    // Upload to R2
    const imageUrl = await uploadImageToR2(base64Image, folder);
    
    // Success response
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: imageUrl 
    });
  }
  catch (error) {
    console.log("Error uploading image:", error);
    
    // Error response
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message || 'Unknown error'
    });
  }
});

module.exports = router;