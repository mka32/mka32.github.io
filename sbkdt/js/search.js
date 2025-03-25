// SEARCH PAGE FUNCTIONALITY

// Sample search data
const searchData = [
    {
        id: 101,
        name: "Ankit Jain",
        age: 27,
        caste: "Jain",
        profession: "IAS Officer",
        dowry: 3500000,
        location: "New Delhi",
        isVerified: true
    },
    {
        id: 102,
        name: "Neha Reddy",
        age: 24,
        caste: "Reddy",
        profession: "Dentist",
        dowry: 2200000,
        location: "Hyderabad",
        isVerified: false
    },
    {
        id: 103,
        name: "Rahul Malhotra",
        age: 29,
        caste: "Khatri",
        profession: "Pilot",
        dowry: 4000000,
        location: "Mumbai",
        isVerified: true
    }
];

// Initialize search page
function initSearch() {
    loadRecommendations();
    setupSearch();
    setupAdvancedFilters();
}

// Load and render recommendations
function loadRecommendations() {
    renderRecommendations(searchData);
}

// Render recommendations to DOM
function renderRecommendations(recommendations) {
    const container = document.querySelector('.discover-grid');
    container.innerHTML = '';
    
    recommendations.forEach(item => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        card.innerHTML = `
            <div class="discover-image">
                <i class="fas fa-user"></i>
                ${item.isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>' : ''}
            </div>
            <div class="discover-info">
                <h4>${item.name}, ${item.age}</h4>
                <p>${item.caste} • ${item.location}</p>
                <p>${item.profession}</p>
                <p class="discover-price">${formatCurrency(item.dowry)}</p>
                <button class="btn-view" data-id="${item.id}">
                    <i class="fas fa-eye"></i> View Profile
                </button>
            </div>
        `;
        container.appendChild(card);
    });
    
    setupViewButtons();
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            const filtered = searchData.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.caste.toLowerCase().includes(query) ||
                item.profession.toLowerCase().includes(query)
            );
            renderRecommendations(filtered);
        } else if (query.length === 0) {
            renderRecommendations(searchData);
        }
    });
}

// Setup advanced filters
function setupAdvancedFilters() {
    const toggleBtn = document.getElementById('toggle-advanced');
    const filtersSection = document.getElementById('advanced-filters');
    
    toggleBtn.addEventListener('click', function() {
        filtersSection.classList.toggle('show');
        this.innerHTML = filtersSection.classList.contains('show') ? 
            '<i class="fas fa-sliders-h"></i> Hide Filters' : 
            '<i class="fas fa-sliders-h"></i> Filters';
    });
    
    document.getElementById('apply-filters').addEventListener('click', function() {
        const minDowry = parseInt(document.getElementById('min-dowry').value) || 0;
        const maxDowry = parseInt(document.getElementById('max-dowry').value) || Infinity;
        const caste = document.getElementById('caste-filter').value;
        const profession = document.getElementById('profession-filter').value;
        
        const filtered = searchData.filter(item => {
            return (
                item.dowry >= minDowry &&
                item.dowry <= maxDowry &&
                (caste === '' || item.caste.toLowerCase() === caste) &&
                (profession === '' || item.profession.toLowerCase() === profession)
            );
        });
        
        renderRecommendations(filtered);
        showToast(`${filtered.length} matches found`, 'info');
    });
}

// Setup view buttons
function setupViewButtons() {
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const profileId = this.getAttribute('data-id');
            viewProfile(profileId);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);