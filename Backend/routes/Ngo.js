const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middlewares/Authentication');

const {getPendingNgos, approveNgo, rejectNgo, getNgoById,getTotalNgos } = require('../controllers/Ngo');

router.get("/pending",getPendingNgos);
router.get("/totalngos", getTotalNgos);
router.get("/:id", getNgoById);
router.get("/approve/:id", approveNgo);
router.delete("/reject/:id", rejectNgo);

module.exports = router;

