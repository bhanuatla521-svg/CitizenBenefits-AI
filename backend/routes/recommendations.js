const express = require('express');
const router = express.Router();
const User = require('../models/User');
const RecommendationEngine = require('../services/recommendationEngine');

router.post('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recommendations = await RecommendationEngine.getRecommendations(user);
    
    res.json({
      message: 'Recommendations generated successfully',
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
