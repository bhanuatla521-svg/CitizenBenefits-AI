const Scheme = require('../models/Scheme');

class RecommendationEngine {
  static async calculateEligibilityScore(user, scheme) {
    let score = 0;

    if (scheme.eligibility.minAge && scheme.eligibility.maxAge) {
      if (user.age >= scheme.eligibility.minAge && user.age <= scheme.eligibility.maxAge) {
        score += 25;
      }
    }

    if (scheme.eligibility.minIncome && scheme.eligibility.maxIncome) {
      if (user.income >= scheme.eligibility.minIncome && user.income <= scheme.eligibility.maxIncome) {
        score += 25;
      }
    }

    if (scheme.eligibility.states && scheme.eligibility.states.includes(user.state)) {
      score += 20;
    }

    if (scheme.eligibility.occupations && scheme.eligibility.occupations.includes(user.occupation)) {
      score += 20;
    }

    if (scheme.eligibility.categories && scheme.eligibility.categories.includes(user.category)) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  static async getRecommendations(user, limit = 10) {
    try {
      const schemes = await Scheme.find({ isActive: true });

      const recommendationsWithScores = await Promise.all(
        schemes.map(async (scheme) => ({
          scheme,
          score: await this.calculateEligibilityScore(user, scheme)
        }))
      );

      const filtered = recommendationsWithScores
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      return filtered.map(item => ({
        ...item.scheme.toObject(),
        matchScore: item.score
      }));
    } catch (error) {
      throw new Error(`Recommendation engine error: ${error.message}`);
    }
  }
}

module.exports = RecommendationEngine;
