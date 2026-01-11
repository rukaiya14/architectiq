# 🏛️ ArchitectIQ - Senior Technical Architect Decision Engine

> **Mathematical decision-making tool that acts as a Senior Technical Architect, using quantitative analysis to prevent over-engineering and protect business runway.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🎯 What is ArchitectIQ?

ArchitectIQ is a **mathematical decision-making tool** that prevents "Resume-Driven Development" by challenging architectural choices with hard data. It acts as your **Senior Technical Architect**, using the **Pivot Point formula** to determine if your team can sustainably handle your chosen architecture.

### The Problem It Solves

- **Over-engineering**: Teams choosing complex architectures they can't operationally handle
- **Resume-Driven Development**: Technology choices based on trends rather than business needs
- **Runway Burn**: Wasting money on infrastructure complexity instead of product features
- **Team Burnout**: Overwhelming teams with operational complexity beyond their capability

### The Solution

ArchitectIQ uses **mathematical analysis** to:
- Calculate your **Team Complexity Score (TCS)** based on size and experience
- Assess **Architecture Complexity Index (ACI)** for your chosen architecture
- Compute the **Pivot Point** ratio to determine sustainability
- Apply **Complexity Tax** penalties for unsustainable choices
- Generate **stakeholder-ready reports** with quantifiable recommendations

## 🧮 Core Mathematical Framework

### The Pivot Point Formula
```
Pivot Point = Team Complexity Score ÷ Architecture Complexity Index
```

**Interpretation:**
- **> 1.5**: Excellent choice, team can handle complexity easily
- **1.0-1.5**: Good choice, sustainable with monitoring
- **0.5-1.0**: Warning zone, complexity tax applies
- **< 0.5**: Critical zone, aggressive challenge triggered

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

## 🚀 Features

### 🎭 Three-Act Decision Process
1. **Act I: The Interrogation** - Assess team capability and constraints
2. **Act II: The Stress Test** - Challenge architectural choices with emotional scenarios
3. **Act III: The Verdict** - Provide mathematical analysis and recommendations

### 🧠 Intelligent Personas
- **Architect** (Authoritative): Mathematical precision for critical decisions
- **Consultant** (Advisory): Business-focused trade-off analysis
- **CTO** (Strategic): Organizational impact and scaling concerns

### 📊 Advanced Analytics
- **Real-time Pivot Point calculation** with visual feedback
- **Complexity Tax assessment** with financial penalties
- **3-year TCO analysis** with team-specific multipliers
- **Velocity impact predictions** with timeline consequences

### 🎛️ Interactive What-If Analysis
- **Dynamic sliders** for team size and timeline adjustments
- **Real-time recommendation updates** as constraints change
- **Quantifiable pivot triggers** for future architectural evolution

### 📄 Executive-Ready Reports
- **Mathematical justification** with specific formulas
- **Reinvestment arguments** showing alternative uses for cost savings
- **Phased migration roadmaps** with risk assessments
- **Quantifiable triggers** for architectural changes

## 🛠️ Installation & Setup

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/architectiq.git
   cd architectiq
   ```

2. **Open in browser**
   ```bash
   # Simply open architectiq.html in your browser
   open architectiq.html
   # Or on Windows:
   start architectiq.html
   ```

3. **Start analyzing**
   - Enter your team details
   - Choose your preferred architecture
   - Get mathematical analysis and recommendations


## 📁 Project Structure

```
architectiq/
├── architectiq.html          # Main application interface
├── architectiq.js           # Frontend logic and calculations
├── architectiq.css          # Glassmorphism UI styling
├── README.md               # This file
├── .kiro/                  # Configuration and logic
│   ├── rules.json          # Dealbreaker conditions
│   ├── data_specs.json     # ACI values and cost models
│   ├── prompts.yaml        # Persona definitions
│   ├── architect_logic.py  # Python calculation engine
│   ├── mathematical_models.md  # Detailed formulas
│   └── steering/
│       └── architectiq-guidance.md  # System guidance
```

## 🎮 Usage Examples

### Example 1: Small Team Choosing Microservices
```
Input:
- Team: 3 developers, mixed experience
- Timeline: 6 months
- Choice: Microservices

Analysis:
- TCS = 3 × 0.75 × 1.0 = 2.25
- ACI = 80 × 1.0 × 1.2 = 96
- Pivot Point = 2.25 ÷ 96 = 0.023 (CRITICAL)

