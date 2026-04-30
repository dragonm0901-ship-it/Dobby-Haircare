# Tech Spec: bolly Haircare Website

## 1. Development Environment

| Item | Technology |
|------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Component Library | shadcn/ui |
| Routing | React Router DOM (v6) |

## 2. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2 | UI framework |
| `react-dom` | ^18.2 | React DOM renderer |
| `react-router-dom` | ^6.20 | Client-side routing for multi-page navigation |
| `gsap` | ^3.12 | Core animation engine, timelines, tweens |
| `lenis` | ^1.1 | Smooth scroll with inertia (critical for hero pin effect) |
| `lucide-react` | ^0.400 | Icons (cart, arrows, menu, social) |
| `tailwind-merge` | ^2.2 | Tailwind class merging utility |
| `clsx` | ^2.1 | Conditional class names |

## 3. Component Inventory

### shadcn/ui Components
| Component | Usage | Customization |
|-----------|-------|--------------|
| `Button` | CTAs, form submit | Override to pill shape, purple background |
| `Input` | Contact form fields | Bottom-border only style, purple focus state |
| `Textarea` | Contact form message | Same bottom-border treatment |
| `Sheet` | Mobile navigation drawer | Slide from top or right |

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Navbar` | `className?: string` | Floating pill navigation with logo, links, cart |
| `MobileNav` | `isOpen, onClose` | Sheet-based mobile menu |
| `PillButton` | `children, onClick, variant, className` | Rounded pill button (purple/white variants) |
| `CircleArrowButton` | `onClick, direction, className` | 50x50 circle with arrow icon |
| `HeroSection` | — | Full hero with all animations |
| `AboutSection` | — | 2-column about layout |
| `ShopSection` | — | Product grid |
| `BlogSection` | — | Blog post cards grid |
| `ContactSection` | — | Contact form |
| `Footer` | — | Large watermark + links |
| `FloatingProduct` | `src, alt, className, animate?` | Product image with levitation effect |
| `GeometricLines` | `className` | SVG decorative lines |
| `SplitTextReveal` | `children, delay, className` | GSAP SplitText wrapper for text animations |
| `ScrollReveal` | `children, direction, delay` | Scroll-triggered fade/slide reveal wrapper |
| `ProductCard` | `image, title, price, description` | Shop product card with hover lift |
| `BlogCard` | `image, title, excerpt, date` | Blog post preview card |

### Section Layout

| Section | File | Route (if separate) |
|---------|------|---------------------|
| Navbar | `src/components/Navbar.tsx` | Shared |
| Hero | `src/sections/Hero.tsx` | `/` |
| About | `src/sections/About.tsx` | `/` (scroll to section) |
| Shop | `src/sections/Shop.tsx` | `/` (scroll to section) |
| Blog | `src/sections/Blog.tsx` | `/` (scroll to section) |
| Contact | `src/sections/Contact.tsx` | `/` (scroll to section) |
| Footer | `src/sections/Footer.tsx` | Shared |

## 4. Animation Implementation Plan

### Animation 1: Hero Cinematic Entrance (CRITICAL)
| Spec | Implementation |
|------|---------------|
| Engine | GSAP Timeline |
| Trigger | Page load (`useLayoutEffect`) |
| Elements | SVG lines, H1 headline, product image, CTA group |
| Technique | Master timeline with absolute position timing |

**Timeline Breakdown:**
```
Time 0.0s  → SVG lines strokeDashoffset animation (1.5s, stagger 0.2s)
Time 0.2s  → Product scale: 1.4→1, y: 50→0, blur: 10→0 (1.8s, expo.out)
Time 0.5s  → Headline SplitText lines yPercent: 120→0, rotation: 2→0 (1.2s, power4.out, stagger 0.1)
Time 1.5s  → CTA elements y: 30→0, opacity: 0→1 (0.8s, stagger 0.1)
```

**Key Implementation Notes:**
- SplitText must split by `lines` and `words`
- Headline container needs `overflow: hidden` to clip rising lines
- Product z-index must be higher than H1 (z-10 vs z-1) for overlap effect
- SVG lines need `getTotalLength()` for dash array setup

### Animation 2: Product Levitation (Post-Load)
| Spec | Implementation |
|------|---------------|
| Engine | GSAP standalone tween |
| Trigger | After hero timeline completes (`onComplete` callback) |
| Element | `.hero-product` image |
| Technique | Infinite yoyo repeat |

```javascript
gsap.to(productRef.current, {
  y: "-=15",
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});
```

### Animation 3: Scroll-Triggered Section Reveals
| Spec | Implementation |
|------|---------------|
| Engine | GSAP ScrollTrigger |
| Trigger | Each section entering viewport |
| Technique | Fade up + slight Y translation |

**Implementation:**
- Create reusable `ScrollReveal` component wrapping `useGSAP`
- Default: `y: 40, opacity: 0 → y: 0, opacity: 1`
- ScrollTrigger: `start: "top 80%", toggleActions: "play none none none"`
- Stagger children elements by 0.1s

### Animation 4: Geometric Line Parallax
| Spec | Implementation |
|------|---------------|
| Engine | GSAP ScrollTrigger |
| Trigger | Page scroll |
| Technique | Lines move at 0.2x speed vs scroll |

**Implementation:**
- `gsap.to(linesRef.current, { y: -100, scrollTrigger: { scrub: true } })`

### Animation 5: Product Card Hover
| Spec | Implementation |
|------|---------------|
| Engine | CSS Transitions |
| Trigger | Mouse enter/leave |
| Technique | `transform: translateY(-8px)` + `box-shadow` increase |

### Animation 6: Button Hover States
| Spec | Implementation |
|------|---------------|
| Engine | CSS/Tailwind |
| Technique | `hover:scale-105 hover:shadow-lg transition-all duration-300` |

## 5. State & Logic

### Routing
- Single-page app with scroll-to-section navigation
- React Router handles `/`, `/shop`, `/blog`, `/about`, `/contact` as actual routes OR hash-based scroll navigation
- **Decision:** Use React Router with `useNavigate` + `scrollIntoView` for same-page sections, actual routes for potential separate pages

### Cart State
- Simple React Context for cart count (displayed as yellow dot badge)
- No full cart implementation needed for this scope

### Form Handling
- Contact form: controlled inputs, basic validation
- No backend integration needed

## 6. Project File Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── MobileNav.tsx
│   ├── PillButton.tsx
│   ├── CircleArrowButton.tsx
│   ├── FloatingProduct.tsx
│   ├── GeometricLines.tsx
│   ├── SplitTextReveal.tsx
│   ├── ScrollReveal.tsx
│   ├── ProductCard.tsx
│   └── BlogCard.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Shop.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useSmoothScroll.ts    # Lenis initialization
│   └── useCart.ts            # Cart context hook
├── context/
│   └── CartContext.tsx
├── pages/
│   └── Home.tsx              # Composes all sections
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 7. Tailwind Configuration

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        'bolly-purple': '#6B4EFF',
        'bolly-purple-light': '#C2B6FF',
        'bolly-bg': '#F4F4F4',
        'bolly-yellow': '#F0E130',
      },
      fontFamily: {
        'display': ['Inter', 'Helvetica Now Display', 'Helvetica', 'sans-serif'],
        'body': ['Inter', 'Helvetica', 'sans-serif'],
      },
    },
  },
}
```

