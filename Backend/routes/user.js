const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');
const {getUser} = require('../controllers/User');

router.get("/getuser", authMiddleware, getUser);

module.exports = router;