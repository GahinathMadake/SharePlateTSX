const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');
const {getUser, logOut, userProfileUpdate, updateImageProfile, yearlyChartData, FetchRoleBasedData, getDonarDataByID} = require('../controllers/User');


router.get("/getUser", authMiddleware, getUser);
router.get("/role",FetchRoleBasedData);
router.post("/logout", logOut);
router.post("/updateProfile", userProfileUpdate);
router.post("/updateProfilePic", updateImageProfile);
router.get("/donor/:donationId", authMiddleware, getDonarDataByID);
router.get("/yearly-chart-data",authMiddleware,yearlyChartData);

module.exports = router;