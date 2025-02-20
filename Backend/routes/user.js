const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');
const {getUser,FetchRoleBasedData,yearlyChartData} = require('../controllers/User');

router.get("/getUser", authMiddleware, getUser);
router.get("/role",FetchRoleBasedData);
router.get("/yearly-chart-data",yearlyChartData);

module.exports = router;