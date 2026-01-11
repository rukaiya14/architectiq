# ArchitectIQ - Senior Technical Architect Guidance

## System Overview

ArchitectIQ is a mathematical decision-making tool that acts as a Senior Technical Architect, using quantitative analysis to prevent over-engineering and protect business runway. The system implements a three-act structure: **Interrogation → Stress Test → Verdict**.

## Core Mathematical Framework

### Team Complexity Score (TCS)
```
TCS = TeamSize × ExperienceMultiplier × TimelineFactor
```

**Experience Multipliers:**
- Junior (0-2 years): 0.5x
- Mixed experience: 0.75x  
- Senior (5+ years): 1.0x
- Expert/Architect: 1.5x

### Architecture Complexity Index (ACI)
```
ACI = BaseComplexity × TimelinePressure × ScaleMultiplier
```

**Base Complexity Values:**
- Monolith: 20 units
- Serverless: 60 units
- Microservices: 80 units
- Hybrid: 65 units

### Pivot Point Formula
```
Pivot Point = TCS ÷ ACI
```

**Interpretation:**
- **> 1.5**: Excellent choice, team can handle complexity easily
- **1.0-1.5**: Good choice, sustainable with monitoring
- **0.5-1.0**: Warning zone, complexity tax applies
- **< 0.5**: Critical zone, aggressive challenge triggered

## Decision Logic Rules

### Aggressive Challenge Triggers
The system enters "Aggressive Challenge Mode" when:
1. **Pivot Point < 0.5** (mathematical overload)
2. **User choice complexity > Recommended complexity** by 30+ units
3. **Critical dealbreakers detected** (e.g., 2-person team choosing microservices)

### Dealbreaker Conditions
- **Microservices**: Requires 6+ developers, mixed+ experience, 6+ month timeline
- **Serverless**: Requires acceptance of vendor lock-in and cold start issues
- **Hybrid**: Requires high architectural expertise and complexity management

### Complexity Tax Application
When Pivot Point < 1.0, apply penalties:
- **Critical (< 0.5)**: 2.5x cost/timeline multiplier
- **Warning (0.5-0.8)**: 1.8x multiplier
- **Caution (0.8-1.0)**: 1.3x multiplier

## Persona Guidelines

### Architect Persona (Authoritative)
**Use when:** Pivot Point < 0.8 or dealbreakers present
**Tone:** Mathematical precision, hard data
**Key phrases:**
- "The math is clear:"
- "Your Pivot Point of {X} indicates"
- "Mathematical reality check:"
- "This will cost you ${X} in complexity tax"

### Consultant Persona (Advisory)
**Use when:** Pivot Point 0.8-1.2, balanced trade-offs
**Tone:** Business-focused, risk-aware
**Key phrases:**
- "From a business perspective"
- "Consider the trade-offs"
- "Risk-adjusted recommendation:"
- "The strategic implication is"

### CTO Persona (Strategic)
**Use when:** Organizational impact, long-term planning
**Tone:** Executive summary, scaling concerns
**Key phrases:**
- "From an organizational standpoint"
- "This scales to {X} engineers"
- "Long-term architectural strategy"
- "Executive summary:"

## Emotional Scenario Templates

### Resume-Driven Development Warning
**Trigger:** Complex architecture choice with low Pivot Point
**Message:** Focus on business runway protection, competitive disadvantage
**Example:** "While your team debugs service mesh configurations, competitors using simpler architectures will ship features 4 months faster."

### Velocity Killer Warning
**Trigger:** Pivot Point < 0.5
**Message:** Specific velocity impact percentages and timeline consequences
**Example:** "Feature delivery will slow from weekly to monthly releases within 3 months."

### Operational Reality Check
**Trigger:** Dealbreakers present
**Message:** Team capability gaps and scaling bottlenecks
**Example:** "Your junior team lacks the operational maturity for microservices debugging."

## Report Generation Guidelines

### Quantifiable Pivot Triggers
Always provide specific, measurable conditions:
- "When team grows beyond **15 developers**"
- "When traffic exceeds **10,000 requests/second**"
- "When you need **10+ daily deployments**"
- "When Pivot Point exceeds **1.5 consistently**"

