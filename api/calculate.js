export default function handler(req, res) {
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

  const { teamSize, experience, timeline, scale, architecture } = req.body;

  try {
    // Experience multipliers
    const experienceMultipliers = {
      'junior': 0.5,
      'mixed': 0.75,
      'senior': 1.0,
      'expert': 1.5
    };

    // Base complexity values
    const baseComplexity = {
      'monolith': 20,
      'serverless': 60,
      'microservices': 80,
      'hybrid': 65
    };

    // Calculate Team Complexity Score (TCS)
    const experienceMultiplier = experienceMultipliers[experience] || 1.0;
    const timelineFactor = timeline >= 12 ? 1.2 : timeline >= 6 ? 1.0 : 0.8;
    const tcs = teamSize * experienceMultiplier * timelineFactor;

    // Calculate Workload Suitability Factor (WSF)
    const workloadSuitabilityFactor = calculateWSF(architecture, scale);

    // Calculate Architecture Complexity Index (ACI) with WSF
    const timelinePressure = timeline < 3 ? 1.5 : timeline < 6 ? 1.2 : 1.0;
    const scaleMultiplier = scale > 10000 ? 1.5 : scale > 1000 ? 1.2 : 1.0;
    const aci = baseComplexity[architecture] * timelinePressure * scaleMultiplier * workloadSuitabilityFactor;

    // Calculate Pivot Point
    const pivotPoint = tcs / aci;

    // Determine risk level and persona
    let riskLevel, persona, complexityTax;
    
    if (pivotPoint < 0.5) {
      riskLevel = 'critical';
      persona = 'architect';
      complexityTax = 2.5;
    } else if (pivotPoint < 0.8) {
      riskLevel = 'warning';
      persona = 'architect';
      complexityTax = 1.8;
    } else if (pivotPoint < 1.0) {
      riskLevel = 'caution';
      persona = 'consultant';
      complexityTax = 1.3;
    } else if (pivotPoint < 1.5) {
      riskLevel = 'good';
      persona = 'consultant';
      complexityTax = 1.0;
    } else {
      riskLevel = 'excellent';
      persona = 'cto';
      complexityTax = 1.0;
    }

    // Check for dealbreakers
    const dealbreakers = [];
    if (architecture === 'microservices' && (teamSize < 6 || experience === 'junior' || timeline < 6)) {
      dealbreakers.push('Microservices requires 6+ developers, mixed+ experience, 6+ month timeline');
    }
    if (architecture === 'serverless' && experience === 'junior') {
      dealbreakers.push('Serverless requires understanding of vendor lock-in and cold start issues');
    }

    // Generate recommendation
    let recommendation = '';
    if (pivotPoint < 0.5) {
      recommendation = `Critical: Your Pivot Point of ${pivotPoint.toFixed(2)} indicates mathematical overload. Consider starting with a monolith.`;
    } else if (pivotPoint < 1.0) {
      recommendation = `Warning: Complexity tax of ${complexityTax}x will apply. Monitor team velocity closely.`;
    } else {
      recommendation = `Good choice: Your team can handle this architecture with Pivot Point of ${pivotPoint.toFixed(2)}.`;
    }

    res.status(200).json({
      tcs: Math.round(tcs * 100) / 100,
      aci: Math.round(aci * 100) / 100,
      pivotPoint: Math.round(pivotPoint * 100) / 100,
      riskLevel,
      persona,
      complexityTax,
      dealbreakers,
      recommendation,
      calculations: {
        experienceMultiplier,
        timelineFactor,
        timelinePressure,
        scaleMultiplier,
        baseComplexity: baseComplexity[architecture],
        workloadSuitabilityFactor
      }
    });

  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to calculate Workload Suitability Factor (WSF)
function calculateWSF(architecture, scale) {
  // Infer workload type from Scale Ambitions
  const workloadType = inferWorkloadType(scale);
  
  // WSF multipliers per workload type and architecture
  const wsfMultipliers = {
    'steady': {
      'monolith': 0.8,
      'serverless': 1.2,
      'microservices': 1.1,
      'hybrid': 1.0
    },
    'mixed': {
      'monolith': 1.0,
      'serverless': 1.0,
      'microservices': 1.0,
      'hybrid': 1.0
    },
    'bursty': {
      'monolith': 1.2,
      'serverless': 0.6,
      'microservices': 0.9,
      'hybrid': 1.1
    }
  };

  return wsfMultipliers[workloadType][architecture] || 1.0;
}

// Helper function to infer workload type from scale ambitions
function inferWorkloadType(scale) {
  // Map Scale Ambitions to workload patterns
  const workloadMapping = {
    'utility': 'steady',    // Enterprise Utility → Steady workload
    'saas': 'mixed',        // SaaS Product → Mixed workload  
    'consumer': 'bursty',   // Consumer App → Bursty / Event-driven workload
    'platform': 'mixed'    // Platform/Marketplace → Mixed workload
  };

  return workloadMapping[scale] || 'mixed';
}