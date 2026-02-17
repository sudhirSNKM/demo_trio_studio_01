/* ===================================
   AI CHATBOT
   Frontend chatbot UI with mock responses
   =================================== */

class Chatbot {
    constructor() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input-field');
        this.sendBtn = document.getElementById('chatbot-send');

        this.isOpen = false;
        this.responses = this.getResponses();

        this.init();
    }

    init() {
        // Toggle chatbot
        this.toggle.addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Send message on button click
        this.sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen &&
                !this.window.contains(e.target) &&
                !this.toggle.contains(e.target)) {
                this.toggleChatbot();
            }
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.toggle.classList.toggle('active');
        this.window.classList.toggle('active');

        if (this.isOpen) {
            this.input.focus();
        }
    }

    sendMessage() {
        const message = this.input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');

        // Clear input
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate bot response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getTimeString();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            indicator.appendChild(dot);
        }

        this.messages.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    getTimeString() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Check for keywords
        for (const [keywords, responses] of Object.entries(this.responses)) {
            if (keywords.split('|').some(keyword => lowerMessage.includes(keyword))) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default response
        return this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
    }

    getResponses() {
        return {
            'hello|hi|hey': [
                "Hey! 👋 Welcome to Power Trio. How can we help you today?",
                "Hi there! Looking to start an amazing project?",
                "Hello! Ready to create something extraordinary together?"
            ],
            'price|cost|budget|quote': [
                "Our pricing varies based on project scope. Would you like to schedule a consultation to discuss your specific needs?",
                "Great question! Each project is unique. Let's chat about your requirements and we'll provide a custom quote.",
                "We offer flexible pricing tailored to your needs. Click 'Get a Quote' to tell us more about your project!"
            ],
            'portfolio|work|projects': [
                "Check out our Work page to see our latest projects! We've delivered 127+ successful projects across various industries.",
                "We'd love to show you our work! Head to the Work section to explore our case studies.",
                "Our portfolio showcases projects in web design, branding, and mobile apps. What type of work interests you?"
            ],
            'team|who|members': [
                "We're a trio of specialists: Alex (Creative Director), Jordan (Lead Developer), and Sam (Brand Strategist). Visit 'The Minds' page to learn more!",
                "Power Trio consists of three expert minds working in perfect sync. Want to meet the team?",
                "Our team brings together design, development, and strategy expertise. Check out 'The Minds' page!"
            ],
            'contact|email|call|reach': [
                "You can reach us through our Contact page, or email us directly. Each team member has their contact info in the footer!",
                "Let's connect! Visit our Contact page to send us a message or schedule a call.",
                "We'd love to hear from you! Head to the Contact page to get in touch."
            ],
            'services|what|do': [
                "We specialize in web design, brand identity, and mobile app development. Check out our Services page for details!",
                "Our three-pillar service model covers Design, Development, and Strategy. Want to learn more?",
                "We offer comprehensive digital solutions. Visit our Services page to see how we can help!"
            ],
            'time|timeline|how long': [
                "Project timelines vary from 2-12 weeks depending on scope. Let's discuss your specific needs!",
                "We work efficiently without compromising quality. Typical projects range from 4-8 weeks.",
                "Timeline depends on project complexity. We'll provide a detailed schedule during our consultation."
            ],
            'thanks|thank you': [
                "You're welcome! Anything else I can help with?",
                "Happy to help! Feel free to ask more questions.",
                "My pleasure! Let me know if you need anything else."
            ],
            'default': [
                "That's a great question! For detailed information, I'd recommend checking out our website or contacting the team directly.",
                "I'm here to help! Could you provide more details about what you're looking for?",
                "Interesting! While I'm still learning, the team would love to discuss this with you. Want to get in touch?",
                "I want to make sure I give you the best answer. Could you rephrase that or visit our Contact page to speak with the team?"
            ]
        };
    }
}

// Initialize chatbot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Chatbot();
    });
} else {
    new Chatbot();
}
