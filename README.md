# 🏛️ ArchitectIQ - Senior Technical Architect

**"Under these constraints, I recommend this architecture for the following reasons..."**

ArchitectIQ is a mathematical decision-making tool that acts as a Senior Technical Architect, using quantitative analysis to prevent over-engineering and protect business runway. The system implements a three-act structure: **Interrogation → Stress Test → Architectural Guidance**.

## 🎯 What is ArchitectIQ?

ArchitectIQ prevents "Resume-Driven Development" by providing contextual, mathematically-sound architectural recommendations. Instead of always defaulting to simple solutions, it considers your specific team, timeline, and scale ambitions to recommend the most suitable architecture.

### The Problems It Solves

- **Over-engineering**: Teams choosing complex architectures they can't operationally handle
- **Under-engineering**: Missing opportunities for architectures that would serve the business better
- **Resume-Driven Development**: Technology choices based on trends rather than business needs  
- **Runway Burn**: Wasting money on inappropriate architectural complexity
- **Team Burnout**: Overwhelming teams with operational complexity beyond their capability

### The Three-Act Solution

ArchitectIQ guides you through a structured decision process:

1. **🎭 Act I: The Interrogation** - Understand your team and constraints
2. **🧪 Act II: The Stress Test** - Analyze how each architecture performs under your constraints
3. **⚖️ Act III: Architectural Guidance** - Receive contextual recommendations with specific pros/cons

## ⚖️ The Mathematical Framework

### The Pivot Point Formula
```
Pivot Point = (TCS ÷ ACI) × CNF
```

Where:
- **TCS** = Team Complexity Score
- **ACI** = Architecture Complexity Index (with Workload Suitability Factor)
- **CNF** = Context Normalization Factor

**Interpretation:**
- **> 1.5**: Excellent choice, team can handle complexity easily
- **1.0-1.5**: Good choice, sustainable with monitoring  
- **0.5-1.0**: Warning zone, complexity tax applies
- **< 0.5**: Critical zone, mathematical disaster

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
ACI = BaseComplexity × TimelinePressure × ScaleMultiplier × WSF
```

**Base Complexity Values:**
- Monolith: 20 units
- Serverless: 60 units
- Microservices: 80 units
- Hybrid: 65 units

**Workload Suitability Factor (WSF):**
- Maps scale ambitions to workload types (Consumer→Bursty, SaaS→Mixed, Utility→Steady)
- Applies architecture-specific multipliers based on workload fit

**Context Normalization Factor (CNF):**
- Enterprise Utility: 3.0x
- SaaS Product: 5.0x
- Consumer App: 8.0x
- Platform/Marketplace: 6.0x

## � Key Features

### 🎭 Three-Act Experience
- **Guided workflow** from constraints to recommendations
- **Progressive disclosure** of complexity and analysis
- **Contextual guidance** tailored to your specific situation
- **Professional presentation** suitable for stakeholder discussions

### 🧮 Sophisticated Selection Algorithm
- **Workload suitability bonuses** (e.g., Serverless for bursty consumer apps)
- **Team size matching** (larger teams favor microservices)
- **Experience level consideration** (junior teams penalized for complex architectures)
- **Timeline pressure factors** (short timelines favor simpler architectures)

### � Mathematical Visualization
- **Pivot Point calculations** for all 4 architectures
- **Color-coded stress levels** (Excellent, Good, Warning, Critical)
- **Cost and timeline estimates** with complexity tax applied
- **Visual comparison cards** showing relative sustainability

### 📄 Comprehensive Reporting
- **Executive summary** with mathematical justification
- **Detailed analysis** with pros/cons for recommended architecture
- **Risk assessment** based on Pivot Point thresholds
- **Implementation roadmap** with phased approach
- **Exportable HTML reports** for stakeholder sharing

### 🎨 Beautiful Blue Theme
- **Professional blue gradient** with architectural patterns
- **Subtle background elements** representing different architectures
- **Glass morphism effects** with backdrop blur
- **Responsive design** that works on all devices

## �️ Installation & Setup

### Quick Start
```bash
# Clone the repository
git clone https://github.com/rukaiya14/architectiq.git
cd architectiq

