# Power Trio Studio - Award-Winning Portfolio Website

## 🎨 Project Overview

A high-scale, ultra-modern, highly animated 10-page studio portfolio built with **ONLY** HTML5, CSS3, and Vanilla JavaScript. No frameworks, no libraries - pure web technologies showcasing award-winning design and motion.

## ✨ Features

### Design & Visual Identity
- **Midnight Indigo Theme** - Premium dark color palette
- **Glassmorphism Effects** - Modern backdrop-filter blur effects
- **Custom Cursor** - Magnetic interactions with dynamic labels
- **Gradient Animations** - Smooth, 60fps optimized motion
- **Responsive Typography** - Using CSS clamp() for fluid scaling

### Advanced Interactions
- **Magnetic Hover Effects** - Elements follow cursor movement
- **Scroll-Based Animations** - IntersectionObserver powered reveals
- **Parallax Motion** - Depth and dimension
- **Animated Statistics** - Counting animations
- **AI Chatbot UI** - Fully functional frontend chatbot

### Technical Excellence
- **60fps Animations** - GPU-accelerated transforms
- **Mobile Responsive** - Breakpoints at 768px and 1024px
- **Accessibility** - ARIA labels, semantic HTML
- **SEO Optimized** - Meta tags, proper heading structure
- **Performance** - Debounced/throttled event handlers

## 📁 Project Structure

```
demo_studio/
├── index.html                 # Homepage
├── pages/
│   ├── studio.html           # The Studio (team story)
│   ├── minds.html            # The Minds (team members)
│   ├── work.html             # Work (all projects)
│   ├── case-study.html       # Case Study (project deep dive)
│   ├── services.html         # Services (offerings)
│   ├── portal.html           # Client Portal (dashboard)
│   ├── insights.html         # Insights (blog)
│   ├── lab.html              # The Lab (experiments)
│   └── contact.html          # Contact (multi-step form)
├── css/
│   ├── global.css            # Base styles, variables, utilities
│   ├── animations.css        # Keyframes, transitions, effects
│   └── components.css        # Reusable UI components
├── js/
│   ├── cursor.js             # Custom cursor logic
│   ├── animations.js         # Scroll animations, counters
│   ├── chatbot.js            # AI chatbot functionality
│   └── main.js               # Utilities, form validation
└── assets/
    ├── images/               # Project images (placeholder)
    └── icons/                # SVG icons (inline in HTML)
```

## 🎯 Page Breakdown

### 1. **Home** (`index.html`)
- Animated hero with gradient orbs
- Collective statistics with counting animation
- Featured work grid (3 projects)
- CTA: "Hire the Trio"

### 2. **The Studio** (`pages/studio.html`)
- Animated timeline of team formation
- Philosophy & culture sections
- Newsletter signup CTA
- Studio address with motion

### 3. **The Minds** (`pages/minds.html`) ✅ COMPLETED
- 3 equal sections for each member
- Magnetic avatars with status indicators:
  - 🟢 Online (Alex Chen)
  - ⚡ Busy (Jordan Rivera)
  - ☕ Oatmeal Break (Sam Taylor)
- Personality reveals on hover
- Individual social links (LinkedIn, GitHub, Dribbble, etc.)

### 4. **Work** (`pages/work.html`)
- Large animated project grid
- Filters by Lead Member & Service Type
- Hover previews with motion
- CTA: "Ready to start?"

### 5. **Case Study** (`pages/case-study.html`)
- Sticky project title
- Animated "Read Time" indicator
- Process → Results storytelling
- Team credits section
- Related projects slider

### 6. **Services** (`pages/services.html`)
- 3-pillar service model
- Animated service cards
- Sticky floating "Get a Quote" button
- Expandable pricing & FAQ

### 7. **Client Portal** (`pages/portal.html`)
- Mock dashboard UI
- Project status cards
- Animated progress indicators
- Support & documentation links

### 8. **Insights** (`pages/insights.html`)
- Live search functionality
- Categories: Tech / Design / Business
- Popular posts section
- RSS feed link
- Scroll-based card animations

