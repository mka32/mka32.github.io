// PROFILE PAGE FUNCTIONALITY

// Initialize profile page
function initProfile() {
    loadProfile();
    setupSaveButton();
    setupAvatarUpload();
}

// Load profile data
function loadProfile() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Set form values from saved data
    if (userData.familyType) {
        document.getElementById('family-type').value = userData.familyType;
    }
    if (userData.name) {
        document.getElementById('full-name').value = userData.name;
    }
    if (userData.age) {
        document.getElementById('age').value = userData.age;
    }
    if (userData.caste) {
        document.getElementById('caste').value = userData.caste;
    }
    if (userData.religion) {
        document.getElementById('religion').value = userData.religion;
    }
    if (userData.profession) {
        document.getElementById('profession').value = userData.profession;
    }
    if (userData.education) {
        document.getElementById('education').value = userData.education;
    }
    if (userData.dowry) {
        document.getElementById('dowry').value = userData.dowry;
    }
    if (userData.preferences) {
        document.getElementById('preferences').value = userData.preferences;
    }
}

// Setup save button
function setupSaveButton() {
    document.querySelector('.btn-save').addEventListener('click', function() {
        const userData = {
            familyType: document.getElementById('family-type').value,
            name: document.getElementById('full-name').value,
            age: document.getElementById('age').value,
            caste: document.getElementById('caste').value,
            religion: document.getElementById('religion').value,
            profession: document.getElementById('profession').value,
            education: document.getElementById('education').value,
            dowry: document.getElementById('dowry').value,
            preferences: document.getElementById('preferences').value
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        showToast('Profile saved successfully', 'success');
        
        // Update profile name display
        if (userData.name) {
            document.getElementById('profile-name').textContent = userData.name;
        }
    });
}

// Setup avatar upload
function setupAvatarUpload() {
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';
    
    document.querySelector('.edit-avatar').addEventListener('click', function() {
        avatarInput.click();
    });
    
    avatarInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profile-image').src = event.target.result;
                showToast('Profile picture updated', 'success');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProfile);