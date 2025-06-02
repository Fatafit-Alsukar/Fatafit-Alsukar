const express = require("express");
const router = express.Router();
const {
  createSuccessStory,
  getSuccessStories,
} = require("../controllers/SuccessStoryController");

router.post("/", createSuccessStory);
router.get("/", getSuccessStories);

module.exports = router;