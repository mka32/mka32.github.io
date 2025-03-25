// CHAT PAGE FUNCTIONALITY

// Sample chat data
const chatData = [
    {
        id: 1,
        name: "Rajesh Gupta Family",
        lastMessage: "Finalizing ₹15L dowry agreement",
        unread: 2,
        isActive: true,
        type: "family"
    },
    {
        id: 2,
        name: "Legal Consultation",
        lastMessage: "Document review needed",
        unread: 0,
        isActive: false,
        type: "legal"
    },
    {
        id: 3,
        name: "Patel Family Negotiation",
        lastMessage: "Considering installment option",
        unread: 1,
        isActive: true,
        type: "family"
    }
];

// Initialize chat page
function initChat() {
    loadChats();
    setupNewChatButton();
}

// Load and render chats
function loadChats() {
    const container = document.querySelector('.chat-list');
    container.innerHTML = '';
    
    chatData.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.innerHTML = `
            <div class="chat-avatar">
                ${chat.type === 'legal' ? 
                    '<i class="fas fa-balance-scale"></i>' : 
                    '<i class="fas fa-user-tie"></i>'}
                ${chat.unread > 0 ? `<span class="unread-count">${chat.unread}</span>` : ''}
            </div>
            <div class="chat-info">
                <h4>${chat.name}</h4>
                <p>${chat.lastMessage}</p>
            </div>
            <div class="chat-status">
                <span class="status-${chat.isActive ? 'active' : 'inactive'}"></span>
            </div>
        `;
        container.appendChild(chatItem);
    });
    
    setupChatItems();
}

// Setup chat item click handlers
function setupChatItems() {
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', function() {
            // In a real app, this would open the chat
            showToast('Chat opened', 'info');
        });
    });
}

// Setup new chat button
function setupNewChatButton() {
    document.getElementById('new-chat').addEventListener('click', function() {
        // In a real app, this would open a new chat modal
        showToast('New chat started', 'success');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);