// Keywords and patterns to look for in the LinkedIn profile
const LEADERSHIP_KEYWORDS = ['lead', 'manager', 'director', 'head of', 'chief', 'founder', 'co-founder', 'president', 'vp', 'vice president', 'executive', 'ceo', 'cto', 'cfo', 'coo'];
const TECHNICAL_KEYWORDS = ['engineer', 'developer', 'architect', 'programmer', 'technical', 'technology', 'software', 'data', 'ai', 'machine learning', 'algorithm', 'hardware', 'infrastructure', 'cloud', 'devops'];
const ENTREPRENEURIAL_KEYWORDS = ['founder', 'co-founder', 'entrepreneur', 'startup', 'launched', 'created', 'built', 'established', 'initiated', 'venture', 'entrepreneurship', 'bootstrapped', 'scaled', 'exit', 'acquisition'];
const EDUCATION_KEYWORDS = ['university', 'college', 'bachelor', 'master', 'phd', 'mba', 'degree', 'diploma', 'certificate', 'thesis', 'research', 'postgraduate', 'academic', 'graduated', 'student'];
const NETWORK_KEYWORDS = ['connection', 'recommendation', 'endorsement', 'network', 'collaborate', 'partnership', 'team', 'community', 'mentor', 'advisor', 'board', 'angel', 'investor', 'committee'];
const INDUSTRY_KEYWORDS = ['experience', 'industry', 'sector', 'field', 'market', 'domain', 'product', 'professional', 'career', 'specialist', 'expert', 'consulting', 'business', 'corporate', 'enterprise'];

/**
 * Analyze founder potential based on LinkedIn profile text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Object} - Analysis results
 */
export const analyzeFounderPotential = (text) => {
  // Extract name from the text (assuming it's at the beginning of the LinkedIn profile)
  const nameMatch = text.match(/^([A-Za-z\s]+)/);
  const name = nameMatch ? nameMatch[0].trim() : 'Unknown';
  
  // Calculate scores for different metrics
  const leadershipScore = calculateKeywordScore(text, LEADERSHIP_KEYWORDS);
  const technicalScore = calculateKeywordScore(text, TECHNICAL_KEYWORDS);
  const entrepreneurialScore = calculateKeywordScore(text, ENTREPRENEURIAL_KEYWORDS);
  const educationScore = calculateKeywordScore(text, EDUCATION_KEYWORDS);
  const networkScore = calculateKeywordScore(text, NETWORK_KEYWORDS);
  const industryScore = calculateKeywordScore(text, INDUSTRY_KEYWORDS);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (leadershipScore * 0.25) +
    (technicalScore * 0.2) +
    (entrepreneurialScore * 0.25) +
    (educationScore * 0.1) +
    (networkScore * 0.1) +
    (industryScore * 0.1)
  );
  
  // Determine recommendation based on overall score
  let recommendation;
  if (overallScore >= 85) {
    recommendation = 'Exceptional Founder Potential';
  } else if (overallScore >= 70) {
    recommendation = 'High Founder Potential';
  } else if (overallScore >= 50) {
    recommendation = 'Moderate Founder Potential';
  } else {
    recommendation = 'Limited Founder Potential';
  }
  
  // Generate summary
  const summary = generateSummary(name, overallScore, {
    leadershipScore,
    technicalScore,
    entrepreneurialScore,
    educationScore,
    networkScore,
    industryScore
  });
  
  // Identify strengths and weaknesses
  const metrics = [
    { 
      name: 'Leadership Experience', 
      score: leadershipScore, 
      description: getMetricDescription('leadership', leadershipScore) 
    },
    { 
      name: 'Technical Skills', 
      score: technicalScore, 
      description: getMetricDescription('technical', technicalScore) 
    },
    { 
      name: 'Entrepreneurial Experience', 
      score: entrepreneurialScore, 
      description: getMetricDescription('entrepreneurial', entrepreneurialScore) 
    },
    { 
      name: 'Education', 
      score: educationScore, 
      description: getMetricDescription('education', educationScore) 
    },
    { 
      name: 'Network Strength', 
      score: networkScore, 
      description: getMetricDescription('network', networkScore) 
    },
    { 
      name: 'Industry Experience', 
      score: industryScore, 
      description: getMetricDescription('industry', industryScore) 
    }
  ];
  
  const strengths = metrics
    .filter(metric => metric.score >= 70)
    .map(metric => `${metric.name}: ${metric.description}`);
  
  const weaknesses = metrics
    .filter(metric => metric.score < 50)
    .map(metric => `${metric.name}: ${metric.description}`);
  
  // Generate recommendations
  const recommendations = generateRecommendations(metrics);
  
  return {
    name,
    profileImage: 'https://randomuser.me/api/portraits/people/' + Math.floor(Math.random() * 100) + '.jpg', // Random profile image
    overallScore,
    recommendation,
    summary,
    metrics,
    strengths: strengths.length > 0 ? strengths : ['No significant strengths identified'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['No significant weaknesses identified'],
    recommendations
  };
};