Result: Aggressive challenge with 2.5x complexity tax
Recommendation: Start with monolith, migrate when team > 8 developers
```

### Example 2: Experienced Team with Reasonable Timeline
```
Input:
- Team: 8 developers, senior experience
- Timeline: 12 months
- Choice: Microservices

Analysis:
- TCS = 8 × 1.0 × 1.2 = 9.6
- ACI = 80 × 0.8 × 1.2 = 76.8
- Pivot Point = 9.6 ÷ 76.8 = 0.125 (WARNING)

Result: Moderate challenge with monitoring recommendations
Recommendation: Proceed with caution, establish success metrics
```

## 🎯 Key Differentiators

### vs. Traditional Architecture Advice
- **Quantitative vs. Qualitative**: Uses mathematical formulas instead of opinions
- **Team-Specific**: Adjusts recommendations based on actual team capability
- **Business-Focused**: Considers financial impact and competitive advantage
- **Actionable**: Provides specific triggers and migration paths

### vs. Generic Decision Frameworks
- **Architecture-Specific**: Designed specifically for technical architecture decisions
- **Complexity-Aware**: Accounts for operational overhead and team burnout
- **Persona-Driven**: Adapts communication style based on decision severity
- **Stakeholder-Ready**: Generates reports suitable for executives and investors

## 🧪 Mathematical Validation

### Complexity Tax Examples
```python
# Critical Zone (Pivot Point < 0.5)
complexity_tax = 2.5x
velocity_impact = -60%
burnout_timeline = 3 months

# Warning Zone (0.5-0.8)
complexity_tax = 1.8x
velocity_impact = -40%
burnout_timeline = 6 months

# Safe Zone (> 1.0)
complexity_tax = 1.0x
velocity_impact = 0%
burnout_timeline = None
```

### TCO Comparison (3-Year)
| Architecture | 3-Dev Team | 8-Dev Team | 15-Dev Team |
|--------------|------------|------------|-------------|
| Monolith     | $195K      | $456K      | $702K       |
| Serverless   | $354K      | $828K      | $1.27M      |
| Microservices| $625K      | $1.46M     | $2.25M      |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/architectiq.git
cd architectiq

# No build process required - it's vanilla HTML/CSS/JS!
# Simply open architectiq.html in your browser to start developing
```

### Areas for Contribution
- **New Architecture Types**: Add support for additional architectures in `architectiq.js`
- **Enhanced UI/UX**: Improve the glassmorphism design in `architectiq.css`
- **Enhanced Personas**: Develop new communication styles
- **Industry-Specific Models**: Create specialized cost models
- **Mobile Responsiveness**: Optimize for mobile devices
- **Accessibility Improvements**: Enhance ARIA labels and keyboard navigation

## 📊 Roadmap
Version 2.0 (Q2 2026) — Intelligence & Templates

[ ] **Dynamic Strategy Triggers**: Move all architectural weights to data_specs.json for easier "Referee" tuning.

[ ] **Industry-Specific Profiles**: Pre-configured templates for FinTech, Healthcare, and E-commerce scaling patterns.

[ ] **ADR Generation**: Automated export of decisions into "Architectural Decision Record" Markdown files.

[ ] **Historical Benchmarking**: Save previous assessments to track how your "Pivot Point" evolves as your team grows.

Version 2.1 (Q3 2026) — Visuals & Integration

[ ] **Advanced Radar Charts**: Interactive D3.js visualizations comparing Velocity vs. Risk vs. Complexity Tax.

[ ] **Multi-Persona Steering**: Choose between "Security Architect," "Lead Dev," or "CFO" personas for different steering perspectives.

[ ] **GitHub Action Integration:** Automatically check Pull Requests against the project's sustainability rules.

[ ] **PDF Executive Export**: Generation of high-fidelity reports for stakeholder presentations.

Version 3.0 (Q4 2026) — Predictive Analysis

[ ] **Sentiment-Aware Challenges**: Use NLP to detect "hype-driven" language in user defenses and trigger specific challenges.

[ ] **Machine Learning Models**: Predict future "Complexity Tax" based on anonymized historical team performance data.

[ ] **Cloud Cost Live-Sync**: Real-time TCO updates by connecting to AWS/Azure/GCP pricing APIs.

[ ] **Mobile "Referee" App**: Native mobile experience for architectural sanity checks during meetings.

