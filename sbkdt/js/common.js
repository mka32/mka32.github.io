// COMMON UTILITIES AND INITIALIZATION

// Format currency (Indian Rupees)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize the app
function initApp() {
    setupNavigation();
    loadUserData();
    updateActiveNav();
    setupBackButtons();
}

// Set up navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

// Load user data from localStorage
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Update profile name if element exists
    const profileName = document.getElementById('profile-name');
    if (profileName && userData.name) {
        profileName.textContent = userData.name;
    }
    
    // Update welcome message if element exists
    const welcomeName = document.getElementById('username');
    if (welcomeName && userData.name) {
        welcomeName.textContent = userData.name;
    }
}

// Update active navigation item
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Setup back buttons
function setupBackButtons() {
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.history.back();
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);