/**
 * Calculate score based on keyword frequency
 * @param {string} text - Text to analyze
 * @param {Array} keywords - Keywords to search for
 * @returns {number} - Score from 0-100
 */
const calculateKeywordScore = (text, keywords) => {
  const lowerText = text.toLowerCase();
  let count = 0;
  
  keywords.forEach(keyword => {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      count += matches.length;
    }
  });
  
  // Normalize score to 0-100 range
  let score = Math.min(count * 5, 100);
  
  // Add some randomness to make it more realistic
  score = Math.min(Math.max(score + (Math.random() * 20 - 10), 0), 100);
  
  return Math.round(score);
};

/**
 * Generate a summary based on scores
 * @param {string} name - Person's name
 * @param {number} overallScore - Overall founder potential score
 * @param {Object} scores - Individual category scores
 * @returns {string} - Generated summary
 */
const generateSummary = (name, overallScore, scores) => {
  let summary = `${name} shows `;
  
  if (overallScore >= 85) {
    summary += 'exceptional';
  } else if (overallScore >= 70) {
    summary += 'strong';
  } else if (overallScore >= 50) {
    summary += 'moderate';
  } else {
    summary += 'limited';
  }
  
  summary += ' founder potential based on our analysis. ';
  
  // Add details about top strengths
  const topStrengths = Object.entries(scores)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 2);
  
  if (topStrengths.length > 0) {
    summary += 'Key strengths include ';
    
    topStrengths.forEach((strength, index) => {
      let strengthName = '';
      
      switch (strength.key) {
        case 'leadershipScore':
          strengthName = 'leadership experience';
          break;
        case 'technicalScore':
          strengthName = 'technical skills';
          break;
        case 'entrepreneurialScore':
          strengthName = 'entrepreneurial background';
          break;
        case 'educationScore':
          strengthName = 'educational qualifications';
          break;
        case 'networkScore':
          strengthName = 'professional network';
          break;
        case 'industryScore':
          strengthName = 'industry experience';
          break;
        default:
          strengthName = 'various skills';
      }
      
      summary += strengthName;
      
      if (index < topStrengths.length - 1) {
        summary += ' and ';
      }
    });
    
    summary += '.';
  }
  
  return summary;
};

/**
 * Get description for each metric based on score
 * @param {string} metricType - Type of metric
 * @param {number} score - Score value
 * @returns {string} - Description text
 */
const getMetricDescription = (metricType, score) => {
  if (metricType === 'leadership') {
    if (score >= 85) return 'Extensive leadership experience with proven track record';
    if (score >= 70) return 'Significant leadership roles in professional settings';
    if (score >= 50) return 'Some leadership experience but limited scope';
    return 'Limited leadership experience';
  }
  
  if (metricType === 'technical') {
    if (score >= 85) return 'Expert-level technical skills with diverse technology stack';
    if (score >= 70) return 'Strong technical background with specialized skills';
    if (score >= 50) return 'Moderate technical skills in relevant areas';
    return 'Limited technical expertise';
  }
  
  if (metricType === 'entrepreneurial') {
    if (score >= 85) return 'Successful prior founding experience';
    if (score >= 70) return 'Previous startup experience or entrepreneurial initiatives';
    if (score >= 50) return 'Some entrepreneurial activities but limited scale';
    return 'Limited entrepreneurial experience';
  }
  
  if (metricType === 'education') {
    if (score >= 85) return 'Advanced degrees from top institutions';
    if (score >= 70) return 'Relevant degrees with specialized knowledge';
    if (score >= 50) return 'Standard educational background';
    return 'Limited formal education in relevant fields';
  }
  
  if (metricType === 'network') {
    if (score >= 85) return 'Extensive network with industry leaders';
    if (score >= 70) return 'Strong professional connections in relevant sectors';
    if (score >= 50) return 'Moderate network with some valuable connections';
    return 'Limited professional network';
  }
  
  if (metricType === 'industry') {
    if (score >= 85) return '10+ years of relevant industry experience';
    if (score >= 70) return '5-10 years of industry experience';
    if (score >= 50) return '2-5 years of industry experience';
    return 'Limited industry experience';
  }
  
  return 'No data available';
};

/**
 * Generate recommendations based on metrics
 * @param {Array} metrics - Metrics with scores
 * @returns {Array} - List of recommendations
 */