### 9. **The Lab** (`pages/lab.html`)
- Mode toggle: Dark / Light / Cyber
- Experimental UI concepts
- Advanced CSS & JS animations
- Code snippets
- GitHub repository CTA

### 10. **Contact** (`pages/contact.html`)
- Minimalist layout
- Multi-step animated form
- Direct emails for each member
- Timezone visualization
- Animated success confirmation

## 🎨 Color Palette

```css
--color-bg-primary: #0B0E14       /* Deep Onyx */
--color-bg-secondary: #151921     /* Dark Slate */
--color-accent: #6366F1           /* Electric Indigo */
--color-accent-secondary: #A5B4FC /* Soft Lavender */
--color-text-primary: #F8FAFC     /* Cloud White */
--color-text-secondary: #94A3B8   /* Cool Gray */
--color-success: #10B981          /* Emerald Green */
```

## 🚀 Getting Started

### Option 1: Direct File Opening
1. Navigate to `f:/veri/demo_studio/`
2. Open `index.html` in your browser
3. Navigate through pages using the navbar

### Option 2: Local Server (Recommended)
```bash
# Using Python
cd f:/veri/demo_studio
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🎭 Key Components

### Custom Cursor
- Smooth tracking with easing
- Magnetic effect on interactive elements
- Dynamic text labels on hover
- Automatically hidden on touch devices

### AI Chatbot
- Keyword-based response system
- Typing indicators
- Smooth open/close animations
- Context-aware responses

### Navbar
- Fixed position with blur backdrop
- Auto-hide on scroll down
- Dynamic CTA button per page
- Mobile hamburger menu

### Footer
- 3-column social grid (one per member)
- Individual contact information
- Consistent across all pages

## 🎨 Animation System

### Scroll Animations
- `IntersectionObserver` for performance
- Staggered reveals
- Fade in up, slide in, scale effects
- Configurable thresholds

### Hover Effects
- Magnetic pull towards cursor
- Glow and shadow transitions
- Transform scale and translate
- Color shifts

### Page Transitions
- Fade out on navigation
- Smooth opacity changes
- Loading states

## 📱 Responsive Breakpoints

```css
/* Desktop First */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
```

## ⚡ Performance Optimizations

1. **GPU Acceleration**: Using `transform` and `opacity` for animations
2. **Debouncing**: Search and resize events
3. **Throttling**: Scroll events
4. **Lazy Loading**: Images (when implemented)
5. **CSS Variables**: Centralized theme management

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Development Notes

### Current Status
✅ Core structure complete
✅ Homepage with hero and stats
✅ The Minds page with team profiles
✅ Global CSS with Midnight Indigo theme
✅ Animation system with 60fps optimization
✅ Custom cursor with magnetic effects
✅ AI Chatbot with keyword responses
✅ Responsive navbar and footer

### Remaining Pages
- The Studio (timeline & culture)
- Work (project grid with filters)
- Case Study (project deep dive)
- Services (3-pillar model)
- Client Portal (dashboard UI)
- Insights (blog with search)
- The Lab (experimental UI)
- Contact (multi-step form)

## 🎨 Design Philosophy

1. **Premium First Impressions** - Wow factor on load
2. **Micro-Interactions** - Every hover, click, scroll matters
3. **Glassmorphism** - Modern, layered depth
4. **Motion with Purpose** - Animations guide attention
5. **Triangle Motif** - Represents the "Power of Three"

## 🔧 Customization

### Changing Colors
Edit CSS variables in `css/global.css`:
```css
:root {
    --color-accent: #YOUR_COLOR;
}
```

### Adding New Pages
1. Copy an existing page template
2. Update navbar active state
3. Add page-specific styles in `<style>` tag
4. Update footer if needed

### Modifying Animations
Edit keyframes in `css/animations.css` and adjust:
- Duration
- Easing functions
- Delay values

## 📄 License

© 2026 Power Trio. All rights reserved.

## 🙏 Credits

**Design & Development**: Power Trio Studio
- Alex Chen - Creative Director
- Jordan Rivera - Lead Developer  
- Sam Taylor - Brand Strategist

---

**Built with ❤️ using only HTML, CSS, and JavaScript**
# demo_trio_studio_01
