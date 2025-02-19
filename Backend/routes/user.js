const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');
const {getUser,FetchRoleBasedData} = require('../controllers/User');

router.get("/getUser", authMiddleware, getUser);
router.get("/role",FetchRoleBasedData);

module.exports = router;