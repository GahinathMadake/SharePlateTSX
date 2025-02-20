const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');
const {getUser, logOut, userProfileUpdate, updateImageProfile} = require('../controllers/User');

router.get("/getUser", authMiddleware, getUser);
router.post("/logout", logOut);
router.post("/updateProfile", userProfileUpdate);
router.post("/updateProfilePic", updateImageProfile);

module.exports = router;