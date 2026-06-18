const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find({ isActive: true });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const schemes = await Scheme.find({ 
      category: req.params.category,
      isActive: true 
    });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
