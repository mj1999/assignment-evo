const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/surveyController");
const authController = require("../controllers/auth");

router.post("/submit", surveyController.submit);
router.post("/auth", authController.authorise);
router.get("/view", surveyController.view);

module.exports = router;
