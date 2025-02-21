const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/Authentication');
const {raiseUserQuery} = require('../controllers/Help');

router.post('/raiseQuery', authMiddleware, raiseUserQuery);

module.exports = router;