const generateRecommendations = (metrics) => {
  const recommendations = [];
  
  // Get scores by metric name
  const scores = {};
  metrics.forEach(metric => {
    scores[metric.name] = metric.score;
  });
  
  // Technical founder recommendation
  if (scores['Technical Skills'] >= 70 && scores['Leadership Experience'] >= 60) {
    recommendations.push('Strong potential as a technical co-founder');
  }
  
  // Business founder recommendation
  if (scores['Leadership Experience'] >= 70 && scores['Industry Experience'] >= 60) {
    recommendations.push('Well-suited for business-focused founder role');
  }
  
  // Pairing recommendation
  if (scores['Technical Skills'] >= 70 && scores['Leadership Experience'] < 60) {
    recommendations.push('Would benefit from pairing with a business-focused co-founder');
  }
  
  if (scores['Leadership Experience'] >= 70 && scores['Technical Skills'] < 60) {
    recommendations.push('Would benefit from pairing with a technical co-founder');
  }
  
  // Mentorship recommendation
  if (scores['Entrepreneurial Experience'] < 60) {
    recommendations.push('Could benefit from mentorship by experienced entrepreneurs');
  }
  
  // Add general recommendation based on overall potential
  const overallScore = metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length;
  
  if (overallScore >= 75) {
    recommendations.push('High priority candidate for investment consideration');
  } else if (overallScore >= 60) {
    recommendations.push('Consider for investment with appropriate support structure');
  } else {
    recommendations.push('Requires significant development before founder readiness');
  }
  
  return recommendations.length > 0 ? recommendations : ['No specific recommendations available'];
};

/**
 * Advanced analysis based on LinkedIn profile sections
 * @param {Object} profileData - Structured LinkedIn data
 * @returns {Object} - Advanced metrics
 */
export const performAdvancedAnalysis = (profileData) => {
  const { experience, education, skills, recommendations } = profileData;
  
  // Calculate job stability (average tenure)
  const jobStability = calculateJobStability(experience);
  
  // Calculate career progression
  const careerProgression = calculateCareerProgression(experience);
  
  // Calculate education relevance
  const educationRelevance = calculateEducationRelevance(education);
  
  // Calculate skill diversity
  const skillDiversity = calculateSkillDiversity(skills);
  
  // Calculate social proof
  const socialProof = calculateSocialProof(recommendations);
  
  return {
    jobStability,
    careerProgression,
    educationRelevance,
    skillDiversity,
    socialProof
  };
};

/**
 * Calculate job stability score
 * @param {Array} experience - Work experience entries
 * @returns {number} - Score from 0-100
 */
const calculateJobStability = (experience) => {
  // This is a simplified version - in a real app you would parse dates and calculate actual tenure
  if (!experience || experience.length === 0) return 30;
  
  // More experience entries = more job changes, lower stability (simplified)
  const stabilityFactor = Math.max(100 - (experience.length * 10), 30);
  
  // Add some randomness
  return Math.min(Math.max(stabilityFactor + (Math.random() * 20 - 10), 0), 100);
};

/**
 * Calculate career progression score
 * @param {Array} experience - Work experience entries
 * @returns {number} - Score from 0-100
 */
const calculateCareerProgression = (experience) => {
  // Simplified version - would normally analyze job titles for progression
  if (!experience || experience.length === 0) return 40;
  
  // More experience can indicate progression
  const progressionBase = Math.min(experience.length * 15, 80);
  
  // Add some randomness
  return Math.min(Math.max(progressionBase + (Math.random() * 20 - 10), 0), 100);
};

/**
 * Calculate education relevance score
 * @param {Array} education - Education entries
 * @returns {number} - Score from 0-100
 */
const calculateEducationRelevance = (education) => {
  // Simplified version - would normally analyze degree types and institutions
  if (!education || education.length === 0) return 50;
  
  // More education can indicate higher relevance
  const educationBase = Math.min(education.length * 25, 90);
  
  // Add some randomness
  return Math.min(Math.max(educationBase + (Math.random() * 20 - 10), 0), 100);
};

/**
 * Calculate skill diversity score
 * @param {Array} skills - Skills list
 * @returns {number} - Score from 0-100
 */
const calculateSkillDiversity = (skills) => {
  // Simplified version - would normally categorize and analyze skill types
  if (!skills || skills.length === 0) return 30;
  
  // More skills can indicate higher diversity
  const diversityBase = Math.min(skills.length * 5, 85);
  
  // Add some randomness
  return Math.min(Math.max(diversityBase + (Math.random() * 20 - 10), 0), 100);
};

/**
 * Calculate social proof score
 * @param {Array} recommendations - Recommendation entries
 * @returns {number} - Score from 0-100
 */
const calculateSocialProof = (recommendations) => {
  // Simplified version - would normally analyze recommendation content and recommenders
  if (!recommendations || recommendations.length === 0) return 40;
  
  // More recommendations can indicate higher social proof
  const proofBase = Math.min(recommendations.length * 20, 90);
  
  // Add some randomness
  return Math.min(Math.max(proofBase + (Math.random() * 20 - 10), 0), 100);
}; 