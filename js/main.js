/* ===================================
   MAIN JAVASCRIPT
   General utilities and page-specific logic
   =================================== */

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    },

    // Update active nav link
    updateActiveNav() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href.includes(currentPage) ||
                (currentPage === 'index' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },

    // Update CTA button based on page
    updateCTA() {
        const currentPage = this.getCurrentPage();
        const ctaButton = document.querySelector('.cta-button');

        if (!ctaButton) return;

        const ctaConfig = {
            'index': { text: 'Hire the Trio', href: 'pages/contact.html' },
            'studio': { text: 'Join the Journey', href: 'pages/contact.html' },
            'minds': { text: 'Work With Us', href: 'pages/contact.html' },
            'work': { text: 'Start a Project', href: 'pages/contact.html' },
            'case-study': { text: 'Hire Us', href: 'pages/contact.html' },
            'services': { text: 'Get a Quote', href: 'pages/contact.html' },
            'portal': { text: 'Support', href: '#' },
            'insights': { text: 'Subscribe', href: '#' },
            'lab': { text: 'View on GitHub', href: '#' },
            'contact': { text: 'View Work', href: 'work.html' }
        };

        const config = ctaConfig[currentPage] || ctaConfig['index'];
        ctaButton.querySelector('span').textContent = config.text;
        ctaButton.setAttribute('href', config.href);
    }
};

// Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.validate()) {
                this.handleSubmit();
            }
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validate() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('[required]');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // URL validation
        if (type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }

        this.showError(input, isValid ? '' : errorMessage);
        return isValid;
    }

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorDiv = formGroup.querySelector('.form-error');

        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            formGroup.appendChild(errorDiv);
        }

        errorDiv.textContent = message;

        if (message) {
            input.style.borderColor = 'var(--color-error)';
        } else {
            input.style.borderColor = '';
        }
    }

    handleSubmit() {
        // Show loading state
        const submitBtn = this.form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showSuccess();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.form.reset();
        }, 2000);
    }

    showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        successDiv.style.cssText = `
            padding: 1rem;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            color: var(--color-success);
            margin-top: 1rem;
            animation: fadeIn 0.3s ease-out;
        `;

        this.form.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Search Functionality
class SearchHandler {
    constructor(inputId, resultsId) {
        this.input = document.getElementById(inputId);
        this.results = document.getElementById(resultsId);

        if (this.input && this.results) {
            this.init();
        }
    }

    init() {
        this.input.addEventListener('input', utils.debounce((e) => {
            this.search(e.target.value);
        }, 300));
    }

    search(query) {
        if (!query.trim()) {
            this.results.innerHTML = '';
            return;
        }

        // This would typically fetch from an API
        // For now, we'll use mock data
        const mockResults = [
            { title: 'Getting Started with Design Systems', category: 'Design' },
            { title: 'Modern JavaScript Best Practices', category: 'Tech' },
            { title: 'Building a Successful Agency', category: 'Business' }
        ];

        const filtered = mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(filtered);
    }

    displayResults(results) {
        if (results.length === 0) {
            this.results.innerHTML = '<p>No results found</p>';
            return;
        }

        this.results.innerHTML = results.map(result => `
            <div class="search-result">
                <h4>${result.title}</h4>
                <span class="badge badge-primary">${result.category}</span>
            </div>
        `).join('');
    }
}

// Filter Functionality
class FilterHandler {
    constructor(filterSelector, itemSelector) {
        this.filters = document.querySelectorAll(filterSelector);
        this.items = document.querySelectorAll(itemSelector);

        if (this.filters.length > 0 && this.items.length > 0) {
            this.init();
        }
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active filter
                this.filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                // Filter items
                const category = filter.getAttribute('data-filter');
                this.filterItems(category);
            });
        });
    }

    filterItems(category) {
        this.items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                item.style.display = '';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    utils.updateActiveNav();
    utils.updateCTA();

    // Initialize form validation for contact forms
    new FormValidator('contact-form');

    // Initialize search if on insights page
    new SearchHandler('search-input', 'search-results');

    // Initialize filters if on work page
    new FilterHandler('.filter-btn', '.filter-item');

    // Add year to copyright
    const copyrightYear = document.querySelector('.copyright');
    if (copyrightYear) {
        copyrightYear.textContent = copyrightYear.textContent.replace('2026', new Date().getFullYear());
    }
});

// Export utilities for use in other scripts
window.PowerTrioUtils = utils;
