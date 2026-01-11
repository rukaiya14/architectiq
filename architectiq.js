// ArchitectIQ - Senior Technical Architect Logic Engine
// Implements the three-act structure: Interrogation → Stress Test → Verdict

class ArchitectIQ {
    constructor() {
        this.state = {
            teamSize: null,
            experience: null,
            timeline: null,
            scalingNeeds: null,
            architectureChoice: null,
            currentAct: 'interrogation',
            currentQuestion: 1,
            pivotPoint: 0,
            complexityScore: 0,
            tcs: 0, // Team Complexity Score
            aci: 0  // Architecture Complexity Index
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateComplexityMeter();
        this.showCurrentQuestion();
    }

    bindEvents() {
        // Team size selection
        document.querySelectorAll('.team-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTeamSize(e.target.dataset.size));
        });

        // Experience selection
        document.querySelectorAll('.exp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectExperience(e.target.dataset.exp));
        });

        // Timeline selection
        document.querySelectorAll('.timeline-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTimeline(e.target.dataset.timeline));
        });

        // Scale selection
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectScale(e.target.dataset.scale));
        });

        // Architecture selection
        document.querySelectorAll('.arch-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectArchitecture(e.target.dataset.arch));
        });

        // Proceed to stress test
        document.getElementById('proceedToStressTest').addEventListener('click', () => {
            this.proceedToStressTest();
        });

        // Stress test responses
        document.getElementById('defendChoice').addEventListener('click', () => {
            this.defendArchitecturalChoice();
        });

        document.getElementById('acceptRecommendation').addEventListener('click', () => {
            this.acceptRecommendation();
        });

        // Verdict actions
        document.getElementById('exportVerdict').addEventListener('click', () => {
            this.exportVerdict();
        });

        document.getElementById('startNewAnalysis').addEventListener('click', () => {
            this.resetAnalysis();
        });
    }

    // Team Complexity Score Calculation
    calculateTCS() {
        const teamSizeMap = {
            '1': 1,
            '2': 2,
            '3-5': 4,
            '6-10': 8,
            '11-20': 15,
            '20+': 25
        };

        const experienceMultiplier = {
            'junior': 0.5,
            'mixed': 0.75,
            'senior': 1.0,
            'expert': 1.5
        };

        const baseSize = teamSizeMap[this.state.teamSize] || 1;
        const expMultiplier = experienceMultiplier[this.state.experience] || 0.5;
        
        this.state.tcs = baseSize * expMultiplier;
        return this.state.tcs;
    }

    // Architecture Complexity Index
    calculateACI() {
        const architectureComplexity = {
            'monolith': 1,
            'serverless': 2,
            'microservices': 4,
            'hybrid': 3
        };

        const timelinePressure = {
            '1': 2.0,      // Crisis mode doubles complexity
            '3': 1.5,      // High pressure
            '6': 1.0,      // Balanced
            '12': 0.8,     // Strategic reduces complexity
            '18+': 0.6     // Long-term planning
        };

        const scalingComplexity = {
            'utility': 1.0,
            'saas': 1.2,
            'consumer': 1.8,
            'platform': 2.5
        };

        const baseComplexity = architectureComplexity[this.state.architectureChoice] || 1;
        const timePressure = timelinePressure[this.state.timeline] || 1;
        const scaleMultiplier = scalingComplexity[this.state.scalingNeeds] || 1;

        this.state.aci = baseComplexity * timePressure * scaleMultiplier;
        return this.state.aci;
    }

    // Pivot Point Formula: TeamSize × Experience / Complexity
    calculatePivotPoint() {
        const tcs = this.calculateTCS();
        const aci = this.calculateACI();
        
        this.state.pivotPoint = tcs / aci;
        return this.state.pivotPoint;
    }

    // Business Impact Calculator with TCO Analysis
    calculateTCO(architecture) {
        const baseCosts = {
            'monolith': {
                development: 120000,
                infrastructure: 36000,
                maintenance: 24000
            },
            'microservices': {
                development: 280000,
                infrastructure: 108000,
                maintenance: 72000
            },
            'serverless': {
                development: 180000,
                infrastructure: 54000,
                maintenance: 36000
            },
            'hybrid': {
                development: 240000,
                infrastructure: 84000,
                maintenance: 60000
            }
        };

        const teamSizeMultiplier = {
            '1': 0.5,
            '2': 0.7,
            '3-5': 1.0,
            '6-10': 1.5,
            '11-20': 2.0,
            '20+': 3.0
        };

        const experienceEfficiency = {
            'junior': 1.8,     // Junior teams take longer
            'mixed': 1.3,
            'senior': 1.0,
            'expert': 0.7      // Expert teams are more efficient
        };

        const costs = baseCosts[architecture];
        const sizeMultiplier = teamSizeMultiplier[this.state.teamSize] || 1;
        const efficiencyMultiplier = experienceEfficiency[this.state.experience] || 1;

        const totalCost = (costs.development + costs.infrastructure + costs.maintenance) 
                         * sizeMultiplier * efficiencyMultiplier;

        return {
            total: Math.round(totalCost),
            development: Math.round(costs.development * sizeMultiplier * efficiencyMultiplier),
            infrastructure: Math.round(costs.infrastructure * sizeMultiplier),
            maintenance: Math.round(costs.maintenance * sizeMultiplier * efficiencyMultiplier)
        };
    }

    // Time to Value Calculator
    calculateTimeToValue(architecture) {
        const baseTimes = {
            'monolith': 3,
            'serverless': 4,
            'microservices': 8,
            'hybrid': 6
        };

        const experienceMultiplier = {
            'junior': 2.0,
            'mixed': 1.5,
            'senior': 1.0,
            'expert': 0.8
        };

        const timelinePressure = {
            '1': 0.7,      // Crisis mode forces faster delivery
            '3': 0.9,
            '6': 1.0,
            '12': 1.2,
            '18+': 1.5
        };

        const baseTime = baseTimes[architecture];
        const expMultiplier = experienceMultiplier[this.state.experience] || 1;
        const pressureMultiplier = timelinePressure[this.state.timeline] || 1;

        return Math.round(baseTime * expMultiplier * pressureMultiplier);
    }

    // Emotional Scenario Generation
    generateEmotionalScenario() {
        const pivotPoint = this.calculatePivotPoint();
        const architecture = this.state.architectureChoice;
        
        // If Pivot Point < 1, trigger aggressive challenge
        if (pivotPoint < 1) {
            return this.generateAggressiveChallenge(architecture, pivotPoint);
        } else {
            return this.generateBalancedChallenge(architecture, pivotPoint);
        }
    }

    generateAggressiveChallenge(architecture, pivotPoint) {
        const scenarios = {
            'microservices': {
                warning: "Complexity Tax Overload Detected",
                challenge: `I see you're leaning toward Microservices. **Warning**: Based on your team's capability score, my Complexity Tax Assessment predicts a **60% velocity drop**. 

By Month 3, you won't be shipping features; you'll be debugging network latency between services while your runway burns. Your Pivot Point of ${pivotPoint.toFixed(2)} indicates your team is mathematically incapable of maintaining this architecture without burnout.

**The Math**: Your team can handle ${this.state.tcs.toFixed(1)} complexity units, but Microservices will demand ${this.state.aci.toFixed(1)} units. That's a ${((this.state.aci / this.state.tcs - 1) * 100).toFixed(0)}% overload.`,
                velocityImpact: "-60%",
                complexityTax: "Critical",
                pivotPoint: pivotPoint.toFixed(2)
            },
            'serverless': {
                warning: "Vendor Lock-in & Cold Start Crisis",
                challenge: `Serverless sounds appealing, but your team lacks the experience to handle the operational complexity. **Reality Check**: You'll spend 40% of your time debugging cold starts and vendor-specific quirks instead of building features.

With a Pivot Point of ${pivotPoint.toFixed(2)}, you're setting yourself up for a debugging nightmare. When AWS Lambda has an outage (and it will), your entire application goes dark.`,
                velocityImpact: "-40%",
                complexityTax: "High",
                pivotPoint: pivotPoint.toFixed(2)
            },
            'hybrid': {
                warning: "Worst of Both Worlds Syndrome",
                challenge: `Hybrid architecture? That's like saying "I want all the complexity of Microservices AND all the limitations of a Monolith." Your Pivot Point of ${pivotPoint.toFixed(2)} suggests you can't even handle one architecture properly, let alone two.

You'll end up with distributed monolith anti-patterns and twice the operational overhead.`,
                velocityImpact: "-50%",
                complexityTax: "Extreme",
                pivotPoint: pivotPoint.toFixed(2)
            }
        };

        return scenarios[architecture] || scenarios['microservices'];
    }

    generateBalancedChallenge(architecture, pivotPoint) {
        const scenarios = {
            'microservices': {
                warning: "Scale Premature Optimization",
                challenge: `Microservices can work for your team, but let's examine the trade-offs. With your current scale needs, you're optimizing for problems you don't have yet.

**Consider**: Will the operational overhead justify the benefits? Your Pivot Point of ${pivotPoint.toFixed(2)} suggests you can handle it, but at what cost to feature velocity?`,
                velocityImpact: "-25%",
                complexityTax: "Moderate",
                pivotPoint: pivotPoint.toFixed(2)
            },
            'monolith': {
                warning: "Future Scaling Bottleneck",
                challenge: `A Monolith is a solid choice for your team size, but let's stress-test the future. What happens when you hit 100,000 users and need to scale different components independently?

Your Pivot Point of ${pivotPoint.toFixed(2)} shows you're being conservative - but is that the right strategy for your growth ambitions?`,
                velocityImpact: "+10%",
                complexityTax: "Low",
                pivotPoint: pivotPoint.toFixed(2)
            }
        };

        return scenarios[architecture] || scenarios['microservices'];
    }

    // Dealbreaker Detection Logic
    detectDealbreakers(architecture) {
        const dealbreakers = [];
        const migrationCost = this.calculateMigrationCost(architecture);

        // Team size dealbreakers
        if (architecture === 'microservices' && ['1', '2'].includes(this.state.teamSize)) {
            dealbreakers.push("Team too small for microservices operational overhead");
        }

        // Timeline dealbreakers
        if (architecture === 'microservices' && this.state.timeline === '1') {
            dealbreakers.push("Microservices incompatible with 1-month deadline");
        }

        // Experience dealbreakers
        if (architecture === 'microservices' && this.state.experience === 'junior') {
            dealbreakers.push("Junior team lacks microservices operational expertise");
        }

        // Scale dealbreakers
        if (architecture === 'monolith' && this.state.scalingNeeds === 'platform') {
            dealbreakers.push("Monolith may not scale for platform/marketplace complexity");
        }

        return {
            dealbreakers,
            migrationCost,
            migrationTime: this.calculateMigrationTime(architecture)
        };
    }

    // Generalized Migration Roadmap Generator
    generateMigrationRoadmap(winningArchitecture, challengedArchitecture, tcAnalysis, businessImpact) {
        const migrationPath = this.calculateMigrationPath(winningArchitecture, challengedArchitecture);
        const scaleBreakpoints = this.calculateScaleBreakpoints(challengedArchitecture);
        
        return {
            whyWait: this.generateWhyWaitLogic(winningArchitecture, challengedArchitecture, businessImpact),
            pivotTriggers: this.generatePivotTriggers(challengedArchitecture, scaleBreakpoints),
            deRiskingRoadmap: this.generateDeRiskingRoadmap(winningArchitecture, challengedArchitecture, migrationPath)
        };
    }

    generateWhyWaitLogic(winner, challenged, businessImpact) {
        const costSavings = businessImpact.costDifference;
        const timeAdvantage = businessImpact.timeAdvantage;
        
        const strategies = {
            'monolith': {
                'microservices': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} choice saves $${this.formatCurrency(costSavings)} over 3 years - that's real money that can fund ${Math.floor(costSavings / 120000)} additional developers or ${Math.floor(costSavings / 50000)} major features.

**Business Win Today**: Instead of spending 60% of your engineering cycles on service orchestration, your team can focus on customer value. Every month you delay microservices is another month of pure feature velocity.

**The Infrastructure Tax**: Microservices would cost you ${Math.floor(costSavings / (this.getNumericTeamSize(this.state.teamSize) * 12000))} months of developer salary just in operational overhead. Use that budget to build your competitive moat instead.`,

                'serverless': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} approach delivers ${timeAdvantage} months faster to market. In startup terms, that's the difference between Series A and running out of runway.

**Business Win Today**: Serverless vendor lock-in and cold start debugging would consume $${this.formatCurrency(costSavings)} that's better invested in customer acquisition. Your monolith gives you deployment predictability and cost transparency.

**The Complexity Tax**: Serverless debugging across distributed functions would slow your iteration speed by 40%. Stay focused on product-market fit, not infrastructure puzzles.`,

                'hybrid': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} saves $${this.formatCurrency(costSavings)} by avoiding the "worst of both worlds" trap. Hybrid architectures often deliver hybrid results - mediocre at everything.

**Business Win Today**: One deployment pipeline, one monitoring system, one mental model. Your team can master one architecture deeply instead of juggling multiple paradigms poorly.`
            },
            'microservices': {
                'monolith': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} choice positions you for scale from day one. The $${this.formatCurrency(Math.abs(costSavings))} premium is insurance against the $2M+ cost of emergency re-architecture under pressure.

**Business Win Today**: Independent deployments mean faster feature delivery and better fault isolation. Your investment in operational complexity pays dividends in team velocity and system reliability.

**The Scale Tax**: Monoliths hit scaling walls hard. The extra cost today prevents the 6-month "emergency migration" that kills momentum when you're growing fast.`
            },
            'serverless': {
                'monolith': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} eliminates infrastructure management overhead, letting your team focus on business logic. The operational savings compound as you scale.

