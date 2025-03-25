// DOWRY CALCULATOR FUNCTIONALITY

// Multiplier values
const multipliers = {
    profession: {
        engineer: 1.5,
        doctor: 2.0,
        ias: 2.5,
        ca: 1.8,
        business: 1.7,
        lawyer: 1.6
    },
    education: {
        'iim-iit': 1.5,
        'top-college': 1.2,
        'regular': 1.0
    },
    familyStatus: {
        'wealthy': 1.8,
        'upper-middle': 1.3,
        'middle': 1.0
    },
    location: {
        'metro': 1.5,
        'tier1': 1.2,
        'tier2': 1.0,
        'tier3': 0.8
    }
};

// Initialize calculator
function initCalculator() {
    setupRangeInputs();
    setupCalculateButton();
}

// Setup range inputs
function setupRangeInputs() {
    const ageInput = document.getElementById('groom-age');
    const ageValue = document.getElementById('age-value');
    
    ageInput.addEventListener('input', function() {
        ageValue.textContent = `${this.value} years`;
    });
}

// Setup calculate button
function setupCalculateButton() {
    document.getElementById('calculate-btn').addEventListener('click', calculateDowry);
}

// Calculate dowry estimate
function calculateDowry() {
    const profession = document.getElementById('profession').value;
    const education = document.getElementById('education').value;
    const familyStatus = document.getElementById('family-status').value;
    const age = parseInt(document.getElementById('groom-age').value);
    const location = document.getElementById('location').value;
    
    // Base value (10 lakh)
    let baseValue = 1000000;
    
    // Apply multipliers
    const professionMultiplier = multipliers.profession[profession] || 1;
    const educationMultiplier = multipliers.education[education] || 1;
    const familyMultiplier = multipliers.familyStatus[familyStatus] || 1;
    const locationMultiplier = multipliers.location[location] || 1;
    
    // Age factor (younger grooms get higher dowry)
    const ageFactor = 1 + (30 - age) * 0.05;
    
    // Calculate final dowry
    const calculatedDowry = baseValue * 
                          professionMultiplier * 
                          educationMultiplier * 
                          familyMultiplier * 
                          locationMultiplier * 
                          ageFactor;
    
    // Display result
    document.getElementById('dowry-result').textContent = formatCurrency(calculatedDowry);
    
    // Show breakdown
    showBreakdown({
        baseValue,
        profession,
        professionMultiplier,
        education,
        educationMultiplier,
        familyStatus,
        familyMultiplier,
        location,
        locationMultiplier,
        age,
        ageFactor,
        calculatedDowry
    });
}

// Show calculation breakdown
function showBreakdown(data) {
    const breakdown = document.getElementById('breakdown-details');
    breakdown.innerHTML = `
        <h4>Calculation Breakdown:</h4>
        <div class="breakdown-grid">
            <div class="breakdown-item">
                <span>Base Value:</span>
                <span>${formatCurrency(data.baseValue)}</span>
            </div>
            <div class="breakdown-item">
                <span>Profession (${data.profession}):</span>
                <span>×${data.professionMultiplier}</span>
            </div>
            <div class="breakdown-item">
                <span>Education (${data.education}):</span>
                <span>×${data.educationMultiplier}</span>
            </div>
            <div class="breakdown-item">
                <span>Family Status (${data.familyStatus}):</span>
                <span>×${data.familyMultiplier}</span>
            </div>
            <div class="breakdown-item">
                <span>Location (${data.location}):</span>
                <span>×${data.locationMultiplier}</span>
            </div>
            <div class="breakdown-item">
                <span>Age Factor (${data.age} years):</span>
                <span>×${data.ageFactor.toFixed(2)}</span>
            </div>
            <div class="breakdown-item total">
                <span>Total:</span>
                <span>${formatCurrency(data.calculatedDowry)}</span>
            </div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalculator);