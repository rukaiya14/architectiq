export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pivotPoint, teamSize, experience, timeline, architecture, riskLevel } = req.body;

  try {
    // Generate persona-based recommendations
    const recommendations = generateRecommendations(pivotPoint, teamSize, experience, timeline, architecture, riskLevel);
    
    res.status(200).json(recommendations);

  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateRecommendations(pivotPoint, teamSize, experience, timeline, architecture, riskLevel) {
  const recommendations = {
    primary: '',
    alternatives: [],
    migrationPath: [],
    businessImpact: '',
    timeline: '',
    costAnalysis: {}
  };

  // Architect Persona (Critical/Warning)
  if (riskLevel === 'critical') {
    recommendations.primary = `🚨 MATHEMATICAL REALITY CHECK: Your Pivot Point of ${pivotPoint} indicates severe architectural overload. This choice will cost you 2.5x in development time and budget.`;
    
    recommendations.alternatives = [
      'Start with a well-structured monolith',
      'Build modular boundaries for future extraction',
      'Focus on business logic over infrastructure complexity'
    ];

    recommendations.migrationPath = [
      `Phase 1 (Months 1-${Math.min(6, timeline)}): Build monolith with clear service boundaries`,
      `Phase 2 (Month ${Math.min(6, timeline) + 1}+): Extract first service when team > 8 developers`,
      'Phase 3: Full migration when Pivot Point > 1.5'
    ];

    recommendations.businessImpact = `While competitors ship features weekly, your team will struggle with monthly releases. This architectural choice could delay your MVP by 4-6 months.`;

  } else if (riskLevel === 'warning') {
    recommendations.primary = `⚠️ COMPLEXITY TAX APPLIES: Your choice incurs a 1.8x development multiplier. Proceed with caution and strong monitoring.`;
    
    recommendations.alternatives = [
      'Consider hybrid approach with gradual complexity',
      'Invest in team training and tooling',
      'Establish clear operational procedures'
    ];

    recommendations.businessImpact = `Feature velocity will decrease by ~40%. Budget an additional ${Math.round(teamSize * 2 * 1.8)} developer-months for the first year.`;

  } else if (riskLevel === 'good' || riskLevel === 'excellent') {
    recommendations.primary = `✅ SUSTAINABLE CHOICE: Your Pivot Point of ${pivotPoint} indicates your team can handle this architecture effectively.`;
    
    recommendations.alternatives = [
      'Establish monitoring and success metrics',
      'Plan for scaling triggers',
      'Document architectural decisions'
    ];

    recommendations.businessImpact = `This choice supports your business goals with manageable complexity. Expected feature delivery remains on target.`;
  }

  // Cost Analysis
  const baseCost = teamSize * 10000; // $10k per developer per month
  const complexityMultiplier = riskLevel === 'critical' ? 2.5 : riskLevel === 'warning' ? 1.8 : 1.0;
  
  recommendations.costAnalysis = {
    monthlyCost: Math.round(baseCost * complexityMultiplier),
    yearlyImpact: Math.round(baseCost * complexityMultiplier * 12),
    alternativeSavings: Math.round(baseCost * (complexityMultiplier - 1) * 12),
    reinvestmentOpportunities: [
      `${Math.round((complexityMultiplier - 1) * teamSize * 2)} additional developer-months`,
      `$${Math.round(baseCost * (complexityMultiplier - 1) * 6)} for customer acquisition`,
      `${Math.round((complexityMultiplier - 1) * 4)} major features that could be built instead`
    ]
  };

  // Timeline Analysis
  const baseTimeline = timeline;
  const adjustedTimeline = Math.round(baseTimeline * complexityMultiplier);
  recommendations.timeline = `Expected delivery: ${adjustedTimeline} months (${adjustedTimeline - baseTimeline} month delay due to complexity)`;

  return recommendations;
}