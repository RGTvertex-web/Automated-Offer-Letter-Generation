const express = require("express");
const { getCandidates } = require("../controllers/candidateController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCandidates);

module.exports = router;
