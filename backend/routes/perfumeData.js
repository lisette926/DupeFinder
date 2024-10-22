const express = require('express');
const router = express.Router();
const LuxuryData = require('../models/luxury');
const DupeData = require('../models/dupes'); 

// Route to get all luxury data
router.get('/lux-data', async (req, res) => {
  try {
    const data = await LuxuryData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add new luxury data
router.post('/lux-data', async (req, res) => {
  const luxData = new LuxuryData({
    name: req.body.name,
    top_notes: req.body.top_notes,
    middle_notes: req.body.middle_notes,
    bottom_notes: req.body.bottom_notes,
    dupes: req.body.dupes,
    image: req.body.image,
  });

  try {
    const newLuxData = await luxData.save();
    res.status(201).json(newLuxData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all dupe data
router.get('/dupe-data', async (req, res) => {
  try {
    const data = await DupeData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add new dupe data
router.post('/dupe-data', async (req, res) => {
  const dupeData = new DupeData({
    name: req.body.name,
    // top_notes: req.body.top_notes,
    // middle_notes: req.body.middle_notes,
    // bottom_notes: req.body.bottom_notes,
    image: req.body.image,
  });

  try {
    const newDupeData = await dupeData.save();
    res.status(201).json(newDupeData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;