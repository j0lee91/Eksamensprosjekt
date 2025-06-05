// This file contains JavaScript code for interactivity, including form validation and API integration.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); // Assuming there's a form in your HTML
    const chatbotButton = document.getElementById('chatbot-button'); // Assuming there's a button for the chatbot
    const chatbotContainer = document.getElementById('chatbot-container'); // Assuming there's a container for the chatbot

    // Form validation
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputs = form.querySelectorAll('input, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('error'); // Add error class for styling
            } else {
                input.classList.remove('error');
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
    });

    // Example function to call OpenAI API
    async function callOpenAI(prompt) {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY` // Replace with your OpenAI API key
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

    // Example usage of the OpenAI function
    // callOpenAI("Hello, how can I help you?").then(response => console.log(response)).catch(error => console.error(error));
});

// Example: Update cart count (replace with your cart logic)
function updateCartCount(count) {
    document.getElementById('cart-count').textContent = count;
}

// Example usage:
updateCartCount(3); // Set to 3 for demonstration