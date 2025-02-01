const express = require("express");
const { createFAQ, getFAQs } = require("../controller/FAQcontroller");

const router = express.Router();

// Create FAQ route (POST)
router.post("/addfaq", createFAQ);

// Get FAQs route (GET)
router.get("/getfaqs", getFAQs);

module.exports = router;
