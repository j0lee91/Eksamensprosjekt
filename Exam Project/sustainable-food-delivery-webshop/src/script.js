// This file contains JavaScript code for interactivity, including form validation and API integration.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); // Assuming there's a form in your HTML
    const chatbotButton = document.getElementById('chatbot-button'); // Assuming there's a button for the chatbot
    const chatbotContainer = document.getElementById('chatbot-container'); // Assuming there's a container for the chatbot

    // Add ARIA attributes for accessibility
    if (chatbotButton) {
        chatbotButton.setAttribute('aria-controls', 'chatbot-container');
        chatbotButton.setAttribute('aria-expanded', chatbotContainer.classList.contains('active') ? 'true' : 'false');
        chatbotButton.setAttribute('aria-label', 'Open chat with FRAM');
    }
    if (chatbotContainer) {
        chatbotContainer.setAttribute('role', 'dialog');
        chatbotContainer.setAttribute('aria-modal', 'true');
        chatbotContainer.setAttribute('aria-label', 'FRAM AI Chatbot');
    }

    // Form validation
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputs = form.querySelectorAll('input, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('error'); // Add error class for styling
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.classList.remove('error');
                input.removeAttribute('aria-invalid');
            }
        });

        if (valid) {
            // Handle form submission
            console.log('Form submitted successfully!');
            // You can add your form submission logic here
        }
    });

    // Chatbot functionality
    chatbotButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active'); // Toggle visibility of the chatbot
        chatbotButton.setAttribute('aria-expanded', chatbotContainer.classList.contains('active') ? 'true' : 'false');
        if (chatbotContainer.classList.contains('active')) {
            chatbotContainer.focus();
        }
    });

    // Chatbot form submission with error handling
    const chatbotForm = document.getElementById('ai-chatbot-form');
    const chatbotInput = document.getElementById('ai-chatbot-input');
    const chatbotMessages = document.getElementById('ai-chatbot-messages');
    const closeChatbotBtn = document.getElementById('close-ai-chatbot');

    if (chatbotForm && chatbotInput && chatbotMessages) {
        chatbotForm.setAttribute('role', 'form');
        chatbotInput.setAttribute('aria-label', 'Type your question to FRAM');
        chatbotMessages.setAttribute('role', 'log');
        chatbotMessages.setAttribute('aria-live', 'polite');
        chatbotMessages.setAttribute('aria-relevant', 'additions');

        chatbotForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const userMessage = chatbotInput.value.trim();
            if (!userMessage) return;

            // Display user message
            const userMsgDiv = document.createElement('div');
            userMsgDiv.className = 'ai-message ai-user';
            userMsgDiv.textContent = userMessage;
            userMsgDiv.setAttribute('role', 'status');
            chatbotMessages.prepend(userMsgDiv);

            chatbotInput.value = '';
            chatbotInput.disabled = true;

            // Show loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'ai-message ai-bot ai-bot-loading';
            loadingDiv.textContent = '...';
            loadingDiv.setAttribute('role', 'status');
            chatbotMessages.prepend(loadingDiv);

            try {
                const botReply = await callOpenAI(userMessage);
                loadingDiv.remove();
                const botMsgDiv = document.createElement('div');
                botMsgDiv.className = 'ai-message ai-bot';
                botMsgDiv.innerHTML = `<span class="ai-bot-name">FRAM</span> ${botReply}`;
                botMsgDiv.setAttribute('role', 'status');
                chatbotMessages.prepend(botMsgDiv);
            } catch (error) {
                loadingDiv.remove();
                const errorDiv = document.createElement('div');
                errorDiv.className = 'ai-message ai-bot';
                errorDiv.style.color = '#DC4131';
                errorDiv.innerHTML = `<span class="ai-bot-name">FRAM</span> Sorry, something went wrong. Please try again later.`;
                errorDiv.setAttribute('role', 'alert');
                chatbotMessages.prepend(errorDiv);
                console.error('Chatbot error:', error);
            } finally {
                chatbotInput.disabled = false;
                chatbotInput.focus();
            }
        });
    }

    // Close chatbot with ARIA
    if (closeChatbotBtn && chatbotContainer) {
        closeChatbotBtn.setAttribute('aria-label', 'Close chat');
        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
            chatbotButton.setAttribute('aria-expanded', 'false');
            chatbotButton.focus();
        });
    }

    // Example function to call OpenAI API
    async function callOpenAI(prompt) {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY` 
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    }

    
    if (document.getElementById('map')) {
        try {
            maptilersdk.config.apiKey = "YOUR_MAPTILER_API_KEY";
            const map = new maptilersdk.Map({
                container: 'map',
                style: maptilersdk.MapStyle.STREETS,
                center: [10.7522, 59.9139], 
                zoom: 10
            });

            
            new maptilersdk.Marker({ color: "#2E8B57" })
                .setLngLat([10.7522, 59.9139])
                .addTo(map);

            map.on('error', function (e) {
                showMapError("Map failed to load. Please try again later.");
                console.error("MapTiler error:", e);
            });
        } catch (err) {
            showMapError("Map could not be initialized. Please check your connection.");
            console.error("MapTiler initialization error:", err);
        }
    }

    function showMapError(message) {
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
            mapDiv.innerHTML = `<div style="color:#DC4131;text-align:center;padding:2em;" role="alert">${message}</div>`;
            mapDiv.style.background = "#fff3f3";
        }
    }
});


function updateCartCount(count) {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.setAttribute('aria-label', `${count} items in cart`);
    }
}


updateCartCount(3); 