**Business Win Today**: Zero server management, automatic scaling, pay-per-use pricing. Your infrastructure costs scale linearly with success instead of requiring upfront capacity planning.`,

                'microservices': `**Strategic Context**: Your ${this.formatArchitectureName(winner)} gives you microservices benefits without the operational burden. Each function is independently deployable without managing service meshes.

**Business Win Today**: Faster iteration cycles and lower operational overhead than traditional microservices. You get the modularity without the complexity tax.`
            }
        };

        return strategies[winner]?.[challenged] || `Your ${this.formatArchitectureName(winner)} choice optimizes for your current constraints while maintaining future flexibility.`;
    }

    generatePivotTriggers(challengedArchitecture, breakpoints) {
        const triggers = {
            'microservices': {
                teamSize: `**Team Scale Trigger**: When your engineering team reaches ${breakpoints.teamThreshold} developers across ${Math.ceil(breakpoints.teamThreshold / 6)} squads`,
                traffic: `**Traffic Trigger**: When you consistently handle ${breakpoints.trafficThreshold.toLocaleString()} requests/second with ${breakpoints.serviceCount}+ distinct business domains`,
                deployment: `**Deployment Trigger**: When you need ${breakpoints.deploymentFrequency}+ independent deployments daily across separate business units`,
                operational: `**Operational Trigger**: When you have dedicated DevOps engineers (${Math.ceil(breakpoints.teamThreshold / 15)} minimum) and 24/7 on-call rotation`
            },
            'serverless': {
                teamSize: `**Team Scale Trigger**: When your team reaches ${breakpoints.teamThreshold} developers and needs event-driven architecture`,
                traffic: `**Traffic Trigger**: When you have highly variable traffic (${breakpoints.trafficVariability}x peak-to-trough ratio) or unpredictable scaling patterns`,
                deployment: `**Deployment Trigger**: When you need sub-second deployment of individual functions and automatic scaling`,
                operational: `**Operational Trigger**: When infrastructure management consumes ${breakpoints.infraOverhead}%+ of engineering time`
            },
            'hybrid': {
                teamSize: `**Team Scale Trigger**: When you have ${breakpoints.teamThreshold}+ developers split between legacy and greenfield projects`,
                traffic: `**Traffic Trigger**: When different components have vastly different scaling requirements (${breakpoints.scalingDivergence}x difference)`,
                deployment: `**Deployment Trigger**: When you need different deployment cadences for different business units`,
                operational: `**Operational Trigger**: When you have both legacy constraints and modern scaling requirements`
            },
            'monolith': {
                teamSize: `**Team Scale Trigger**: When your team shrinks below ${breakpoints.teamThreshold} developers or lacks senior operational expertise`,
                traffic: `**Traffic Trigger**: When your traffic is predictable (< ${breakpoints.trafficVariability}x variation) and under ${breakpoints.trafficThreshold.toLocaleString()} requests/second`,
                deployment: `**Deployment Trigger**: When you can coordinate releases across the entire team (< ${breakpoints.deploymentFrequency} deployments/week)`,
                operational: `**Operational Trigger**: When operational simplicity is more valuable than independent scaling`
            }
        };

        const triggerSet = triggers[challengedArchitecture] || triggers['microservices'];
        
        return `### Hard Pivot Triggers (Quantifiable Breakpoints)

${triggerSet.teamSize}

${triggerSet.traffic}

${triggerSet.deployment}

${triggerSet.operational}

**Pivot Point Threshold**: When your recalculated Pivot Point exceeds 1.5 consistently for 6+ months`;
    }

    generateDeRiskingRoadmap(winner, challenged, migrationPath) {
        const roadmaps = {
            'monolith': {
                'microservices': {
                    stage1: `**Stage 1 - Preparation (Months 1-6)**:
- Implement Domain-Driven Design boundaries within your monolith
- Extract shared libraries and establish API contracts between modules  
- Set up comprehensive monitoring and distributed tracing
- Build CI/CD pipeline that can handle multiple deployment targets
- **Investment**: $${this.formatCurrency(migrationPath.preparationCost)} in tooling and training`,

                    stage2: `**Stage 2 - The Pilot (Months 7-12)**:
- Extract your least critical, most isolated service (recommendation: ${this.suggestPilotService()})
- Implement service mesh and API gateway for the pilot
- Establish monitoring, logging, and alerting for distributed systems
- **Risk Level**: Low (< 5% of traffic affected)
- **Investment**: $${this.formatCurrency(migrationPath.pilotCost)} in infrastructure and development`,

                    stage3: `**Stage 3 - Full Scale (Months 13-24)**:
- Migrate remaining services based on business priority and coupling analysis
- Implement full observability stack and chaos engineering
- Train team on distributed systems operations
- **Total Migration Effort**: ${migrationPath.totalEffort} person-months
- **Total Investment**: $${this.formatCurrency(migrationPath.totalCost)}
- **Risk Mitigation**: Gradual rollout with rollback capabilities at each step`
                },
                'serverless': {
                    stage1: `**Stage 1 - Preparation (Months 1-4)**:
- Refactor code into pure functions with clear input/output contracts
- Implement event-driven patterns within your monolith
- Set up cloud-native monitoring and observability
- **Investment**: $${this.formatCurrency(migrationPath.preparationCost)} in refactoring and tooling`,

                    stage2: `**Stage 2 - The Pilot (Months 5-8)**:
- Extract background jobs and async processes to serverless functions
- Implement event sourcing for pilot workloads
- Establish serverless CI/CD and monitoring
- **Risk Level**: Low (non-critical path functions)
- **Investment**: $${this.formatCurrency(migrationPath.pilotCost)}`,

                    stage3: `**Stage 3 - Full Scale (Months 9-18)**:
