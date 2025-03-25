// MATCHES PAGE FUNCTIONALITY

// Sample match data
const matchesData = [
    {
        id: 1,
        name: "Aarav Sharma",
        age: 28,
        location: "Delhi",
        caste: "Brahmin",
        profession: "Software Engineer",
        education: "IIT Delhi",
        dowry: 1800000,
        status: "negotiable",
        lastActive: "2 hours ago",
        isPremium: true
    },
    {
        id: 2,
        name: "Dharmindar Patel",
        age: 25,
        location: "Mumbai",
        caste: "Patel",
        profession: "Doctor",
        education: "AIIMS",
        dowry: 2500000,
        status: "fixed",
        lastActive: "1 day ago",
        isPremium: false
    },
    {
        id: 3,
        name: "Vikram Singh",
        age: 30,
        location: "Bangalore",
        caste: "Rajput",
        profession: "Business",
        education: "MBA",
        dowry: 3000000,
        status: "negotiable",
        lastActive: "3 hours ago",
        isPremium: true
    },
    {
        id: 4,
        name: "Murlidhar Swami",
        age: 22,
        location: "Rajnagar",
        caste: "Dalit",
        profession: "Business",
        education: "MBA",
        dowry: 30000000,
        status: "negotiable",
        lastActive: "3 hours ago",
        isPremium: true
    }
];

// Initialize matches page
function initMatches() {
    loadMatches();
    setupFilter();
    setupRefreshButton();
}

// Load and render matches
function loadMatches(filter = 'all') {
    let filteredMatches = matchesData;
    
    if (filter === 'new') {
        filteredMatches = matchesData.filter(match => match.lastActive.includes('hour'));
    } else if (filter === 'premium') {
        filteredMatches = matchesData.filter(match => match.isPremium);
    } else if (filter === 'negotiable') {
        filteredMatches = matchesData.filter(match => match.status === 'negotiable');
    } else if (filter === 'fixed') {
        filteredMatches = matchesData.filter(match => match.status === 'fixed');
    }
    
    renderMatches(filteredMatches);
}

// Render matches to DOM
function renderMatches(matches) {
    const container = document.querySelector('.matches-list');
    container.innerHTML = '';
    
    if (matches.length === 0) {
        container.innerHTML = '<p class="no-matches">No matches found. Try adjusting your filters.</p>';
        return;
    }
    
    matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-card-header">
                <div class="match-avatar">
                    <i class="fas fa-user"></i>
                    ${match.isPremium ? '<span class="premium-badge">Premium</span>' : ''}
                </div>
                <div class="match-info">
                    <h3>${match.name}, ${match.age}</h3>
                    <p>${match.location} • ${match.caste}</p>
                </div>
                <div class="match-dowry">${formatCurrency(match.dowry)}</div>
            </div>
            <div class="match-details">
                <div class="match-details-row">
                    <div class="match-details-label">Profession:</div>
                    <div class="match-details-value">${match.profession}</div>
                </div>
                <div class="match-details-row">
                    <div class="match-details-label">Education:</div>
                    <div class="match-details-value">${match.education}</div>
                </div>
                <div class="match-details-row">
                    <div class="match-details-label">Status:</div>
                    <div class="match-details-value ${match.status}">
                        ${match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </div>
                </div>
            </div>
            <div class="match-actions">
                <button class="btn-message" data-id="${match.id}">
                    <i class="fas fa-comment-dots"></i> Message
                </button>
                <button class="btn-compare" data-id="${match.id}">
                    <i class="fas fa-balance-scale"></i> Compare
                </button>
            </div>
        `;
        container.appendChild(matchCard);
    });
    
    setupMatchButtons();
}

// Setup filter functionality
function setupFilter() {
    const filterSelect = document.getElementById('matches-filter');
    filterSelect.addEventListener('change', function() {
        loadMatches(this.value);
    });
}

// Setup refresh button
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refresh-matches');
    refreshBtn.addEventListener('click', function() {
        this.classList.add('refreshing');
        setTimeout(() => {
            loadMatches(document.getElementById('matches-filter').value);
            this.classList.remove('refreshing');
            showToast('Matches refreshed', 'success');
        }, 1000);
    });
}

// Setup match action buttons
function setupMatchButtons() {
    document.querySelectorAll('.btn-message').forEach(btn => {
        btn.addEventListener('click', function() {
            const matchId = this.getAttribute('data-id');
            startChat(matchId);
        });
    });
    
    document.querySelectorAll('.btn-compare').forEach(btn => {
        btn.addEventListener('click', function() {
            const matchId = this.getAttribute('data-id');
            compareMatch(matchId);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMatches);
