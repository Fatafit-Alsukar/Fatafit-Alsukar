const SuccessStory = require("../models/SuccessStroy");

exports.createSuccessStory = async (req, res) => {
  try {
    const { name, age, story } = req.body;
    const newStory = new SuccessStory({ name, age, story });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};