document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    // Hiển thị chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.add('active');
        // Gửi tin nhắn chào mừng khi mở chatbot lần đầu
        if (chatbotMessages.children.length === 0) {
            addBotMessage("Xin chào! Tôi là trợ lý ảo VinFast. Tôi có thể giúp gì cho bạn về các dòng xe VinFast?");
        }
    });
    
    // Ẩn chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Gửi tin nhắn khi nhấn nút gửi
    sendMessage.addEventListener('click', sendUserMessage);
    
    // Gửi tin nhắn khi nhấn Enter
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Xử lý quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            userInput.value = message;
            sendUserMessage();
        });
    });
    
    // Hàm gửi tin nhắn người dùng
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addUserMessage(message);
        userInput.value = '';
        
        // Gửi tin nhắn đến Flask server
        fetch('http://localhost:5001/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: 'user_' + Date.now(),
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Hiển thị phản hồi từ bot
            data.forEach(response => {
                if (response.text) {
                    addBotMessage(response.text);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            addBotMessage("Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.");
        });
    }
    
    // Thêm tin nhắn người dùng vào khung chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Thêm tin nhắn bot vào khung chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Tự động cuộn xuống tin nhắn mới nhất
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});