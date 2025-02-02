const express = require("express");
const { addFAQ,getAllFAQs,translateFAQ } = require("../controller/FAQcontroller");

const router = express.Router();

router.post('/add', addFAQ);
router.get('/all', getAllFAQs);
router.post('/translate', translateFAQ); 

module.exports = router;
