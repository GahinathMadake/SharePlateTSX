const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');

const {getPendingNgos, approveNgo, rejectNgo, getNgoById } = require('../controllers/Ngo');

router.get("/pending",getPendingNgos);

router.get("/:id", getNgoById);
router.get("/approve/:id", approveNgo);
router.get("/reject/:id", rejectNgo);

module.exports = router;
