// ArchitectIQ Referee - Mathematical Architecture Analysis with Personality
// Updated: 2025-01-11 - Fixed CNF warning display
class ArchitectIQReferee {
    constructor() {
        this.teamProfile = {
            teamSize: '3-5',
            experience: 'mixed',
            timeline: '6',
            scale: 'saas'
        };
        
        this.architectures = ['monolith', 'serverless', 'microservices', 'hybrid'];
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('analyzeArchitectures').addEventListener('click', () => {
            this.conductRefereeAnalysis();
        });

        // Update analysis when inputs change
        ['teamSize', 'experience', 'timeline', 'scale'].forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                this.teamProfile[id] = e.target.value;
                if (document.getElementById('refereeAnalysis').style.display !== 'none') {
                    this.conductRefereeAnalysis();
                }
            });
        });
    }

    conductRefereeAnalysis() {
        // Update team profile
        this.updateTeamProfile();
        
        // Calculate all architectural metrics
        const analysisResults = this.calculateAllArchitectures();
        
        // Display referee analysis
        this.displayRefereeAnalysis(analysisResults);
        
        // Show the results section with animation
        const analysisSection = document.getElementById('refereeAnalysis');
        analysisSection.style.display = 'block';
        analysisSection.scrollIntoView({ behavior: 'smooth' });
    }

    updateTeamProfile() {
        this.teamProfile = {
            teamSize: document.getElementById('teamSize').value,
            experience: document.getElementById('experience').value,
            timeline: document.getElementById('timeline').value,
            scale: document.getElementById('scale').value
        };
    }

    calculateAllArchitectures() {
        const results = {};
        
        // Calculate TCS once (same for all architectures)
        const tcs = this.calculateTCS();
        
        // Calculate Context Normalization Factor (CNF) based on Scale Ambitions
        const cnf = this.calculateContextNormalizationFactor();
        
        this.architectures.forEach(arch => {
            const aci = this.calculateACI(arch);
            const rawPivotPoint = tcs / aci;
            const pivotPoint = rawPivotPoint * cnf; // Apply CNF equally to all architectures
            
            results[arch] = {
                tcs,
                aci,
                rawPivotPoint,
                pivotPoint,
                cnf,
                cost: this.calculateCost(arch, pivotPoint),
                timeline: this.calculateTimeline(arch, pivotPoint),
                riskLevel: this.assessRisk(pivotPoint),
                dealbreakers: this.detectDealbreakers(arch),
                suitability: this.getSuitabilityMessage(pivotPoint, arch)
            };
        });

        return results;
    }

    calculateTCS() {
        const teamSizeMap = {
            '1': 1, '2': 2, '3-5': 4, '6-10': 8, '11-20': 15, '20+': 25
        };

        const experienceMultiplier = {
            'junior': 0.5, 'mixed': 0.75, 'senior': 1.0, 'expert': 1.5
        };

        const timelineFactor = {
            '1': 0.6, '3': 0.8, '6': 1.0, '12': 1.2, '18+': 1.4
        };

        const baseSize = teamSizeMap[this.teamProfile.teamSize] || 4;
        const expMultiplier = experienceMultiplier[this.teamProfile.experience] || 0.75;
        const timeFactor = timelineFactor[this.teamProfile.timeline] || 1.0;

        return baseSize * expMultiplier * timeFactor;
    }

    calculateACI(architecture) {
        const baseComplexity = {
            'monolith': 20, 'serverless': 60, 'microservices': 80, 'hybrid': 65
        };

        const timelinePressure = {
            '1': 2.0, '3': 1.5, '6': 1.0, '12': 0.8, '18+': 0.6
        };

        const scaleMultiplier = {
            'utility': 0.8, 'saas': 1.0, 'consumer': 1.3, 'platform': 1.6
        };

        // NEW: Workload Suitability Factor (WSF)
        const workloadSuitabilityFactor = this.calculateWSF(architecture);

        const base = baseComplexity[architecture] || 20;
        const pressure = timelinePressure[this.teamProfile.timeline] || 1.0;
        const scale = scaleMultiplier[this.teamProfile.scale] || 1.0;
        const wsf = workloadSuitabilityFactor;

        return base * pressure * scale * wsf;
    }

    calculateWSF(architecture) {
        // Infer workload type from Scale Ambitions
        const workloadType = this.inferWorkloadType();
        
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

    inferWorkloadType() {
        // Map Scale Ambitions to workload patterns
        const workloadMapping = {
            'utility': 'steady',    // Enterprise Utility → Steady workload
            'saas': 'mixed',        // SaaS Product → Mixed workload  
            'consumer': 'bursty',   // Consumer App → Bursty / Event-driven workload
            'platform': 'mixed'    // Platform/Marketplace → Mixed workload
        };

        return workloadMapping[this.teamProfile.scale] || 'mixed';
    }

    calculateContextNormalizationFactor() {
        // Context Normalization Factor (CNF) based ONLY on Scale Ambitions
        // Applied equally to ALL architectures to fix Pivot Point scaling
        const cnfMapping = {
            'utility': 3.0,    // Enterprise Utility (steady workload) → 3.0x
            'saas': 5.0,       // SaaS Product (mixed workload) → 5.0x
            'consumer': 8.0,   // Consumer App (bursty workload) → 8.0x
            'platform': 6.0   // Platform/Marketplace (mixed workload) → 6.0x
        };

        return cnfMapping[this.teamProfile.scale] || 5.0;
    }

    calculateRefereeScore(architecture, viableArchitectures) {
        // Stage 2: Neutral Referee Score for viable architectures only
        // Referee Score = (Pivot Point × 0.5) + (Timeline Advantage × 0.3) + (Cost Efficiency × 0.2)
        
        const pivotScore = architecture.pivotPoint * 0.5;
        
        // Timeline Advantage: fastest viable option gets 1.0, others normalized
        const viableTimelines = viableArchitectures.map(a => a.timeline);
        const fastestTimeline = Math.min(...viableTimelines);
        const timelineAdvantage = (fastestTimeline / architecture.timeline) * 0.3;
        
        // Cost Efficiency: lowest viable cost gets 1.0, others normalized  
        const viableCosts = viableArchitectures.map(a => a.cost);
        const lowestCost = Math.min(...viableCosts);
        const costEfficiency = (lowestCost / architecture.cost) * 0.2;
        
        return pivotScore + timelineAdvantage + costEfficiency;
    }

    calculateCost(architecture, pivotPoint) {
        const baseCosts = {
            'monolith': 150000, 'serverless': 200000, 'microservices': 350000, 'hybrid': 280000
        };

        const teamSizeMultiplier = this.getNumericTeamSize() / 4;
        const complexityTax = pivotPoint < 0.5 ? 2.5 : pivotPoint < 0.8 ? 1.8 : pivotPoint < 1.0 ? 1.3 : 1.0;

        return Math.round(baseCosts[architecture] * teamSizeMultiplier * complexityTax);
    }

    calculateTimeline(architecture, pivotPoint) {
        const baseTimelines = {
            'monolith': 3, 'serverless': 5, 'microservices': 9, 'hybrid': 7
        };

        const experienceMultiplier = {
            'junior': 1.8, 'mixed': 1.3, 'senior': 1.0, 'expert': 0.8
        };

        const complexityTax = pivotPoint < 0.5 ? 2.0 : pivotPoint < 0.8 ? 1.5 : pivotPoint < 1.0 ? 1.2 : 1.0;
        const expMultiplier = experienceMultiplier[this.teamProfile.experience] || 1.3;

        return Math.round(baseTimelines[architecture] * expMultiplier * complexityTax);
    }

    getNumericTeamSize() {
        const sizeMap = { '1': 1, '2': 2, '3-5': 4, '6-10': 8, '11-20': 15, '20+': 25 };
        return sizeMap[this.teamProfile.teamSize] || 4;
    }

    assessRisk(pivotPoint) {
        if (pivotPoint < 0.5) return 'critical';
        if (pivotPoint < 0.8) return 'warning';
        if (pivotPoint < 1.0) return 'caution';
        if (pivotPoint < 1.5) return 'good';
        return 'excellent';
    }

    detectDealbreakers(architecture) {
        const dealbreakers = [];
        const teamSize = this.getNumericTeamSize();
        const experience = this.teamProfile.experience;
        const timeline = this.teamProfile.timeline;
        
        if (architecture === 'microservices') {
            if (teamSize < 6) dealbreakers.push('Team too small for microservices operational overhead');
            if (experience === 'junior') dealbreakers.push('Junior team lacks microservices expertise');
            if (timeline === '1') dealbreakers.push('Timeline too short for microservices complexity');
        }
        
        if (architecture === 'serverless' && experience === 'junior') {
            dealbreakers.push('Junior team may struggle with serverless debugging complexity');
        }
        
        if (architecture === 'hybrid' && experience === 'junior') {
            dealbreakers.push('Hybrid architecture requires expertise in multiple paradigms');
        }

        return dealbreakers;
    }

    getSuitabilityMessage(pivotPoint, architecture) {
        const dealbreakers = this.detectDealbreakers(architecture);
        
        // Stage 1: Viability Gate - Strict Pivot Point Classification
        if (dealbreakers.length > 0 || pivotPoint < 0.5) {
            return 'Mathematical Disaster';
        }
        
        // Apply labels strictly by Pivot Point (never label ≥1.0 as disaster/mismatch)
        if (pivotPoint >= 1.3) return 'Mathematically Excellent';
        if (pivotPoint >= 1.0) return 'Sustainable Choice';
        if (pivotPoint >= 0.5) return 'High Complexity Tax';
        return 'Mathematical Disaster';
    }

    displayRefereeAnalysis(results) {
        // Update team capability score
        const tcs = results.monolith.tcs; // Same for all
        document.getElementById('teamCapabilityScore').textContent = tcs.toFixed(1);
        
        // Display referee warnings
        this.displayRefereeWarnings(results);
        
        // Create and display scoreboard
        this.displayArchitectureScoreboard(results);
        
        // Display mathematical breakdown
        this.displayMathematicalBreakdown(results);
        
        // Display referee verdict
        this.displayRefereeVerdict(results);
        
        // Display business impact
        this.displayBusinessImpact(results);
    }

    displayRefereeWarnings(results) {
        const warningsContainer = document.getElementById('refereeWarnings');
        warningsContainer.innerHTML = '';
        
        // Clear cache - force reload with CNF-adjusted values
        const allDealbreakers = [];
        const criticalArchitectures = [];
        
        this.architectures.forEach(arch => {
            const result = results[arch];
            // Debug: Log the actual values being used
            console.log(`${arch}: pivotPoint=${result.pivotPoint}, rawPivotPoint=${result.rawPivotPoint}`);
            
            if (result.dealbreakers.length > 0) {
                allDealbreakers.push({ arch, dealbreakers: result.dealbreakers });
            }
            if (result.pivotPoint < 0.5) {
                criticalArchitectures.push({ arch, pivotPoint: result.pivotPoint });
            }
        });
        
        if (allDealbreakers.length > 0 || criticalArchitectures.length > 0) {
            const warningDiv = document.createElement('div');
            warningDiv.className = 'referee-warning';
            
            let warningContent = '';
            
            if (criticalArchitectures.length > 0) {
                warningContent += `
                    <div class="warning-icon">🚨</div>
                    <div class="warning-content">
                        <h4>Mathematical Reality Check - CNF Fixed</h4>
                        <p>The following architectures have Pivot Points below 0.5, indicating mathematical overload:</p>
                        <ul style="margin-top: 8px; padding-left: 20px;">
                            ${criticalArchitectures.map(item => 
                                `<li><strong>${this.formatArchitectureName(item.arch)}:</strong> Pivot Point ${item.pivotPoint.toFixed(2)} - Your team is ${Math.round(((1 / item.pivotPoint - 1) * 100))}% overwhelmed</li>`
                            ).join('')}
                        </ul>
                    </div>
                `;
            }
            
            if (allDealbreakers.length > 0) {
                warningContent += `
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-content">
                        <h4>Team Capability Mismatches</h4>
                        <p>Based on your team profile, these architectural choices have fundamental compatibility issues:</p>
                        <ul style="margin-top: 8px; padding-left: 20px;">
                            ${allDealbreakers.map(item => 
                                item.dealbreakers.map(db => 
                                    `<li><strong>${this.formatArchitectureName(item.arch)}:</strong> ${db}</li>`
                                ).join('')
                            ).join('')}
                        </ul>
                    </div>
                `;
            }
            
            warningDiv.innerHTML = warningContent;
            warningsContainer.appendChild(warningDiv);
        }
    }

    displayArchitectureScoreboard(results) {
        const scoreboardGrid = document.querySelector('.scoreboard-grid');
        scoreboardGrid.innerHTML = '';
        
        // Stage 1: Classify architectures by viability and apply referee scoring
        const viable = [];
        const complexityTax = [];
        const disqualified = [];
        
        this.architectures.forEach(arch => {
            const result = results[arch];
            const dealbreakers = result.dealbreakers.length > 0;
            
            if (dealbreakers || result.pivotPoint < 0.5) {
                disqualified.push({ arch, ...result });
            } else if (result.pivotPoint >= 1.0) {
                viable.push({ arch, ...result });
            } else {
                complexityTax.push({ arch, ...result });
            }
        });
        
        // Stage 2: Sort viable by referee score, others by pivot point
        if (viable.length > 0) {
            viable.forEach(item => {
                item.refereeScore = this.calculateRefereeScore(item, viable);
            });
            viable.sort((a, b) => b.refereeScore - a.refereeScore);
        }
        
        complexityTax.sort((a, b) => b.pivotPoint - a.pivotPoint);
        disqualified.sort((a, b) => b.pivotPoint - a.pivotPoint);
        
        // Combine in order: viable, complexity tax, disqualified
        const sortedArchs = [...viable, ...complexityTax, ...disqualified];
        
        sortedArchs.forEach((item, index) => {
            const rank = index + 1;
            
            const card = document.createElement('div');
            card.className = `scoreboard-card rank-${rank}`;
            card.innerHTML = `
                <div class="card-rank rank-${rank}">${rank}</div>
                <div class="card-header">
                    <div class="card-title">${this.getArchitectureIcon(item.arch)} ${this.formatArchitectureName(item.arch)}</div>
                    <div class="pivot-score ${item.riskLevel}">${item.pivotPoint.toFixed(2)}</div>
                </div>
                <div class="card-metrics">
                    <div class="metric">
                        <span class="metric-label">💰 Cost</span>
                        <span class="metric-value">${(item.cost / 1000).toFixed(0)}K</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">⏱️ Timeline</span>
                        <span class="metric-value">${item.timeline}mo</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">🎯 Suitability</span>
                        <span class="metric-value">${item.suitability}</span>
                    </div>
                </div>
            `;
            
            scoreboardGrid.appendChild(card);
        });
    }

    displayMathematicalBreakdown(results) {
        const maxACI = Math.max(...this.architectures.map(arch => results[arch].aci));
        const teamCapability = results.monolith.tcs;
        
        // Update complexity bars
        this.architectures.forEach(arch => {
            const aci = results[arch].aci;
            const percentage = (aci / maxACI) * 100;
            
            const barFill = document.getElementById(`${arch}-complexity-bar`);
            const barValue = document.getElementById(`${arch}-complexity-value`);
            
            if (barFill && barValue) {
                barFill.style.width = `${percentage}%`;
                barValue.textContent = aci.toFixed(1);
            }
        });
        
        // Update team capability indicator
        const capabilityIndicator = document.getElementById('teamCapabilityIndicator');
        if (capabilityIndicator) {
            const capabilityPercentage = (teamCapability / maxACI) * 100;
            capabilityIndicator.style.width = `${Math.min(capabilityPercentage, 100)}%`;
        }
    }

    displayRefereeVerdict(results) {
        const verdictContainer = document.getElementById('refereeVerdictContent');
        
        // Stage 1: Viability Gate - Classify architectures by Pivot Point
        const viable = [];
        const complexityTax = [];
        const disqualified = [];
        
        this.architectures.forEach(arch => {
            const result = results[arch];
            const dealbreakers = result.dealbreakers.length > 0;
            
            if (dealbreakers || result.pivotPoint < 0.5) {
                disqualified.push({ arch, ...result });
            } else if (result.pivotPoint >= 1.0) {
                viable.push({ arch, ...result });
            } else {
                complexityTax.push({ arch, ...result });
            }
        });
        
        // Stage 2: Winner Selection Among Viable Only
        let winnerAnalysis = '';
        if (viable.length > 0) {
            // Calculate neutral referee scores for viable architectures
            const viableWithScores = viable.map(item => {
                const refereeScore = this.calculateRefereeScore(item, viable);
                return { ...item, refereeScore };
            });
            
            // Sort by referee score
            viableWithScores.sort((a, b) => b.refereeScore - a.refereeScore);
            
            // Stage 3: Multiple Winners Rule
            const topScore = viableWithScores[0].refereeScore;
            const winners = viableWithScores.filter(item => 
                (topScore - item.refereeScore) / topScore < 0.1 // < 10% difference
            );
            
            if (winners.length > 1) {
                winnerAnalysis = `
                    <div class="verdict-item">
                        <h4>🏆 Multiple Mathematically Sound Options</h4>
                        <p><strong>${winners.map(w => this.formatArchitectureName(w.arch)).join(' and ')}</strong> are both mathematically sustainable with Pivot Points of ${winners.map(w => w.pivotPoint.toFixed(2)).join(' and ')} respectively. Both options exceed the viability threshold of 1.0.</p>
                        <p><em>Referee Guidance: Both options are mathematically sustainable. Choose based on operational preference and team expertise.</em></p>
                    </div>
                `;
            } else {
                const winner = viableWithScores[0];
                winnerAnalysis = `
                    <div class="verdict-item">
                        <h4>🎯 Contextual Recommendation</h4>
                        <p>Under your constraints (${this.getConstraintSummary()}), <strong>${this.formatArchitectureName(winner.arch)}</strong> with a Pivot Point of ${winner.pivotPoint.toFixed(2)} represents the most suitable choice for the following reasons:</p>
                        <ul>
                            ${this.getArchitectureReasons(winner.arch, winner).map(reason => `<li>${reason}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        
        // Analysis of other categories
        let complexityAnalysis = '';
        if (complexityTax.length > 0) {
            const highestComplexity = complexityTax.sort((a, b) => b.pivotPoint - a.pivotPoint)[0];
            complexityAnalysis = `
                <div class="verdict-item">
                    <h4>⚠️ High Complexity Tax Zone</h4>
                    <p><strong>${this.formatArchitectureName(highestComplexity.arch)}</strong> with Pivot Point ${highestComplexity.pivotPoint.toFixed(2)} falls in the complexity tax zone. While not disqualified, this choice would result in ${Math.round(((highestComplexity.aci / highestComplexity.tcs - 1) * 100))}% capability strain and increased costs.</p>
                </div>
            `;
        }
        
        let disqualifiedAnalysis = '';
        if (disqualified.length > 0) {
            const worstChoice = disqualified.sort((a, b) => a.pivotPoint - b.pivotPoint)[0];
            disqualifiedAnalysis = `
                <div class="verdict-item">
                    <h4>❌ Disqualified Options</h4>
                    <p><strong>${this.formatArchitectureName(worstChoice.arch)}</strong> with Pivot Point ${worstChoice.pivotPoint.toFixed(2)} is mathematically disqualified. This represents a ${Math.round(((worstChoice.aci / worstChoice.tcs - 1) * 100))}% capability overload that would burn through your runway.</p>
                </div>
            `;
        }
        
        verdictContainer.innerHTML = `
            ${winnerAnalysis}
            ${complexityAnalysis}
            ${disqualifiedAnalysis}
            
            <div class="verdict-item">
                <h4>🎯 Referee Integrity</h4>
                <p>As your architectural referee, I evaluate all options equally using mathematical analysis. Any architecture with Pivot Point ≥ 1.0 is viable. The winner is determined by neutral scoring across viability, timeline, and cost efficiency - not architectural preference.</p>
            </div>
            
            <div class="verdict-item">
                <h4>📈 Evolution Strategy</h4>
                <p>Your team's capability will grow over time. When your Pivot Point for a more complex architecture consistently exceeds 1.3 for 6+ months, that's your mathematical signal to evolve. Until then, optimize for sustainable velocity over architectural sophistication.</p>
            </div>
        `;
    }

    displayBusinessImpact(results) {
        const impactGrid = document.getElementById('businessImpactGrid');
        
        // Calculate ranges
        const costs = this.architectures.map(arch => results[arch].cost);
        const timelines = this.architectures.map(arch => results[arch].timeline);
        
        const minCost = Math.min(...costs);
        const maxCost = Math.max(...costs);
        const minTimeline = Math.min(...timelines);
        const maxTimeline = Math.max(...timelines);
        
        const costSavings = maxCost - minCost;
        const timeAdvantage = maxTimeline - minTimeline;
        
        impactGrid.innerHTML = `
            <div class="impact-card">
                <h4>💰 Cost Range</h4>
                <div class="impact-value cost">$${(minCost / 1000).toFixed(0)}K - $${(maxCost / 1000).toFixed(0)}K</div>
                <div class="impact-note">Annual difference: $${(costSavings / 1000).toFixed(0)}K</div>
            </div>
            
            <div class="impact-card">
                <h4>⏱️ Timeline Range</h4>
                <div class="impact-value time">${minTimeline} - ${maxTimeline} months</div>
                <div class="impact-note">Time advantage: ${timeAdvantage} months</div>
            </div>
            
            <div class="impact-card">
                <h4>🎯 Complexity Tax</h4>
                <div class="impact-value risk">Up to 2.5x</div>
                <div class="impact-note">Applied when Pivot Point < 0.5</div>
            </div>
            
            <div class="impact-card">
                <h4>💡 Reinvestment</h4>
                <div class="impact-value cost">$${(costSavings / 1000).toFixed(0)}K</div>
                <div class="impact-note">Could fund ${Math.floor(costSavings / 120000)} developer-years</div>
            </div>
        `;
    }

    getArchitectureIcon(arch) {
        const icons = {
            'monolith': '🏢',
            'serverless': '☁️',
            'microservices': '🔗',
            'hybrid': '🔄'
        };
        return icons[arch] || '🏗️';
    }

    formatArchitectureName(arch) {
        const names = {
            'monolith': 'Monolith',
            'serverless': 'Serverless',
            'microservices': 'Microservices',
            'hybrid': 'Hybrid'
        };
        return names[arch] || arch;
    }
}

// Initialize the ArchitectIQ Referee when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.architectIQReferee = new ArchitectIQReferee();
});