# Open in browser (no build process required)
open index.html
# Or on Windows: start index.html
```

### Start Your Analysis
1. **Act I**: Enter your team profile (size, experience, timeline, scale)
2. **Act II**: Review stress test results for all architectures
3. **Act III**: Get contextual recommendation with detailed analysis
4. **Export**: Generate comprehensive HTML report for stakeholders

## 📁 Project Structure

```
architectiq/
├── index.html                    # Main 3-act application
├── architectiq-comparison.html   # Alternative comparison view
├── architectiq-comparison.js     # Comparison logic
├── architectiq-comparison.css    # Comparison styling
├── api/                          # Serverless enhancement functions
│   ├── calculate.js              # Enhanced mathematical analysis
│   └── recommend.js              # AI-powered recommendations
├── .kiro/                        # Configuration and guidance
│   ├── rules.json               # Updated dealbreaker conditions
│   ├── data_specs.json          # WSF, CNF, and selection algorithm
│   ├── prompts.yaml             # Persona definitions
│   └── architect_logic.py       # Python calculation engine
└── README.md                    # This file
```

## 🎮 Usage Examples

### Example 1: Consumer App with Experienced Team
**Input:**
- Team: 6-10 developers, senior experience
- Timeline: 12 months  
- Scale: Consumer App

**Mathematical Analysis:**
- TCS = 8 × 1.0 × 1.2 = 9.6
- Serverless ACI = 60 × 0.8 × 1.3 × 0.6 = 37.44 (WSF bonus for bursty workload)
- Pivot Point = (9.6 ÷ 37.44) × 8.0 = 2.05 (EXCELLENT)

**Recommendation:** Serverless - Perfect for bursty consumer workloads with automatic scaling

### Example 2: Enterprise Utility with Small Team
**Input:**
- Team: 3-5 developers, mixed experience
- Timeline: 6 months
- Scale: Enterprise Utility

**Mathematical Analysis:**
- TCS = 4 × 0.75 × 1.0 = 3.0
- Monolith ACI = 20 × 1.0 × 0.8 × 0.8 = 12.8 (WSF bonus for steady workload)
- Pivot Point = (3.0 ÷ 12.8) × 3.0 = 0.70 (WARNING)

**Recommendation:** Monolith - Ideal for stable utilities, manageable complexity tax

### Example 3: Platform with Large Expert Team
**Input:**
- Team: 11-20 developers, expert experience
- Timeline: 18+ months
- Scale: Platform/Marketplace

**Mathematical Analysis:**
- TCS = 15 × 1.5 × 1.4 = 31.5
- Microservices ACI = 80 × 0.6 × 1.6 × 1.0 = 76.8
- Pivot Point = (31.5 ÷ 76.8) × 6.0 = 2.46 (EXCELLENT)

**Recommendation:** Microservices - Perfect for platforms requiring independent service scaling

## 🎯 What Makes ArchitectIQ Unique

### vs. Traditional Architecture Advice
- **Contextual vs. Generic**: Considers your specific team, timeline, and scale ambitions
- **Mathematical vs. Opinions**: Uses quantifiable formulas with WSF and CNF
- **Guided Process**: Three-act structure prevents rushed decisions
- **Business-Focused**: Considers financial impact and competitive advantage

### vs. Generic Comparison Tools  
- **Architecture-Specific**: Designed specifically for technical architecture decisions
- **Workload-Aware**: WSF considers how well each architecture fits your workload type
- **Team-Capability Matching**: Sophisticated algorithm considers team size and experience
- **Professional Presentation**: Generates stakeholder-ready reports

## 🧮 Mathematical Validation

### Complexity Tax Examples
```javascript
// Critical Zone (Pivot Point < 0.5)
complexity_tax = 2.5x cost, 2.0x timeline
velocity_impact = -60%
mathematical_overload = "250% overwhelmed"

// Warning Zone (0.5-0.8)  
complexity_tax = 1.8x cost, 1.5x timeline
velocity_impact = -40%
mathematical_overload = "80% overwhelmed"

// Safe Zone (> 1.0)
complexity_tax = 1.0x cost, 1.0x timeline
velocity_impact = 0%
mathematical_overload = "Sustainable"
```

### Selection Algorithm Bonuses
```javascript
// Workload Suitability (Consumer App)
serverless_bonus = +25 points  // Excellent for bursty workloads
monolith_bonus = +10 points    // Simple but not optimal
microservices_bonus = +15 points // Good for scale but complex

// Team Size Bonus (6-10 developers)
microservices_bonus = +20 points // Perfect team size
hybrid_bonus = +18 points       // Good balance
serverless_bonus = +12 points   // Decent fit
```

## 🌐 Live Demo

**[Try ArchitectIQ →](https://architectiq.vercel.app)**

Experience the three-act architectural guidance with your team's actual parameters.

## 🤝 Contributing

We welcome contributions to make ArchitectIQ even more accurate and helpful!

### Development Setup
```bash
# Clone and start developing
git clone https://github.com/rukaiya14/architectiq.git
cd architectiq

# No build process - pure HTML/CSS/JS
# Edit index.html and refresh browser
```

### Areas for Contribution
- **Enhanced Mathematical Models**: Improve WSF and CNF calculations
- **New Architecture Types**: Add support for additional architectures  
- **Industry-Specific Profiles**: Create specialized models for different domains
- **Improved Visualizations**: Enhance stress test presentations
- **Mobile Optimization**: Better responsive design

## 📊 Roadmap

### Version 2.0 - Enhanced Intelligence
- [ ] **Dynamic WSF Models**: Industry-specific workload suitability factors
- [ ] **Historical Tracking**: Monitor team Pivot Point evolution over time
- [ ] **Advanced Visualizations**: Interactive complexity comparison charts
- [ ] **Multi-language Support**: Internationalization for global teams

### Version 2.1 - Integration & Automation  
- [ ] **GitHub Actions**: Automated architecture sustainability checks
- [ ] **Slack Bot**: Quick Pivot Point calculations in team channels
- [ ] **API Endpoints**: Integrate mathematical analysis into other tools
- [ ] **Mobile App**: Native three-act experience

---

**Built for the 6th Kiro Heroes Challenge**

*ArchitectIQ: Mathematical architectural guidance that prevents over-engineering and protects business runway.*

**Live Demo**: [architectiq.vercel.app](https://architectiq.vercel.app)  
**Repository**: [github.com/rukaiya14/architectiq](https://github.com/rukaiya14/architectiq)
