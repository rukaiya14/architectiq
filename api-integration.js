// ArchitectIQ API Integration Layer
// Enhances the existing client-side calculations with serverless functions

class ArchitectIQAPI {
    constructor() {
        this.baseURL = '';
        this.fallbackMode = false;
    }

    async calculateWithAPI(teamSize, experience, timeline, scale, architecture) {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamSize: parseInt(teamSize),
                    experience,
                    timeline: parseInt(timeline),
                    scale: parseInt(scale),
                    architecture
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };

        } catch (error) {
            console.warn('API calculation failed, using fallback:', error);
            this.fallbackMode = true;
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getRecommendations(calculationResult, teamSize, experience, timeline, architecture) {
        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pivotPoint: calculationResult.pivotPoint,
                    teamSize: parseInt(teamSize),
                    experience,
                    timeline: parseInt(timeline),
                    architecture,
                    riskLevel: calculationResult.riskLevel
                })
            });

            if (!response.ok) {
                throw new Error(`Recommendation API Error: ${response.status}`);
            }

            const recommendations = await response.json();
            return {
                success: true,
                data: recommendations
            };

        } catch (error) {
            console.warn('Recommendation API failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Enhanced UI updates with API data
    updateUIWithAPIResults(apiResult) {
        if (!apiResult.success) return false;

        const result = apiResult.data;
        
        // Update pivot point display
        const pivotElement = document.getElementById('floatingPivot');
        if (pivotElement) {
            pivotElement.textContent = result.pivotPoint;
            pivotElement.className = `pivot-${result.riskLevel}`;
        }

        // Update complexity meter
        const complexityMeter = document.getElementById('complexityMeter');
        if (complexityMeter) {
            const complexityPercentage = Math.min(100, (1 / result.pivotPoint) * 50);
            complexityMeter.style.width = `${complexityPercentage}%`;
            
            if (result.pivotPoint < 0.5) {
                complexityMeter.classList.add('critical');
            } else {
                complexityMeter.classList.remove('critical');
            }
        }

        // Show dealbreakers if any
        if (result.dealbreakers && result.dealbreakers.length > 0) {
            this.displayDealbreakers(result.dealbreakers);
        }

        // Display API-enhanced recommendation
        this.displayAPIRecommendation(result);

        return true;
    }

    displayDealbreakers(dealbreakers) {
        let dealbreakersDiv = document.getElementById('api-dealbreakers');
        if (!dealbreakersDiv) {
            dealbreakersDiv = document.createElement('div');
            dealbreakersDiv.id = 'api-dealbreakers';
            dealbreakersDiv.className = 'api-dealbreakers-section';
            
            // Insert after complexity meter
            const complexitySection = document.querySelector('.complexity-meter-container');
            if (complexitySection) {
                complexitySection.parentNode.insertBefore(dealbreakersDiv, complexitySection.nextSibling);
            }
        }

        dealbreakersDiv.innerHTML = `
            <div class="dealbreaker-alert">
                <h4>⚠️ Critical Issues Detected</h4>
                ${dealbreakers.map(db => `<div class="dealbreaker-item">• ${db}</div>`).join('')}
            </div>
        `;
    }

    displayAPIRecommendation(result) {
        let recommendationDiv = document.getElementById('api-recommendation');
        if (!recommendationDiv) {
            recommendationDiv = document.createElement('div');
            recommendationDiv.id = 'api-recommendation';
            recommendationDiv.className = 'api-recommendation-section';
            
            // Insert in results area
            const resultsSection = document.querySelector('.results');
            if (resultsSection) {
                resultsSection.appendChild(recommendationDiv);
            }
        }

        const riskColor = result.riskLevel === 'critical' ? '#dc2626' : 
                         result.riskLevel === 'warning' ? '#d97706' : '#059669';

        recommendationDiv.innerHTML = `
            <div class="api-recommendation-card" style="border-left: 4px solid ${riskColor}">
                <h4>🤖 AI-Enhanced Analysis</h4>
                <div class="recommendation-content">
                    <p><strong>Pivot Point:</strong> ${result.pivotPoint} (${result.riskLevel.toUpperCase()})</p>
                    <p><strong>Team Complexity Score:</strong> ${result.tcs}</p>
                    <p><strong>Architecture Complexity:</strong> ${result.aci}</p>
                    <p><strong>Complexity Tax:</strong> ${result.complexityTax}x multiplier</p>
                    <div class="recommendation-text">
                        ${result.recommendation}
                    </div>
                </div>
            </div>
        `;
    }

    async displayEnhancedRecommendations(recommendations) {
        if (!recommendations.success) return;

        const data = recommendations.data;
        let enhancedDiv = document.getElementById('enhanced-recommendations');
        
        if (!enhancedDiv) {
            enhancedDiv = document.createElement('div');
            enhancedDiv.id = 'enhanced-recommendations';
            enhancedDiv.className = 'enhanced-recommendations-section';
            
            const resultsSection = document.querySelector('.results');
            if (resultsSection) {
                resultsSection.appendChild(enhancedDiv);
            }
        }

        enhancedDiv.innerHTML = `
            <div class="enhanced-recommendations-card">
                <h4>📊 Business Impact Analysis</h4>
                
                <div class="primary-recommendation">
                    ${data.primary}
                </div>

                <div class="business-impact-section">
                    <h5>💰 Financial Impact</h5>
                    <div class="cost-grid">
                        <div class="cost-item">
                            <span class="cost-label">Monthly Cost:</span>
                            <span class="cost-value">$${data.costAnalysis.monthlyCost.toLocaleString()}</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Yearly Impact:</span>
                            <span class="cost-value">$${data.costAnalysis.yearlyImpact.toLocaleString()}</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Potential Savings:</span>
                            <span class="cost-value">$${data.costAnalysis.alternativeSavings.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="timeline-section">
                    <h5>⏱️ Timeline Impact</h5>
                    <p>${data.timeline}</p>
                </div>

                <div class="alternatives-section">
                    <h5>🎯 Recommended Actions</h5>
                    <ul>
                        ${data.alternatives.map(alt => `<li>${alt}</li>`).join('')}
                    </ul>
                </div>

                <div class="reinvestment-section">
                    <h5>💡 Reinvestment Opportunities</h5>
                    <ul>
                        ${data.costAnalysis.reinvestmentOpportunities.map(opp => `<li>${opp}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}

// Global API instance
window.architectIQAPI = new ArchitectIQAPI();

// Enhanced calculation function that tries API first, falls back to client-side
window.enhancedCalculation = async function(teamSize, experience, timeline, scale, architecture) {
    // Try API first
    const apiResult = await window.architectIQAPI.calculateWithAPI(teamSize, experience, timeline, scale, architecture);
    
    if (apiResult.success) {
        // Update UI with API results
        window.architectIQAPI.updateUIWithAPIResults(apiResult);
        
        // Get enhanced recommendations
        const recommendations = await window.architectIQAPI.getRecommendations(
            apiResult.data, teamSize, experience, timeline, architecture
        );
        
        if (recommendations.success) {
            await window.architectIQAPI.displayEnhancedRecommendations(recommendations);
        }
        
        return apiResult.data;
    } else {
        // Fallback to existing client-side calculation
        console.log('Using client-side fallback calculation');
        return null; // Let existing code handle it
    }
};

// Add API status indicator
function addAPIStatusIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'api-status';
    indicator.className = 'api-status-indicator';
    indicator.innerHTML = `
        <span class="api-status-dot"></span>
        <span class="api-status-text">Enhanced AI Analysis</span>
    `;
    
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(indicator);
    }
}

// Initialize API integration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addAPIStatusIndicator();
    
    // Test API connectivity
    fetch('/api/calculate', { method: 'OPTIONS' })
        .then(() => {
            document.querySelector('.api-status-dot').style.backgroundColor = '#10b981';
            document.querySelector('.api-status-text').textContent = 'AI Analysis Active';
        })
        .catch(() => {
            document.querySelector('.api-status-dot').style.backgroundColor = '#f59e0b';
            document.querySelector('.api-status-text').textContent = 'Client-Side Mode';
        });
});