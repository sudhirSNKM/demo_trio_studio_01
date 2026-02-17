/* ===================================
   CUSTOM CURSOR
   Smooth magnetic cursor with text labels
   =================================== */

class CustomCursor {
    constructor() {
        this.cursor = {
            dot: document.querySelector('.cursor-dot'),
            outline: document.querySelector('.cursor-outline'),
            text: document.querySelector('.cursor-text')
        };
        
        this.mouse = { x: 0, y: 0 };
        this.cursorPos = { x: 0, y: 0 };
        this.cursorOutlinePos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Check if device supports hover (not touch device)
        if (window.matchMedia('(hover: none)').matches) {
            return;
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Add hover effects to interactive elements
        this.addHoverEffects();
        
        // Start animation loop
        this.animate();
    }
    
    addHoverEffects() {
        // Magnetic elements
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                
                // Show cursor text if element has data-cursor attribute
                const cursorText = el.getAttribute('data-cursor');
                if (cursorText) {
                    this.cursor.text.textContent = cursorText;
                    this.cursor.text.classList.add('active');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
                this.cursor.text.classList.remove('active');
            });
            
            // Magnetic effect
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
        
        // Work cards - show project name
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const projectName = card.querySelector('.work-title')?.textContent;
                if (projectName) {
                    this.cursor.text.textContent = projectName;
                    this.cursor.text.classList.add('active');
                }
            });
            
            card.addEventListener('mouseleave', () => {
                this.cursor.text.classList.remove('active');
            });
        });
    }
    
    animate() {
        // Smooth cursor dot movement
        this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.3;
        this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.3;
        
        // Slower outline movement for trailing effect
        this.cursorOutlinePos.x += (this.mouse.x - this.cursorOutlinePos.x) * 0.15;
        this.cursorOutlinePos.y += (this.mouse.y - this.cursorOutlinePos.y) * 0.15;
        
        // Apply positions
        this.cursor.dot.style.left = `${this.cursorPos.x}px`;
        this.cursor.dot.style.top = `${this.cursorPos.y}px`;
        
        this.cursor.outline.style.left = `${this.cursorOutlinePos.x}px`;
        this.cursor.outline.style.top = `${this.cursorOutlinePos.y}px`;
        
        this.cursor.text.style.left = `${this.cursorPos.x}px`;
        this.cursor.text.style.top = `${this.cursorPos.y}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CustomCursor();
    });
} else {
    new CustomCursor();
}
