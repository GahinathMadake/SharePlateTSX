const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/Authentication');
const {raiseUserQuery, fetchUserQuery} = require('../controllers/Help');

router.post('/raiseQuery', authMiddleware, raiseUserQuery);
router.get('/user-queries', authMiddleware, fetchUserQuery);


module.exports = router;