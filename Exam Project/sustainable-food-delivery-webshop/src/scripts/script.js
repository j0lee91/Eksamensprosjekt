document.addEventListener('DOMContentLoaded', function() {
    // ===== Navigation menu logic =====
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const closeMenu = document.getElementById('close-menu');
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    });
    closeMenu.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.remove('show');
    });
    document.addEventListener('click', function(e) {
        if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // ===== Cart count logic =====
    let cartCount = 0;
    const cartCountSpan = document.getElementById('cart-count');
    document.querySelectorAll('.add-basket-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            cartCount++;
            cartCountSpan.textContent = cartCount;
        });
    });

    // ===== Chatbot logic =====
    const chatbotPopup = document.getElementById('ai-chatbot-popup');
    const chatbotForm = document.getElementById('ai-chatbot-form');
    const chatbotInput = document.getElementById('ai-chatbot-input');
    const chatbotMessages = document.getElementById('ai-chatbot-messages');
    const chatbotSendBtn = chatbotForm.querySelector('button[type="submit"]');
    const disconnectBox = document.getElementById('ai-chatbot-disconnect');

    function openChatbot() {
        chatbotPopup.style.display = 'flex';
        setTimeout(() => chatbotInput.focus(), 100);
    }
    function closeChatbot() {
        chatbotPopup.style.display = 'none';
    }

    // Open chatbot on menu/chat button
    document.querySelectorAll('a[href="chat.html"], .button').forEach(function(el) {
        el.addEventListener('click', function(e) {
            if (
                el.classList.contains('button') && el.textContent.includes('Go to chat')
                || (el.getAttribute('href') === 'chat.html')
            ) {
                e.preventDefault();
                openChatbot();
            }
        });
    });

    // Close button
    document.getElementById('close-ai-chatbot').addEventListener('click', closeChatbot);

    // Click outside to close
    document.addEventListener('mousedown', function(e) {
        if (chatbotPopup.style.display === 'flex' && !chatbotPopup.contains(e.target)) {
            chatbotPopup.style.display = 'none';
        }
    });

    // Change arrow to x when input is empty, and close on click if x
    chatbotInput.addEventListener('input', function() {
        if (chatbotInput.value.trim() === '') {
            chatbotSendBtn.textContent = 'x';
        } else {
            chatbotSendBtn.innerHTML = '&uarr;';
        }
    });

    chatbotSendBtn.addEventListener('click', function(e) {
        if (chatbotInput.value.trim() === '') {
            e.preventDefault();
            closeChatbot();
        }
    });

    // Example: Show disconnect box (call this when needed)
    // disconnectBox.style.display = 'block'; // To show
    // disconnectBox.style.display = 'none';  // To hide

    // Chatbot message logic (newest at bottom)
    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = chatbotInput.value.trim();
        if (!userMsg) return;

        // User message
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-message ai-user';
        userDiv.textContent = userMsg;
        chatbotMessages.prepend(userDiv);

        // Loading dots as bot message
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'ai-message ai-bot';
        loadingDiv.innerHTML = '<span class="ai-bot-name">FRAM</span> <span class="ai-bot-loading">...</span>';
        chatbotMessages.prepend(loadingDiv);

        chatbotInput.value = '';
        chatbotSendBtn.textContent = 'x';

        // Simulate AI reply after loading
        setTimeout(function() {
            loadingDiv.innerHTML = '<span class="ai-bot-name">FRAM</span> I\'m an AI assistant. We\'ll get back to you soon!';
        }, 700);
    });

    // Navigation: Make "FRAM" always go to index.html
    document.querySelectorAll('nav ul li a').forEach(function(link) {
        if (link.textContent.trim() === 'FRAM') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    });

    // Partner Locations Map (Leaflet.js)
    var mapContainer = document.getElementById('map');
    if (mapContainer) {
        var map = L.map('map').setView([59.91, 10.75], 10); // Oslo coordinates and zoom
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var partners = [
            { name: "Oslo Farmer", coords: [59.9139, 10.7522] },
            { name: "Bergen Grower", coords: [60.39299, 5.32415] },
            { name: "Trondheim Collective", coords: [63.4305, 10.3951] }
        ];

        partners.forEach(function (partner) {
            L.marker(partner.coords)
                .addTo(map)
                .bindPopup(`<strong>${partner.name}</strong>`);
        });
    }

    // Initialize Leaflet map if #map exists
    document.addEventListener("DOMContentLoaded", function () {
        var mapDiv = document.getElementById('map');
        if (mapDiv) {
            // Set a default height if not set in CSS
            mapDiv.style.height = "400px";

            // Initialize the map (centered on Oslo, Norway as example)
            var map = L.map('map').setView([59.91, 10.75], 10);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
        }
    });
});