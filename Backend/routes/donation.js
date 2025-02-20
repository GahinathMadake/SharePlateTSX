const express = require('express');
const router = express.Router();

const {getDonations,getTotalDonations,deliverdDonationsCount} = require('../controllers/Donation');
router.get("/totaldonations", getTotalDonations);
router.get("/totaldeliveredfood", deliverdDonationsCount);
router.get("/:status", getDonations);


module.exports = router;