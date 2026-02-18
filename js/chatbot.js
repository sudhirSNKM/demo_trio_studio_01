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
                "Hey! 👋 Welcome to FortuMars AI. How can we help you today?",
                "Hi there! Looking to transform your business with AI?",
                "Hello! Ready to innovate with FortuMars AI solutions?"
            ],
            'price|cost|budget|quote': [
                "Our pricing is tailored to your solution needs. Would you like to request a consultation?",
                "Each enterprise solution is unique. Let's discuss your requirements for a custom quote.",
                "We offer competitive pricing for AI and software development. Click 'Get a Quote' to start the converstation!"
            ],
            'portfolio|work|projects': [
                "Check out our Portfolio page to see our latest innovations! We've delivered scalable solutions globally.",
                "We'd love to show you our success stories! Head to the Portfolio section to explore our case studies.",
                "Our portfolio showcases AI dashboards, ERM systems, and mobile apps. What type of solution interests you?"
            ],
            'team|who|members': [
                "We are a global team of AI specialists, software engineers, and business strategists. Visit 'About Us' to learn more!",
                "FortuMars AI consists of expert teams working across the UK, India, and UAE. Want to know more?",
                "Our team brings together AI, ERP, and CRM expertise. Check out our 'About Us' page!"
            ],
            'contact|email|call|reach': [
                "You can reach us through our Contact page, or email our support team directly.",
                "Let's connect! Visit our Contact page to send us a message or schedule a demo.",
                "We'd love to hear from you! Head to the Contact page to get in touch with our global offices."
            ],
            'services|what|do': [
                "We specialize in AI Agents, CRM/ERP Systems, App Development, and Business Intelligence. Check out our Services page!",
                "Our services cover AI Innovation, Software Development, and Digital Strategy. Want to learn more?",
                "We offer comprehensive digital transformation solutions. Visit our Services page to see how we can help!"
            ],
            'time|timeline|how long': [
                "Project timelines vary based on complexity. We prioritize agile delivery and quality.",
                "We work efficiently to deploy solutions. Typical enterprise projects have phased rollouts.",
                "Timeline depends on the scope. We'll provide a detailed roadmap during our consultation."
            ],
            'thanks|thank you': [
                "You're welcome! Anything else I can help with?",
                "Happy to help! Feel free to ask more questions about our AI solutions.",
                "My pleasure! Let me know if you need anything else."
            ],
            'default': [
                "That's a great question! For detailed information, I'd recommend checking out our website or contacting our team directly.",
                "I'm here to assist! Could you provide more details about your business needs?",
                "Interesting! While I'm still learning, our consultants would love to discuss this with you. Want to get in touch?",
                "I want to make sure I give you the best answer. Could you rephrase that or visit our Contact page to speak with an expert?"
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