- Migrate API endpoints to serverless functions
- Implement full event-driven architecture
- **Total Migration Effort**: ${migrationPath.totalEffort} person-months
- **Total Investment**: $${this.formatCurrency(migrationPath.totalCost)}`
                }
            },
            'microservices': {
                'monolith': {
                    stage1: `**Stage 1 - Consolidation Planning (Months 1-3)**:
- Audit service dependencies and identify consolidation candidates
- Design unified data model and migration strategy
- Plan gradual service retirement roadmap
- **Investment**: $${this.formatCurrency(migrationPath.preparationCost)} in analysis and planning`,

                    stage2: `**Stage 2 - The Pilot Consolidation (Months 4-8)**:
- Merge closely coupled services with minimal external dependencies
- Consolidate shared databases and eliminate distributed transactions
- **Risk Level**: Medium (affects service boundaries)
- **Investment**: $${this.formatCurrency(migrationPath.pilotCost)}`,

                    stage3: `**Stage 3 - Full Consolidation (Months 9-18)**:
- Complete service consolidation based on business domain boundaries
- Simplify deployment and monitoring infrastructure
- **Total Migration Effort**: ${migrationPath.totalEffort} person-months
- **Total Investment**: $${this.formatCurrency(migrationPath.totalCost)}`
                }
            }
        };

        const roadmap = roadmaps[winner]?.[challenged] || roadmaps['monolith']['microservices'];
        
        return `### De-Risking Roadmap (Phased Approach)

${roadmap.stage1}

${roadmap.stage2}

${roadmap.stage3}