## 8. Responsive Breakpoints

| Breakpoint | Hero Layout | Nav |
|------------|-------------|-----|
| Desktop (≥1024px) | Full layout: H1 left, product center, CTA right | Floating pill bar |
| Tablet (768-1023px) | Product above H1, single column CTA | Floating pill bar |
| Mobile (<768px) | Stacked: H1 → Product → CTA | Hamburger menu (Sheet) |

## 9. Performance Considerations

1. **Image Optimization:** Product images served as WebP with PNG fallback, lazy loaded below fold
2. **GSAP:** Use `will-change: transform` on animated elements, remove after animation
3. **Lenis:** Configure `lerp: 0.1` for smooth but responsive scrolling
4. **Fonts:** Use `font-display: swap` for Inter
5. **Code Splitting:** Split routes with React.lazy if expanding to separate pages

## 10. Build Checklist

- [ ] Hero timeline plays correctly on load (lines → text → product → CTAs)
- [ ] Product levitation loops infinitely after entrance
- [ ] ScrollTrigger reveals fire for all sections below fold
- [ ] Navbar is sticky/floating and accessible on all sections
- [ ] Mobile nav (Sheet) opens/closes smoothly
- [ ] All buttons have hover states
- [ ] Product cards lift on hover
- [ ] Smooth scroll works across all anchor links