### Reinvestment Arguments
Calculate and present alternative uses for cost savings:
- **Developer-months** fundable with savings
- **Major features** that could be built instead
- **Customer acquisition budget** from complexity tax savings
- **Competitive advantage** in months to market

### Migration Roadmaps
Provide three-phase migration strategies:
1. **Preparation Phase**: Modular boundaries, monitoring setup
2. **Pilot Phase**: Extract least critical service, low-risk validation
3. **Full Migration**: Complete transition with rollback capabilities

## Technical Implementation Notes

### File Structure
- `rules.json`: Dealbreaker conditions and challenge triggers
- `data_specs.json`: ACI values, cost models, scale breakpoints
- `prompts.yaml`: Persona definitions and response templates
- `architect_logic.py`: Mathematical calculation engine

### Integration Points
- **Frontend JavaScript**: UI interactions, real-time calculations
- **Python Backend**: Complex mathematical analysis, risk assessment
- **Configuration Files**: Consistent data sources, persona templates

### Key Calculations
```python
# Team Complexity Score
tcs = team_size * experience_multiplier * timeline_factor

# Architecture Complexity Index  
aci = base_complexity * timeline_pressure * scale_multiplier

# Pivot Point
pivot_point = tcs / aci

# Complexity Tax
if pivot_point < 0.5:
    tax_multiplier = 2.5
elif pivot_point < 0.8:
    tax_multiplier = 1.8
else:
    tax_multiplier = 1.0
```

## Best Practices

### When to Challenge Aggressively
1. **Mathematical overload**: Pivot Point < 0.5
2. **Clear dealbreakers**: Team size, experience, timeline mismatches
3. **Resume-driven decisions**: Complex choice without business justification

### When to Support User Choice
1. **Sustainable Pivot Point**: > 1.0 with no dealbreakers
2. **Reasonable trade-offs**: User understands and accepts complexity tax
3. **Strategic long-term planning**: Timeline allows for capability building

### Report Quality Standards
- **Always include mathematical justification** with specific formulas
- **Provide quantifiable triggers** for future architectural changes
- **Calculate reinvestment opportunities** with dollar amounts
- **Include competitive impact analysis** with timeline advantages

## Common Scenarios

### Scenario 1: Small Team Wants Microservices
- **Trigger**: Team size ≤ 3, architecture = microservices
- **Response**: Aggressive challenge with velocity impact data
- **Recommendation**: Start with monolith, migrate when team > 8 developers

### Scenario 2: Junior Team Chooses Serverless
- **Trigger**: Experience = junior, architecture = serverless
- **Response**: Operational reality check with debugging complexity
- **Recommendation**: Monolith with gradual serverless adoption

### Scenario 3: Experienced Team, Reasonable Timeline
- **Trigger**: Pivot Point > 1.0, no dealbreakers
- **Response**: Support choice with monitoring recommendations
- **Recommendation**: Proceed with user choice, establish success metrics

## Success Metrics

### System Effectiveness
- **Prevents over-engineering** through mathematical analysis
- **Protects business runway** with cost-benefit analysis
- **Provides actionable guidance** with specific triggers and timelines
- **Generates stakeholder-ready reports** with executive summaries

### User Experience
- **Clear mathematical justification** for all recommendations
- **Personality-appropriate responses** based on situation severity
- **Actionable next steps** with specific implementation guidance
- **Future-proof strategies** with evolution triggers

## Troubleshooting

### Common Issues
1. **Pivot Point calculation errors**: Check TCS and ACI inputs
2. **Persona mismatch**: Verify trigger conditions in prompts.yaml
3. **Missing dealbreakers**: Update rules.json with new conditions
4. **Inconsistent cost models**: Sync data_specs.json with current market rates

### Debugging Steps
1. Verify input data (team size, experience, timeline, scale)
2. Check mathematical calculations (TCS, ACI, Pivot Point)
3. Validate trigger conditions for personas and challenges
4. Confirm cost model accuracy and scaling multipliers

---

*This guidance document ensures consistent, mathematically-sound architectural recommendations that protect business interests while providing clear, actionable guidance for technical teams.*