**Success Metrics**: 
- Zero downtime during migration phases
- Maintain current feature velocity throughout transition
- Achieve target Pivot Point of 1.5+ before declaring migration complete`;
    }

    calculateScaleBreakpoints(architecture) {
        const currentTeamSize = this.getNumericTeamSize(this.state.teamSize);
        
        const breakpoints = {
            'microservices': {
                teamThreshold: Math.max(15, currentTeamSize * 3),
                trafficThreshold: 10000, // requests/second
                deploymentFrequency: 10, // per day
                serviceCount: 5,
                trafficVariability: 3,
                scalingDivergence: 10,
                infraOverhead: 30
            },
            'serverless': {
                teamThreshold: Math.max(8, currentTeamSize * 2),
                trafficThreshold: 1000,
                deploymentFrequency: 20,
                serviceCount: 10,
                trafficVariability: 10,
                scalingDivergence: 5,
                infraOverhead: 20
            },
            'hybrid': {
                teamThreshold: Math.max(12, currentTeamSize * 2.5),
                trafficThreshold: 5000,
                deploymentFrequency: 5,
                serviceCount: 3,
                trafficVariability: 5,
                scalingDivergence: 20,
                infraOverhead: 25
            },
            'monolith': {
                teamThreshold: Math.min(8, currentTeamSize),
                trafficThreshold: 1000,
                deploymentFrequency: 2,
                serviceCount: 1,
                trafficVariability: 2,
                scalingDivergence: 2,
                infraOverhead: 10
            }
        };

        return breakpoints[architecture] || breakpoints['microservices'];
    }

    calculateMigrationPath(from, to) {
        const baseEffort = {
            'monolith': { 'microservices': 18, 'serverless': 12, 'hybrid': 15 },
            'microservices': { 'monolith': 12, 'serverless': 24, 'hybrid': 8 },
            'serverless': { 'monolith': 8, 'microservices': 20, 'hybrid': 10 },
            'hybrid': { 'monolith': 6, 'microservices': 10, 'serverless': 12 }
        };

        const teamSize = this.getNumericTeamSize(this.state.teamSize);
        const effort = baseEffort[from]?.[to] || 12;
        const totalCost = effort * teamSize * 12000; // $12K per person-month

        return {
            totalEffort: effort,
            totalCost: totalCost,
            preparationCost: Math.round(totalCost * 0.2),
            pilotCost: Math.round(totalCost * 0.3),
            scaleCost: Math.round(totalCost * 0.5)
        };
    }

    suggestPilotService() {
        const services = [
            'User Notification Service',
            'File Upload Service', 
            'Email Service',
            'Audit Logging Service',
            'Report Generation Service'
        ];
        return services[Math.floor(Math.random() * services.length)];
    }

    // UI Event Handlers
    selectTeamSize(size) {
        this.state.teamSize = size;
        this.updateSelection('.team-btn', `[data-size="${size}"]`);
        
        // Show experience selector
        document.getElementById('experienceSelector').style.display = 'block';
        this.updateComplexityMeter();
    }

    selectExperience(experience) {
        this.state.experience = experience;
        this.updateSelection('.exp-btn', `[data-exp="${experience}"]`);
        
        // Move to next question
        setTimeout(() => this.nextQuestion(), 500);
        this.updateComplexityMeter();
    }

    selectTimeline(timeline) {
        this.state.timeline = timeline;
        this.updateSelection('.timeline-btn', `[data-timeline="${timeline}"]`);
        
        setTimeout(() => this.nextQuestion(), 500);
        this.updateComplexityMeter();
    }

    selectScale(scale) {
        this.state.scalingNeeds = scale;
        this.updateSelection('.scale-btn', `[data-scale="${scale}"]`);
        
        setTimeout(() => this.nextQuestion(), 500);
        this.updateComplexityMeter();
    }

    selectArchitecture(architecture) {
        this.state.architectureChoice = architecture;
        this.updateSelection('.arch-btn', `[data-arch="${architecture}"]`);
        
        // Show proceed button
        document.getElementById('proceedToStressTest').style.display = 'flex';
        this.updateComplexityMeter();
    }

    updateSelection(selector, activeSelector) {
        document.querySelectorAll(selector).forEach(btn => btn.classList.remove('selected'));
        document.querySelector(activeSelector).classList.add('selected');
    }

    nextQuestion() {
        const currentCard = document.getElementById(`question${this.state.currentQuestion}`);
        currentCard.classList.remove('active');
        
        this.state.currentQuestion++;
        
        if (this.state.currentQuestion <= 3) {
            const nextCard = document.getElementById(`question${this.state.currentQuestion}`);
            nextCard.classList.add('active');
        } else {
            // Show architecture choice
            document.getElementById('architectureChoice').classList.add('active');
        }
    }

    showCurrentQuestion() {
        document.getElementById(`question${this.state.currentQuestion}`).classList.add('active');
    }

    updateComplexityMeter() {
        if (!this.state.architectureChoice) return;
        
        const pivotPoint = this.calculatePivotPoint();
        const complexityPercentage = Math.min(100, (1 / pivotPoint) * 50);
        
        const meterFill = document.getElementById('complexityMeter');
        meterFill.style.width = `${complexityPercentage}%`;
        
        // Add critical animation if in red zone (Pivot Point < 0.5)
        if (pivotPoint < 0.5) {
            meterFill.classList.add('critical');
            this.triggerAggressiveChallengeMode();
        } else {
            meterFill.classList.remove('critical');
        }
        
        document.getElementById('complexityScore').textContent = `${Math.round(complexityPercentage)}%`;
        document.getElementById('floatingPivot').textContent = pivotPoint.toFixed(2);
        
        // Update pivot indicator with dynamic warning zones
        const indicator = document.getElementById('pivotIndicator');
        if (pivotPoint < 0.5) {
            indicator.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
            indicator.style.color = 'white';
            indicator.querySelector('.stat-text').innerHTML = `Pivot Point: <span style="color: #fef2f2; font-weight: 700;">${pivotPoint.toFixed(2)} 🚨 CRITICAL</span>`;
        } else if (pivotPoint < 1) {
            indicator.style.background = 'linear-gradient(135deg, #d97706, #f59e0b)';
            indicator.style.color = 'white';
            indicator.querySelector('.stat-text').innerHTML = `Pivot Point: <span style="color: #fef3c7; font-weight: 700;">${pivotPoint.toFixed(2)} ⚠️ WARNING</span>`;
        } else {
            indicator.style.background = 'linear-gradient(135deg, #059669, #10b981)';
            indicator.style.color = 'white';
            indicator.querySelector('.stat-text').innerHTML = `Pivot Point: <span style="color: #d1fae5; font-weight: 700;">${pivotPoint.toFixed(2)} ✅ SAFE</span>`;
        }

        // Real-time What-If Analysis updates
        this.updateWhatIfAnalysis();
    }

    triggerAggressiveChallengeMode() {
        // Store that we're in aggressive mode for stress test
        this.state.aggressiveChallengeMode = true;
        
        // Add visual indicators
        document.body.classList.add('aggressive-challenge-mode');
        
        // Update complexity meter with pulsing animation
        const meter = document.getElementById('complexityMeter');
        meter.style.animation = 'criticalPulse 1s infinite';
    }

    // Real-time calculation bridge for What-If Analysis
    updateWhatIfAnalysis() {
        if (!document.getElementById('teamSizeSlider')) return; // Not on verdict page yet
        
        const currentPivotPoint = this.calculatePivotPoint();
        const currentTCO = this.calculateTCO(this.state.architectureChoice);
        
        // Update What-If display with current values
        if (document.getElementById('whatIfPivotPoint')) {
            document.getElementById('whatIfPivotPoint').textContent = currentPivotPoint.toFixed(2);
            
            const pivotStatus = document.getElementById('whatIfPivotStatus');
            if (currentPivotPoint < 0.5) {
                pivotStatus.textContent = '🚨 Critical Zone - Aggressive Challenge Triggered';
                pivotStatus.className = 'pivot-status critical';
            } else if (currentPivotPoint < 1) {
                pivotStatus.textContent = '⚠️ Warning Zone - Complexity Tax Applied';
                pivotStatus.className = 'pivot-status warning';
            } else {
                pivotStatus.textContent = '✅ Safe Zone - Architecture Sustainable';
                pivotStatus.className = 'pivot-status safe';
            }
        }
    }

    proceedToStressTest() {
        // Hide interrogation, show stress test
        document.getElementById('interrogation').classList.remove('active');
        document.getElementById('stressTest').classList.add('active');
        
        this.state.currentAct = 'stressTest';
        this.runStressTest();
    }

    runStressTest() {
        const scenario = this.generateEmotionalScenario();
        
        // Update UI with scenario
        document.getElementById('warningType').textContent = scenario.warning;
        document.getElementById('stressTestChallenge').innerHTML = scenario.challenge;
        document.getElementById('velocityImpact').textContent = scenario.velocityImpact;
        document.getElementById('complexityTax').textContent = scenario.complexityTax;
        document.getElementById('pivotPoint').textContent = scenario.pivotPoint;
        
        // Add animation
        document.querySelector('.architect-speech').classList.add('pulse');
        setTimeout(() => {
            document.querySelector('.architect-speech').classList.remove('pulse');
        }, 2000);
    }

    defendArchitecturalChoice() {
        const defense = document.getElementById('architecturalDefense').value;
        
        if (!defense.trim()) {
            document.getElementById('architecturalDefense').classList.add('shake');
            setTimeout(() => {
                document.getElementById('architecturalDefense').classList.remove('shake');
            }, 500);
            return;
        }
        
        // Proceed to verdict with user's defense
        this.proceedToVerdict(true, defense);
    }

    acceptRecommendation() {
        // Proceed to verdict accepting the recommendation
        this.proceedToVerdict(false);
    }

    proceedToVerdict(defendedChoice, defense = null) {
        // Hide stress test, show verdict
        document.getElementById('stressTest').classList.remove('active');
        document.getElementById('verdict').classList.add('active');
        
        this.state.currentAct = 'verdict';
        this.generateVerdict(defendedChoice, defense);
    }

    generateVerdict(defendedChoice, defense) {
        const userChoice = this.state.architectureChoice;
        const recommendedChoice = this.getRecommendedArchitecture();
        
        // Calculate metrics for both choices
        const userTCO = this.calculateTCO(userChoice);
        const recommendedTCO = this.calculateTCO(recommendedChoice);
        
        const userTTV = this.calculateTimeToValue(userChoice);
        const recommendedTTV = this.calculateTimeToValue(recommendedChoice);
        
        const dealbreakers = this.detectDealbreakers(userChoice);
        
        // Update verdict UI
        this.updateVerdictUI(userChoice, recommendedChoice, userTCO, recommendedTCO, userTTV, recommendedTTV, dealbreakers, defendedChoice);
    }

    getRecommendedArchitecture() {
        const pivotPoint = this.calculatePivotPoint();
        const teamSize = this.state.teamSize;
        const experience = this.state.experience;
        const timeline = this.state.timeline;
        const userChoice = this.state.architectureChoice;
        
        // Aggressive challenge logic - always recommend simpler when team can't handle complexity
        if (pivotPoint < 0.8) {
            return 'monolith'; // Force monolith for low capability teams
        }
        
        // Timeline-based overrides
        if (timeline === '1' && userChoice !== 'monolith') {
            return 'monolith'; // Crisis mode = monolith only
        }
        
        // Team size overrides
        if (['1', '2'].includes(teamSize) && userChoice === 'microservices') {
            return 'monolith'; // Small teams shouldn't do microservices
        }
        
        // Experience overrides
        if (experience === 'junior' && ['microservices', 'hybrid'].includes(userChoice)) {
            return 'monolith'; // Junior teams need simplicity
        }
        
        // Scale-based recommendations
        if (this.state.scalingNeeds === 'platform' && pivotPoint > 1.5) {
            return 'microservices'; // Only recommend microservices for platforms with capable teams
        }
        
        // If we get here, user choice is reasonable
        return userChoice;
    }

    updateVerdictUI(userChoice, recommendedChoice, userTCO, recommendedTCO, userTTV, recommendedTTV, dealbreakers, defendedChoice) {
        const isUserChoiceWinner = userChoice === recommendedChoice;
        const pivotPoint = this.calculatePivotPoint();
        
        // Apply Complexity Tax multipliers to user choice
        const complexityTaxMultiplier = this.calculateComplexityTaxMultiplier(userChoice, pivotPoint);
        const adjustedUserTCO = {
            ...userTCO,
            total: Math.round(userTCO.total * complexityTaxMultiplier)
        };
        const adjustedUserTTV = Math.round(userTTV * complexityTaxMultiplier);
        
        // Update ruling title with dynamic assessment
        const rulingTitle = isUserChoiceWinner ? 
            `✅ ${this.formatArchitectureName(userChoice)} Approved` :
            `⚖️ Recommending ${this.formatArchitectureName(recommendedChoice)} - Complexity Tax Applied`;
        document.getElementById('rulingTitle').textContent = rulingTitle;
        
        // Update confidence based on Pivot Point
        const confidence = this.calculateConfidenceScore(pivotPoint, isUserChoiceWinner);
        document.getElementById('rulingConfidence').style.width = `${confidence}%`;
        document.getElementById('confidencePercent').textContent = `${confidence}%`;
        
        // Update table headers with winner badge
        const recommendedHeader = document.getElementById('recommendedHeader');
        const challengedHeader = document.getElementById('challengedHeader');
        
        recommendedHeader.textContent = `${this.formatArchitectureName(recommendedChoice)} (Recommended)`;
        recommendedHeader.classList.add('winner-header');
        
        challengedHeader.textContent = `${this.formatArchitectureName(userChoice)} (Your Choice${complexityTaxMultiplier > 1 ? ' + Complexity Tax' : ''})`;
        if (!isUserChoiceWinner) {
            challengedHeader.classList.add('complexity-tax-applied');
        }
        
        // Animate TCO counters with complexity tax
        this.animateCounter('recommendedTCO', recommendedTCO.total);
        this.animateCounter('challengedTCO', adjustedUserTCO.total);
        
        // Update other metrics with complexity tax applied
        document.getElementById('recommendedTTV').textContent = `${recommendedTTV} Months`;
        document.getElementById('challengedTTV').textContent = `${adjustedUserTTV} Months`;
        
        // Apply dynamic risk assessment
        document.getElementById('recommendedRisk').textContent = this.getRiskLevel(recommendedChoice);
        document.getElementById('challengedRisk').textContent = this.getDynamicRiskLevel(userChoice, pivotPoint, complexityTaxMultiplier);
        
        // Apply winner/challenged styling with complexity tax indicators
        this.applyDynamicVerdictStyling(isUserChoiceWinner, recommendedTCO, adjustedUserTCO, recommendedTTV, adjustedUserTTV, complexityTaxMultiplier);
        
        // Update dealbreakers with enhanced styling
        this.updateDealbreakersUI(dealbreakers);
        
        // Initialize What-If sliders with real-time updates
        this.initializeWhatIfSliders();
        
        // Animate confidence bar
        setTimeout(() => {
            document.getElementById('rulingConfidence').style.width = `${confidence}%`;
        }, 500);

        // Trigger aggressive challenge mode if needed
        if (pivotPoint < 0.5 && !isUserChoiceWinner) {
            this.displayAggressiveChallengeWarning(userChoice, recommendedChoice, complexityTaxMultiplier);
        }
    }

    calculateComplexityTaxMultiplier(architecture, pivotPoint) {
        // Base complexity tax based on Pivot Point
        let baseTax = 1.0;
        
        if (pivotPoint < 0.5) {
            baseTax = 2.5; // 150% complexity tax for critical zone
        } else if (pivotPoint < 0.8) {
            baseTax = 1.8; // 80% complexity tax for warning zone
        } else if (pivotPoint < 1.0) {
            baseTax = 1.3; // 30% complexity tax for caution zone
        }
        
        // Additional multipliers based on architecture complexity
        const architectureMultipliers = {
            'monolith': 1.0,
            'serverless': 1.2,
            'microservices': 1.5,
            'hybrid': 1.4
        };
        
        // Team experience penalty
        const experiencePenalty = {
            'junior': 1.3,
            'mixed': 1.1,
            'senior': 1.0,
            'expert': 0.9
        };
        
        const archMultiplier = architectureMultipliers[architecture] || 1.0;
        const expPenalty = experiencePenalty[this.state.experience] || 1.0;
        
        return baseTax * archMultiplier * expPenalty;
    }

    calculateConfidenceScore(pivotPoint, isApproved) {
        let baseConfidence = isApproved ? 85 : 75;
        
        // Adjust confidence based on Pivot Point
        if (pivotPoint < 0.5) {
            baseConfidence = isApproved ? 60 : 95; // Very confident in recommendation if user choice is bad
        } else if (pivotPoint < 1.0) {
            baseConfidence = isApproved ? 70 : 85;
        } else if (pivotPoint > 1.5) {
            baseConfidence = isApproved ? 95 : 60; // Very confident if user choice is excellent
        }
        
        return Math.min(95, Math.max(60, baseConfidence));
    }

    getDynamicRiskLevel(architecture, pivotPoint, complexityTaxMultiplier) {
        let riskLevel = this.getRiskLevel(architecture);
        
        // Escalate risk based on Pivot Point and Complexity Tax
        if (pivotPoint < 0.5) {
            riskLevel = 'CRITICAL (Team Burnout Imminent)';
        } else if (pivotPoint < 0.8 && complexityTaxMultiplier > 1.5) {
            riskLevel = 'HIGH (Complexity Tax Applied)';
        } else if (complexityTaxMultiplier > 1.2) {
            riskLevel = 'MODERATE (Operational Overhead)';
        }
        
        return riskLevel;
    }

    applyDynamicVerdictStyling(isUserChoiceWinner, recommendedTCO, adjustedUserTCO, recommendedTTV, adjustedUserTTV, complexityTaxMultiplier) {
        // Reset all classes
        document.querySelectorAll('.winner, .challenged, .complexity-tax').forEach(el => {
            el.classList.remove('winner', 'challenged', 'complexity-tax');
        });
        
        // Apply styling based on actual performance with complexity tax
        document.getElementById('recommendedTCO').className = 'winner';
        document.getElementById('challengedTCO').className = complexityTaxMultiplier > 1.2 ? 'challenged complexity-tax' : 'challenged';
        
        document.getElementById('recommendedTTV').className = 'winner';
        document.getElementById('challengedTTV').className = complexityTaxMultiplier > 1.2 ? 'challenged complexity-tax' : 'challenged';
        
        document.getElementById('recommendedRisk').className = 'winner';
        document.getElementById('challengedRisk').className = 'challenged';
        
        // Add complexity tax indicators
        if (complexityTaxMultiplier > 1.2) {
            const taxIndicator = document.createElement('span');
            taxIndicator.className = 'complexity-tax-indicator';
            taxIndicator.textContent = ` (+${Math.round((complexityTaxMultiplier - 1) * 100)}% tax)`;
            
            document.getElementById('challengedTCO').appendChild(taxIndicator.cloneNode(true));
            document.getElementById('challengedTTV').appendChild(taxIndicator.cloneNode(true));
        }
    }

    displayAggressiveChallengeWarning(userChoice, recommendedChoice, complexityTaxMultiplier) {
        // Create aggressive challenge overlay
        const warningOverlay = document.createElement('div');
        warningOverlay.className = 'aggressive-challenge-overlay';
        warningOverlay.innerHTML = `
            <div class="aggressive-warning-content">
                <div class="warning-header">
                    <span class="warning-icon">🚨</span>
                    <h3>AGGRESSIVE CHALLENGE MODE ACTIVATED</h3>
                </div>
                <div class="warning-message">
                    <p><strong>Mathematical Reality Check:</strong></p>
                    <p>Your Pivot Point of ${this.calculatePivotPoint().toFixed(2)} indicates your team is <strong>${Math.round(((this.state.aci / this.state.tcs - 1) * 100))}% overwhelmed</strong> by ${this.formatArchitectureName(userChoice)}.</p>
                    <p><strong>Complexity Tax Applied:</strong> ${Math.round((complexityTaxMultiplier - 1) * 100)}% penalty on cost and timeline.</p>
                    <p><strong>Business Impact:</strong> This choice will burn through your runway ${complexityTaxMultiplier.toFixed(1)}x faster than necessary.</p>
                </div>
                <button class="acknowledge-warning" onclick="this.parentElement.parentElement.remove()">
                    I Understand the Risk
                </button>
            </div>
        `;
        
        document.body.appendChild(warningOverlay);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (warningOverlay.parentElement) {
                warningOverlay.remove();
            }
        }, 10000);
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        element.classList.add('tco-counter');
        
        let currentValue = 0;
        const increment = targetValue / 50; // 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            element.textContent = `$${this.formatCurrency(Math.round(currentValue))}`;
        }, stepTime);
    }

    applyVerdictStyling(isUserChoiceWinner, userTCO, recommendedTCO, userTTV, recommendedTTV) {
        // Reset all classes
        document.querySelectorAll('.winner, .challenged').forEach(el => {
            el.classList.remove('winner', 'challenged');
        });
        
        // Apply styling based on actual performance
        const tcoWinner = (isUserChoiceWinner ? userTCO.total : recommendedTCO.total) <= 
                         (isUserChoiceWinner ? recommendedTCO.total : userTCO.total);
        const ttvWinner = (isUserChoiceWinner ? userTTV : recommendedTTV) <= 
                         (isUserChoiceWinner ? recommendedTTV : userTTV);
        
        document.getElementById('recommendedTCO').className = 'winner';
        document.getElementById('challengedTCO').className = 'challenged';
        
        document.getElementById('recommendedTTV').className = 'winner';
        document.getElementById('challengedTTV').className = 'challenged';
        
        document.getElementById('recommendedRisk').className = 'winner';
        document.getElementById('challengedRisk').className = 'challenged';
    }

    initializeWhatIfSliders() {
        const teamSizeSlider = document.getElementById('teamSizeSlider');
        const timelineSlider = document.getElementById('timelineSlider');
        
        // Set initial values
        const currentTeamSize = this.getNumericTeamSize(this.state.teamSize);
        const currentTimeline = parseInt(this.state.timeline) || 6;
        
        teamSizeSlider.value = currentTeamSize;
        timelineSlider.value = currentTimeline;
        
        // Add event listeners
        teamSizeSlider.addEventListener('input', (e) => this.updateWhatIf());
        timelineSlider.addEventListener('input', (e) => this.updateWhatIf());
        
        // Initial update
        this.updateWhatIf();
    }

    getNumericTeamSize(teamSizeString) {
        const sizeMap = {
            '1': 1, '2': 2, '3-5': 4, '6-10': 8, '11-20': 15, '20+': 25
        };
        return sizeMap[teamSizeString] || 2;
    }

    updateWhatIf() {
        const teamSize = document.getElementById('teamSizeSlider').value;
        const timeline = document.getElementById('timelineSlider').value;
        
        // Update display values
        document.getElementById('teamSizeValue').textContent = teamSize;
        document.getElementById('timelineValue').textContent = timeline;
        
        // Calculate new pivot point
        const experience = this.state.experience || 'mixed';
        const scalingNeeds = this.state.scalingNeeds || 'saas';
        const architecture = this.state.architectureChoice;
        
        // Temporarily update state for calculation
        const originalTeamSize = this.state.teamSize;
        const originalTimeline = this.state.timeline;
        
        this.state.teamSize = this.getTeamSizeString(teamSize);
        this.state.timeline = timeline;
        
        const newPivotPoint = this.calculatePivotPoint();
        const newRecommendation = this.getRecommendedArchitecture();
        
        // Restore original state
        this.state.teamSize = originalTeamSize;
        this.state.timeline = originalTimeline;
        
        // Update What-If display
        document.getElementById('whatIfPivotPoint').textContent = newPivotPoint.toFixed(2);
        
        const pivotStatus = document.getElementById('whatIfPivotStatus');
        if (newPivotPoint < 0.5) {
            pivotStatus.textContent = '🚨 Critical Zone';
            pivotStatus.className = 'pivot-status critical';
        } else if (newPivotPoint < 1) {
            pivotStatus.textContent = '⚠️ Warning Zone';
            pivotStatus.className = 'pivot-status warning';
        } else {
            pivotStatus.textContent = '✅ Safe Zone';
            pivotStatus.className = 'pivot-status safe';
        }
        
        // Update recommendation change
        const changeText = newRecommendation !== architecture ? 
            `${this.formatArchitectureName(newRecommendation)} becomes recommended` :
            `${this.formatArchitectureName(architecture)} remains optimal`;
        document.getElementById('recommendationChange').querySelector('.new-recommendation').textContent = changeText;
    }

    getTeamSizeString(numericSize) {
        if (numericSize <= 1) return '1';
        if (numericSize <= 2) return '2';
        if (numericSize <= 5) return '3-5';
        if (numericSize <= 10) return '6-10';
        if (numericSize <= 20) return '11-20';
        return '20+';
    }

    copyReportToClipboard() {
        try {
            const report = this.generateSimpleReport();
            navigator.clipboard.writeText(report).then(() => {
                alert('Report copied to clipboard! You can paste it into any text editor.');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = report;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Report copied to clipboard! You can paste it into any text editor.');
            });
        } catch (error) {
            console.error('Copy to clipboard failed:', error);
            alert('Copy failed. Please check the console for details.');
        }
    }

    formatArchitectureName(arch) {
        const names = {
            'monolith': 'Monolith',
            'microservices': 'Microservices',
            'serverless': 'Serverless',
            'hybrid': 'Hybrid'
        };
        return names[arch] || arch;
    }

    formatCurrency(amount) {
        return (amount / 1000).toFixed(0) + 'K';
    }

    getRiskLevel(architecture) {
        const pivotPoint = this.calculatePivotPoint();
        
        if (architecture === 'monolith') return 'Low';
        if (architecture === 'serverless') return 'Medium';
        if (architecture === 'microservices' && pivotPoint < 1) return 'High (Complexity Tax)';
        if (architecture === 'microservices') return 'Medium';
        if (architecture === 'hybrid') return 'High';
        
        return 'Medium';
    }

    updateDealbreakersUI(dealbreakers) {
        const dealbreakersList = document.getElementById('dealbreakers');
        const migrationCard = document.querySelector('.migration-card');
        
        dealbreakersList.innerHTML = '';
        
        if (dealbreakers.dealbreakers.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No critical dealbreakers detected';
            li.style.color = 'var(--success-green)';
            li.style.borderLeftColor = 'var(--success-green)';
            li.style.background = 'rgba(5, 150, 105, 0.05)';
            dealbreakersList.appendChild(li);
        } else {
            dealbreakers.dealbreakers.forEach(dealbreaker => {
                const li = document.createElement('li');
                li.textContent = dealbreaker;
                dealbreakersList.appendChild(li);
            });
            
            // Add "The Math" section if there are dealbreakers
            const mathSection = document.createElement('div');
            mathSection.className = 'math-section';
            mathSection.innerHTML = `
                Team Capability Score: ${this.state.tcs.toFixed(1)} units<br>
                Architecture Complexity: ${this.state.aci.toFixed(1)} units<br>
                Complexity Overload: ${((this.state.aci / this.state.tcs - 1) * 100).toFixed(0)}%<br>
                Pivot Point: ${this.state.pivotPoint.toFixed(2)} (< 1.0 = DANGER)
            `;
            dealbreakersList.parentNode.appendChild(mathSection);
        }

        // Generate and display migration roadmap
        const userChoice = this.state.architectureChoice;
        const recommendedChoice = this.getRecommendedArchitecture();
        
        if (userChoice !== recommendedChoice) {
            const businessImpact = {
                costDifference: Math.abs(this.calculateTCO(userChoice).total - this.calculateTCO(recommendedChoice).total),
                timeAdvantage: Math.abs(this.calculateTimeToValue(userChoice) - this.calculateTimeToValue(recommendedChoice))
            };
            
            const migrationRoadmap = this.generateMigrationRoadmap(
                recommendedChoice, 
                userChoice, 
                { complexity: this.state.aci, capability: this.state.tcs },
                businessImpact
            );
            
            // Update migration card with strategic roadmap
            migrationCard.innerHTML = `
                <h4>🛤️ Strategic Migration Roadmap</h4>
                <div class="migration-content">
                    <div class="why-wait-section">
                        <h5>Why Wait (Strategic Context)</h5>
                        <p>${migrationRoadmap.whyWait}</p>
                    </div>
                    
                    <div class="pivot-triggers-section">
                        <h5>Hard Pivot Triggers</h5>
                        <div class="triggers-content">${migrationRoadmap.pivotTriggers}</div>
                    </div>
                    
                    <div class="derisk-roadmap-section">
                        <h5>De-Risking Roadmap</h5>
                        <div class="roadmap-content">${migrationRoadmap.deRiskingRoadmap}</div>
                    </div>
                </div>
            `;
        } else {
            // User choice is approved - show evolution strategy
            migrationCard.innerHTML = `
                <h4>🛤️ Evolution Strategy</h4>
                <div class="migration-content">
                    <p><strong>Your architectural choice is approved!</strong></p>
                    <p>Monitor these metrics for future evolution:</p>
                    <ul>
                        <li>Team growth beyond ${this.getNumericTeamSize(this.state.teamSize) * 2} developers</li>
                        <li>Traffic patterns exceeding current projections by 10x</li>
                        <li>New operational requirements or compliance needs</li>
                        <li>Pivot Point dropping below 1.0 due to increased complexity</li>
                    </ul>
                    <p><em>Reassess architectural needs every 12-18 months or when constraints change significantly.</em></p>
                </div>
            `;
        }
    }

    exportVerdict() {
        try {
            console.log('Starting export...');
            
            // Get basic data first
            const userChoice = this.state.architectureChoice;
            const recommendedChoice = this.getRecommendedArchitecture();
            const pivotPoint = this.calculatePivotPoint();
            
            console.log('Basic data:', { userChoice, recommendedChoice, pivotPoint });
            
            // Create a simple report first to test
            const simpleReport = this.generateSimpleReport();
            console.log('Simple report generated');
            
            const blob = new Blob([simpleReport], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `architectiq-verdict-${Date.now()}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Export completed successfully');
        } catch (error) {
            console.error('Export failed with error:', error);
            console.error('Error stack:', error.stack);
            alert(`Export failed: ${error.message}`);
        }
    }

    generateSimpleReport() {
        const userChoice = this.state.architectureChoice;
        const recommendedChoice = this.getRecommendedArchitecture();
        const pivotPoint = this.calculatePivotPoint();
        const userTCO = this.calculateTCO(userChoice);
        const recommendedTCO = this.calculateTCO(recommendedChoice);
        const userTTV = this.calculateTimeToValue(userChoice);
        const recommendedTTV = this.calculateTimeToValue(recommendedChoice);
        const isApproved = userChoice === recommendedChoice;
        const costDifference = Math.abs(userTCO.total - recommendedTCO.total);
        const complexityOverload = ((this.state.aci / this.state.tcs - 1) * 100);
        
        // Generate quantifiable pivot triggers
        const pivotTriggers = this.generateQuantifiablePivotTriggers(userChoice);
        
        // Generate reinvestment argument
        const reinvestmentArgument = this.generateReinvestmentArgument(costDifference, isApproved);
        
        // Generate phased de-risking roadmap
        const deRiskingRoadmap = this.generatePhasedDeRiskingRoadmap(userChoice, recommendedChoice);
        
        return `# 🏛️ ArchitectIQ Senior Technical Architect Report

## Executive Summary
- **Team Assessment**: ${this.state.teamSize} developers (${this.state.experience} experience)
- **Timeline Pressure**: ${this.state.timeline} months (${this.getTimelinePressure()})
- **Scale Target**: ${this.formatScaleTarget(this.state.scalingNeeds)}
- **Pivot Point**: ${pivotPoint.toFixed(2)} ${pivotPoint < 0.5 ? '🚨 CRITICAL' : pivotPoint < 1 ? '⚠️ WARNING' : '✅ SAFE'}

## Architectural Decision
- **Your Choice**: ${this.formatArchitectureName(userChoice)}
- **ArchitectIQ Recommendation**: ${this.formatArchitectureName(recommendedChoice)}
- **Final Verdict**: ${isApproved ? '✅ **APPROVED**' : '⚠️ **ALTERNATIVE RECOMMENDED**'}

## 📊 Mathematical Analysis (The Hard Data)

### Team Complexity Score (TCS) vs Architecture Complexity Index (ACI)
\`\`\`
Team Capability Score: ${this.state.tcs.toFixed(1)} units
Architecture Complexity Demand: ${this.state.aci.toFixed(1)} units
Pivot Point = ${this.state.tcs.toFixed(1)} ÷ ${this.state.aci.toFixed(1)} = ${pivotPoint.toFixed(2)}

${pivotPoint < 1 ? `⚠️ COMPLEXITY OVERLOAD: ${complexityOverload.toFixed(0)}%
Your team is mathematically overwhelmed by the chosen architecture.` : '✅ SUSTAINABLE: Team can handle the architectural complexity.'}
\`\`\`

## 💰 Financial Impact & Reinvestment Strategy

### 3-Year Total Cost of Ownership
- **${this.formatArchitectureName(recommendedChoice)}** (Recommended): **$${this.formatCurrency(recommendedTCO.total)}**
- **${this.formatArchitectureName(userChoice)}** (Your Choice): **$${this.formatCurrency(userTCO.total)}**
- **Cost Difference**: ${userTCO.total > recommendedTCO.total ? `$${this.formatCurrency(costDifference)} MORE expensive` : userTCO.total < recommendedTCO.total ? `$${this.formatCurrency(costDifference)} SAVINGS` : 'Equivalent cost'}

${reinvestmentArgument}

## ⏱️ Time to Market Impact
- **${this.formatArchitectureName(recommendedChoice)}**: ${recommendedTTV} months to MVP
- **${this.formatArchitectureName(userChoice)}**: ${userTTV} months to MVP
- **Competitive Advantage**: ${userTTV > recommendedTTV ? `${userTTV - recommendedTTV} months SLOWER to market` : userTTV < recommendedTTV ? `${recommendedTTV - userTTV} months FASTER to market` : 'Same timeline'}

## 🎯 Quantifiable Pivot Triggers

${pivotTriggers}

## 🛤️ Phased De-Risking Migration Strategy

${deRiskingRoadmap}

## 🚨 Emotional Business Impact Warning

${this.generateEmotionalBusinessWarning(pivotPoint, userChoice, recommendedChoice)}

## 📋 Executive Summary for Stakeholders

**For Engineering Leadership:**
- **Bottom Line**: ${isApproved ? `Proceed with ${this.formatArchitectureName(userChoice)}` : `Switch to ${this.formatArchitectureName(recommendedChoice)} to save $${this.formatCurrency(costDifference)}`}
- **Risk Assessment**: ${pivotPoint < 0.5 ? 'HIGH RISK - Team burnout likely' : pivotPoint < 1 ? 'MODERATE RISK - Monitor closely' : 'LOW RISK - Sustainable choice'}
- **Timeline Impact**: ${isApproved ? userTTV : recommendedTTV} months to market

**For Business Leadership:**
- **Financial Impact**: ${isApproved ? `Current budget allocation` : `$${this.formatCurrency(costDifference)} ${userTCO.total > recommendedTCO.total ? 'cost reduction opportunity' : 'additional investment required'}`}
- **Competitive Position**: ${isApproved ? userTTV : recommendedTTV}-month time to market
- **Growth Enablement**: ${costDifference > 0 ? `$${this.formatCurrency(costDifference)} available for product development` : 'Optimized for current constraints'}

---

*This analysis was generated by ArchitectIQ Senior Technical Architect on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*

**Methodology**: Mathematical analysis based on Team Complexity Score (TCS), Architecture Complexity Index (ACI), and Pivot Point calculation. All cost estimates include 3-year TCO with team size and experience multipliers. Pivot triggers are based on scale breakpoint analysis and operational maturity assessments.`;
    }

    generateQuantifiablePivotTriggers(architecture) {
        const currentTeamSize = this.getNumericTeamSize(this.state.teamSize);
        const scaleBreakpoints = this.calculateScaleBreakpoints(architecture);
        
        return `### When to Reconsider ${this.formatArchitectureName(architecture)}:

**Team Scale Trigger**: When your engineering team grows beyond **${scaleBreakpoints.teamThreshold} developers** (currently ${currentTeamSize})

**Traffic Trigger**: When you consistently handle **${scaleBreakpoints.trafficThreshold.toLocaleString()} requests/second** with sustained load

**Deployment Trigger**: When you need **${scaleBreakpoints.deploymentFrequency}+ independent deployments daily** across separate business units

**Operational Trigger**: When you have **dedicated DevOps engineers** (minimum ${Math.ceil(scaleBreakpoints.teamThreshold / 15)}) and 24/7 on-call rotation

**Pivot Point Threshold**: When your recalculated Pivot Point **exceeds 1.5 consistently** for 6+ months

**Business Trigger**: When different components require **${scaleBreakpoints.scalingDivergence}x different scaling patterns** or independent release cycles`;
    }

    generateReinvestmentArgument(costDifference, isApproved) {
        if (costDifference < 50000) {
            return `### Reinvestment Strategy: Equivalent Costs
Both architectural choices have similar financial impact. Focus on team capability and operational simplicity.`;
        }

        if (isApproved) {
            return `### Reinvestment Strategy: Optimized Allocation
Your architectural choice is cost-effective. Continue with current budget allocation and monitor for future scaling needs.`;
        }

        const developerMonths = Math.floor(costDifference / 12000); // $12K per developer-month
        const featureCount = Math.floor(costDifference / 50000); // $50K per major feature

        return `### 💡 The Reinvestment Argument

**Strategic Opportunity**: The $${this.formatCurrency(costDifference)} saved by choosing the recommended architecture should be **reinvested into product growth**, not infrastructure complexity.

**Reinvestment Options**:
- **${developerMonths} additional developer-months** for feature development
- **${featureCount} major product features** that drive customer value
- **Market expansion** or customer acquisition initiatives
- **Technical debt reduction** in core business logic

**Business Impact**: Instead of spending ${Math.round((costDifference / this.calculateTCO(this.state.architectureChoice).total) * 100)}% of your engineering budget on operational overhead, invest it in competitive advantages that matter to customers.

**The Infrastructure Tax**: Complex architectures consume engineering cycles on plumbing instead of product. Every dollar saved on unnecessary complexity is a dollar that can drive revenue growth.`;
    }

    generatePhasedDeRiskingRoadmap(userChoice, recommendedChoice) {
        const migrationCost = 400000; // Standard migration cost
        const migrationMonths = 6;
        
        if (userChoice === recommendedChoice) {
            return `### Evolution Roadmap (Your Choice is Approved)

**Phase 1 - Foundation (Months 1-6)**:
- Establish monitoring and observability baselines
- Document architectural decision records (ADRs)
- Set up automated testing and deployment pipelines
- **Investment**: $50K in tooling and process establishment

**Phase 2 - Optimization (Months 7-12)**:
- Performance tuning and bottleneck identification
- Team skill development and knowledge sharing
- Capacity planning for anticipated growth
- **Investment**: $75K in optimization and training

**Phase 3 - Scale Preparation (Months 13-18)**:
- Prepare for future architectural evolution when triggers are hit
- Establish migration-ready code boundaries
- Build operational expertise for next-level complexity
- **Investment**: $100K in preparation and capability building`;
        }

        return `### 🛡️ Phased De-Risking Migration Strategy

**Phase 1 - Modular Boundaries (Months 1-2)**:
- Refactor existing ${this.formatArchitectureName(userChoice)} into well-defined domain boundaries
- Implement API contracts and service interfaces within current architecture
- Establish comprehensive monitoring and distributed tracing capabilities
- **Investment**: $${this.formatCurrency(migrationCost * 0.2)} (${Math.round(migrationCost * 0.2 / 12000)} developer-months)
- **Risk Level**: LOW - No deployment changes, internal refactoring only

**Phase 2 - First Service Pilot (Months 3-4)**:
- Extract least critical, most isolated service (e.g., ${this.suggestPilotService()})
- Implement service mesh and API gateway for pilot service
- Establish operational procedures for distributed systems
- **Investment**: $${this.formatCurrency(migrationCost * 0.3)} (${Math.round(migrationCost * 0.3 / 12000)} developer-months)
- **Risk Level**: MEDIUM - Affects <5% of traffic, full rollback capability

**Phase 3 - Full Migration (Months 5-${migrationMonths})**:
- Migrate remaining services based on business priority and coupling analysis
- Complete operational transformation (monitoring, alerting, on-call procedures)
- Team training on distributed systems and operational excellence
- **Investment**: $${this.formatCurrency(migrationCost * 0.5)} (${Math.round(migrationCost * 0.5 / 12000)} developer-months)
- **Risk Level**: MANAGED - Gradual rollout with comprehensive rollback plans

**Total Migration Investment**: $${this.formatCurrency(migrationCost)} over ${migrationMonths} months
**Success Criteria**: Zero downtime, maintained feature velocity, team confidence in new architecture
**Rollback Strategy**: Each phase has independent rollback capability with <1 hour recovery time`;
    }

    generateEmotionalBusinessWarning(pivotPoint, userChoice, recommendedChoice) {
        if (pivotPoint >= 1.0) {
            return `### ✅ Business Confidence Assessment
Your architectural choice aligns with team capabilities. The mathematical analysis supports sustainable development velocity and manageable operational overhead.`;
        }

        const scenario = this.generateEmotionalScenario();
        const velocityImpact = scenario.velocityImpact;
        const monthsToBreakdown = Math.round(12 / (this.state.aci / this.state.tcs));

        return `### 🚨 Business Risk Warning: Resume-Driven Development Detected

**The Harsh Reality**: ${scenario.challenge.substring(0, 200)}...

**Timeline Impact**: Your team will experience a **${velocityImpact}** velocity drop within ${monthsToBreakdown} months. This means:
- **Feature delivery slows** from weekly to monthly releases
- **Bug fixes take longer** due to distributed system complexity
- **Team morale drops** as developers spend 60% of time on infrastructure instead of product

**Financial Consequence**: The "cool technology" choice will cost you **$${this.formatCurrency(Math.abs(this.calculateTCO(userChoice).total - this.calculateTCO(recommendedChoice).total))} extra** over 3 years - money that could fund ${Math.floor(Math.abs(this.calculateTCO(userChoice).total - this.calculateTCO(recommendedChoice).total) / 120000)} additional developers.

**Competitive Risk**: While your team debugs service mesh configurations, competitors using simpler architectures will ship features **${Math.abs(this.calculateTimeToValue(userChoice) - this.calculateTimeToValue(recommendedChoice))} months faster**.

**The Bottom Line**: This isn't about being "boring" - it's about protecting your runway and staying focused on what customers actually pay for.`;
    }

    generateVerdictReport() {
        const userChoice = this.state.architectureChoice;
        const recommendedChoice = this.getRecommendedArchitecture();
        const pivotPoint = this.calculatePivotPoint();
        const userTCO = this.calculateTCO(userChoice);
        const recommendedTCO = this.calculateTCO(recommendedChoice);
        const userTTV = this.calculateTimeToValue(userChoice);
        const recommendedTTV = this.calculateTimeToValue(recommendedChoice);
        const dealbreakers = this.detectDealbreakers(userChoice);
        const scenario = this.generateEmotionalScenario();
        
        const isApproved = userChoice === recommendedChoice;
        const complexityOverload = ((this.state.aci / this.state.tcs - 1) * 100);
        
        // Generate migration roadmap separately to avoid template literal issues
        let migrationSection = '';
        if (isApproved) {
            migrationSection = this.generateApprovedMigrationSection();
        } else {
            migrationSection = this.generateChallengedMigrationSection(userChoice, recommendedChoice, userTCO, recommendedTCO, userTTV, recommendedTTV);
        }
        
        return `# 🏛️ ArchitectIQ Verdict Report
*Senior Technical Architect Analysis*

---

## Executive Summary

**Project Assessment:**
- **Team Size**: ${this.state.teamSize} developers
- **Experience Level**: ${this.formatExperienceLevel(this.state.experience)}
- **Timeline Pressure**: ${this.state.timeline} months (${this.getTimelinePressure()})
- **Scale Target**: ${this.formatScaleTarget(this.state.scalingNeeds)}

**Architectural Decision:**
- **Your Choice**: ${this.formatArchitectureName(userChoice)}
- **ArchitectIQ Recommendation**: ${this.formatArchitectureName(recommendedChoice)}
- **Final Verdict**: ${isApproved ? '✅ **APPROVED**' : '⚠️ **ALTERNATIVE RECOMMENDED**'}

---

## 📊 Mathematical Analysis (The Hard Data)

### Team Complexity Score (TCS) Calculation
\`\`\`
Base Team Size: ${this.getNumericTeamSize(this.state.teamSize)} developers
Experience Multiplier: ${this.getExperienceMultiplier(this.state.experience)}x
Team Capability Score: ${this.state.tcs.toFixed(1)} units
\`\`\`

### Architecture Complexity Index (ACI) Calculation
\`\`\`
Base Architecture Complexity: ${this.getArchitectureComplexity(userChoice)}x
Timeline Pressure Multiplier: ${this.getTimelinePressureMultiplier()}x
Scale Complexity Multiplier: ${this.getScaleMultiplier()}x
Total Complexity Demand: ${this.state.aci.toFixed(1)} units
\`\`\`

### Pivot Point Analysis
\`\`\`
Pivot Point = Team Capability ÷ Architecture Complexity
Pivot Point = ${this.state.tcs.toFixed(1)} ÷ ${this.state.aci.toFixed(1)} = ${pivotPoint.toFixed(2)}

Risk Assessment:
${pivotPoint >= 1.0 ? '✅ SAFE ZONE (≥ 1.0)' : pivotPoint >= 0.5 ? '⚠️ WARNING ZONE (0.5-1.0)' : '🚨 CRITICAL ZONE (< 0.5)'}
${pivotPoint < 1.0 ? `Complexity Overload: ${complexityOverload.toFixed(0)}%` : 'Team can handle the architectural complexity'}
\`\`\`

---

## 💰 Financial Impact Analysis (3-Year TCO)

| Architecture | Development | Infrastructure | Maintenance | **Total** |
|--------------|-------------|----------------|-------------|-----------|
| **${this.formatArchitectureName(recommendedChoice)}** (Recommended) | $${this.formatCurrency(recommendedTCO.development)} | $${this.formatCurrency(recommendedTCO.infrastructure)} | $${this.formatCurrency(recommendedTCO.maintenance)} | **$${this.formatCurrency(recommendedTCO.total)}** |
| **${this.formatArchitectureName(userChoice)}** (Your Choice) | $${this.formatCurrency(userTCO.development)} | $${this.formatCurrency(userTCO.infrastructure)} | $${this.formatCurrency(userTCO.maintenance)} | **$${this.formatCurrency(userTCO.total)}** |

**Cost Difference**: ${userTCO.total > recommendedTCO.total ? `$${this.formatCurrency(userTCO.total - recommendedTCO.total)} MORE expensive` : userTCO.total < recommendedTCO.total ? `$${this.formatCurrency(recommendedTCO.total - userTCO.total)} LESS expensive` : 'Equivalent cost'}

---

## ⏱️ Time to Market Analysis

- **${this.formatArchitectureName(recommendedChoice)}**: ${recommendedTTV} months to MVP
- **${this.formatArchitectureName(userChoice)}**: ${userTTV} months to MVP
- **Time Difference**: ${userTTV > recommendedTTV ? `${userTTV - recommendedTTV} months SLOWER` : userTTV < recommendedTTV ? `${recommendedTTV - userTTV} months FASTER` : 'Same timeline'}

---

## 🚨 Risk Assessment & Dealbreakers

### Critical Issues Detected:
${dealbreakers.dealbreakers.length === 0 ? '✅ No critical dealbreakers identified' : dealbreakers.dealbreakers.map(db => `- 🚩 ${db}`).join('\n')}

### Complexity Tax Warning:
${scenario.challenge.replace(/\*\*/g, '').substring(0, 300)}...

**Predicted Impact:**
- **Velocity Impact**: ${scenario.velocityImpact}
- **Complexity Tax Level**: ${scenario.complexityTax}
- **Team Burnout Risk**: ${pivotPoint < 0.5 ? 'HIGH' : pivotPoint < 1.0 ? 'MODERATE' : 'LOW'}

---

${migrationSection}

---

## 🎯 Final Recommendation

${isApproved ? `**APPROVED**: Your choice of ${this.formatArchitectureName(userChoice)} is mathematically sound given your constraints.

**Key Success Factors:**
- Maintain current team composition and experience level
- Stick to the ${this.state.timeline}-month timeline
- Monitor complexity as you scale

**Next Steps:**
1. Proceed with ${this.formatArchitectureName(userChoice)} implementation
2. Establish monitoring for the identified metrics
3. Plan for future architectural evolution as constraints change` : `**RECOMMENDATION**: Switch to ${this.formatArchitectureName(recommendedChoice)} for optimal results.

**Why the Change:**
- **Mathematical Justification**: Your Pivot Point of ${pivotPoint.toFixed(2)} indicates ${complexityOverload > 0 ? `${complexityOverload.toFixed(0)}% complexity overload` : 'manageable complexity'}
- **Financial Impact**: Save $${this.formatCurrency(Math.abs(userTCO.total - recommendedTCO.total))} over 3 years
- **Risk Mitigation**: Reduce team burnout and delivery risk

**Implementation Strategy:**
1. Start with ${this.formatArchitectureName(recommendedChoice)} for MVP
2. Build operational expertise gradually
3. Consider migration to ${this.formatArchitectureName(userChoice)} when Pivot Point > 1.0`}

---

## 📋 Stakeholder Summary

**For Engineering Leadership:**
- Pivot Point: ${pivotPoint.toFixed(2)} (${pivotPoint >= 1.0 ? 'Sustainable' : 'Overloaded'})
- 3-Year TCO: $${this.formatCurrency(isApproved ? userTCO.total : recommendedTCO.total)}
- Time to Market: ${isApproved ? userTTV : recommendedTTV} months

**For Business Leadership:**
- **Bottom Line**: ${isApproved ? `Proceed as planned` : `Switch to ${this.formatArchitectureName(recommendedChoice)} to save $${this.formatCurrency(Math.abs(userTCO.total - recommendedTCO.total))}`}
- **Risk Level**: ${this.getRiskLevel(isApproved ? userChoice : recommendedChoice)}
- **Competitive Advantage**: ${isApproved ? userTTV : recommendedTTV}-month time to market

---

*This analysis was generated by ArchitectIQ on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*

**Methodology**: Mathematical analysis based on Team Complexity Score (TCS), Architecture Complexity Index (ACI), and Pivot Point calculation. TCO estimates include development, infrastructure, and maintenance costs over 36 months with team size and experience multipliers applied.`;
    }

    copyReportToClipboard() {
        try {
            const report = this.generateSimpleReport();
            navigator.clipboard.writeText(report).then(() => {
                alert('Report copied to clipboard! You can paste it into any text editor.');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = report;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Report copied to clipboard! You can paste it into any text editor.');
            });
        } catch (error) {
            console.error('Copy to clipboard failed:', error);
            alert('Copy failed. Please check the console for details.');
        }
    }

    generateApprovedMigrationSection() {
        return `## 🛤️ Strategic Migration Roadmap

### Evolution Strategy (Your Choice is Approved)

**Monitoring Triggers**: Keep an eye on these metrics for future architectural evolution:
- **Team Growth**: Reassess when team exceeds ${this.getNumericTeamSize(this.state.teamSize) * 2} developers
- **Traffic Scale**: Monitor for 10x growth beyond current projections  
- **Operational Complexity**: Watch for Pivot Point dropping below 1.0
- **Business Requirements**: New compliance, security, or integration needs

**Recommended Review Cycle**: Every 12-18 months or when constraints change significantly.

**Success Indicators**: Your current architecture remains optimal as long as:
- Pivot Point stays above 1.0
- Team can deploy confidently within ${this.state.timeline} month cycles
- Operational overhead remains under 20% of engineering time`;
    }

    generateChallengedMigrationSection(userChoice, recommendedChoice, userTCO, recommendedTCO, userTTV, recommendedTTV) {
        const businessImpact = {
            costDifference: Math.abs(userTCO.total - recommendedTCO.total),
            timeAdvantage: Math.abs(userTTV - recommendedTTV)
        };
        
        const migrationRoadmap = this.generateMigrationRoadmap(
            recommendedChoice, 
            userChoice, 
            { complexity: this.state.aci, capability: this.state.tcs },
            businessImpact
        );
        
        return `## 🛤️ Strategic Migration Roadmap

### Migration Strategy (Alternative Recommended)

#### Why Wait (Strategic Context)
${migrationRoadmap.whyWait}

${migrationRoadmap.pivotTriggers}

${migrationRoadmap.deRiskingRoadmap}`;
    }

    // Helper methods for report generation
    formatExperienceLevel(exp) {
        const levels = {
            'junior': 'Junior (0-2 years)',
            'mixed': 'Mixed Experience',
            'senior': 'Senior (5+ years)', 
            'expert': 'Expert/Architect Level'
        };
        return levels[exp] || exp;
    }

    getTimelinePressure() {
        const pressures = {
            '1': 'Crisis Mode',
            '3': 'High Pressure',
            '6': 'Balanced',
            '12': 'Strategic',
            '18+': 'Long-term Planning'
        };
        return pressures[this.state.timeline] || 'Standard';
    }

    formatScaleTarget(scale) {
        const targets = {
            'utility': 'Enterprise Utility (1K-100K users)',
            'saas': 'SaaS Product (10K-1M users)',
            'consumer': 'Consumer App (100K-10M users)',
            'platform': 'Platform/Marketplace (1M+ users)'
        };
        return targets[scale] || scale;
    }

    getExperienceMultiplier(exp) {
        const multipliers = {
            'junior': 0.5,
            'mixed': 0.75,
            'senior': 1.0,
            'expert': 1.5
        };
        return multipliers[exp] || 0.5;
    }

    getArchitectureComplexity(arch) {
        const complexity = {
            'monolith': 1,
            'serverless': 2,
            'microservices': 4,
            'hybrid': 3
        };
        return complexity[arch] || 1;
    }

    getTimelinePressureMultiplier() {
        const multipliers = {
            '1': 2.0,
            '3': 1.5,
            '6': 1.0,
            '12': 0.8,
            '18+': 0.6
        };
        return multipliers[this.state.timeline] || 1.0;
    }

    getScaleMultiplier() {
        const multipliers = {
            'utility': 1.0,
            'saas': 1.2,
            'consumer': 1.8,
            'platform': 2.5
        };
        return multipliers[this.state.scalingNeeds] || 1.0;
    }

    resetAnalysis() {
        // Reset state
        this.state = {
            teamSize: null,
            experience: null,
            timeline: null,
            scalingNeeds: null,
            architectureChoice: null,
            currentAct: 'interrogation',
            currentQuestion: 1,
            pivotPoint: 0,
            complexityScore: 0,
            tcs: 0,
            aci: 0
        };
        
        // Reset UI
        document.querySelectorAll('.act').forEach(act => act.classList.remove('active'));
        document.getElementById('interrogation').classList.add('active');
        
        document.querySelectorAll('.question-card').forEach(card => card.classList.remove('active'));
        document.getElementById('question1').classList.add('active');
        
        document.querySelectorAll('.selected').forEach(btn => btn.classList.remove('selected'));
        
        document.getElementById('experienceSelector').style.display = 'none';
        document.getElementById('proceedToStressTest').style.display = 'none';
        document.getElementById('architecturalDefense').value = '';
        
        this.updateComplexityMeter();
    }
}

// Initialize ArchitectIQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.architectIQ = new ArchitectIQ();
});

// Add some utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });
    
    // Add loading states for better UX
    const addLoadingState = (element, duration = 1000) => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, duration);
    };
    
    // Enhance button interactions
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                addLoadingState(this, 300);
            }
        });
    });
});