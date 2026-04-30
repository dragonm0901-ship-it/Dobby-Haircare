Dobby Haircare — Full Codebase Audit
Audited: 2026-04-29 | Stack: React 19 + Vite 7 + Tailwind 3 + GSAP 3 + Lenis
Total Files: ~90 TSX/TS | Lines of Code: ~33,000 (incl. unused UI lib)

Overall Rating: 6.5 / 10
Category Score Verdict
Visual Design & Aesthetics 8.5/10 🟢 Good
Animation & Interactivity 8/10 🟢 Good
Component Architecture 6/10 🟡 Decent
Code Quality & Consistency 5.5/10 🟠 Needs Work
Performance & Optimization 5/10 🟠 Needs Work
Accessibility (a11y) 3/10 🔴 Bad
SEO & Meta 4/10 🔴 Bad
Dependency Health 4/10 🔴 Bad
Routing & State Management 6.5/10 🟡 Decent
Production Readiness 5/10 🟠 Needs Work
🟢 What's Perfect (8–10)

1. Visual Design Language
   The site has a strong, cohesive D2C aesthetic. The purple/lime/black palette is distinctive and premium. The typography system (bold uppercase headings, micro-tracked labels) creates a genuine agency feel. The film grain overlay is a tasteful touch.

2. Hero Section Composition
   The Hero is genuinely cinematic — the absolute-positioned product bottle with a radial glow, light beam clip-path, and floating GSAP animation creates an impressive first impression. The staggered headline reveal is smooth and well-timed.

3. GSAP Animation Quality
   The animations are sophisticated and well-crafted:

gsap.context() is used consistently for proper cleanup ✅
The AnimatedLogo scatter/reassemble loop is creative
The Liquid Slider in the Navbar uses elastic easing effectively
The cart icon bounce animation is a nice micro-interaction
ScrollTrigger integration with Lenis is correctly wired 4. Preloader UX
Smart use of sessionStorage to skip the preloader on repeat visits. The progress simulation with Math.random() \* 15 feels organic.

🟡 What's Good (6–7) 5. Component Separation
Sections and components are properly separated into /sections and /components directories. Each section is self-contained and mostly follows the single-responsibility principle.

6. Cart System
   The CartContext is functional with add/remove/update/quantity logic. Moving it to App.tsx was the right call for global access. The CartDrawer slide-in animation is polished.

7. Routing Architecture
   The multi-page setup (Home, Shop, ProductDetail) with react-router is clean. The Navbar's handleNavClick smartly differentiates between page links and section anchors.

8. Stacked Cards (Ingredients)
   The sticky-card stacking pattern is a proven, effective scroll pattern. The implementation is straightforward and works.

🟠 What's Bad (4–5) 9. Branding Inconsistency — "bolly" Still Present
WARNING

The old brand name "bolly" still appears in 2 places in production code:

src/sections/About.tsx:29 → "Born from a frustration with harsh chemical treatments, bolly was"
src/sections/About.tsx:70 → alt="bolly Hair Serum"
This is a shipping blocker — a customer would see the wrong brand name.

10. Massive Unused Dependency Bloat
    CAUTION

53 unused UI component files exist in src/components/ui/ (accordion, dialog, drawer, carousel, etc.). None of these are imported by any page or section.

Impact:

package.json includes 20+ Radix UI packages that are never used
Also unused: framer-motion, recharts, react-hook-form, zod, cmdk, date-fns, react-day-picker, react-resizable-panels, sonner, swiper, vaul, next-themes, fuse.js, input-otp, embla-carousel-react
This bloats node_modules significantly and increases install/build time
Estimated ~2MB+ of dead JavaScript in the bundle if tree-shaking isn't perfect 11. No Image Optimization
No loading="lazy" on most images (only ProductCard has it)
No width/height attributes — causes layout shift (CLS)
Product images are full-size PNGs with no responsive srcset
No WebP/AVIF format optimization
The hero product image is likely the LCP element but has no fetchpriority="high" 12. Inconsistent Data Patterns
Homepage About.tsx uses hardcoded text inline
Homepage Shop.tsx imports from @/data/products
Testimonials.tsx and Blog.tsx use local arrays defined in the file
Contact.tsx uses local arrays
No consistent data layer pattern 13. No Error Boundaries
There are no React Error Boundaries anywhere. If a GSAP animation or a product lookup fails, the entire app crashes with a white screen.

🔴 What's Terrible (1–3) 14. Zero Accessibility
CAUTION

The site would fail a WCAG 2.1 AA audit comprehensively:

Issue Location
No skip-to-content link Global
No aria-label on icon-only buttons Cart, Menu buttons
No focus ring styles visible All interactive elements
No keyboard navigation for FAQ accordion FAQ.tsx
Marquee text has no aria-hidden or pause control Marquee.tsx
Form inputs lack proper id + htmlFor pairing Contact.tsx
Color contrast: text-white/40 on black likely fails 4.5:1 Multiple sections
No prefers-reduced-motion media query to disable animations Global
Mobile menu has no focus trap Navbar.tsx 15. No SEO Infrastructure
Issue Status

<title> tag	❌ Missing per-page titles
<meta name="description">	❌ Missing
Open Graph / Twitter cards	❌ Missing
Canonical URLs	❌ Missing
Structured data (JSON-LD)	❌ Missing
robots.txt / sitemap.xml	❌ Missing
Single <h1> per page	⚠️ Not validated on new pages
16. No TypeScript Strictness
any types used in GSAP event handlers and several components
No strict: true verification in tsconfig.json
Product card uses (props: any) inline SVG components in the Results section badge attempt
gsap.ticker.remove(lenis.raf as any) is a type safety hole
17. Mobile Menu is Broken on New Pages
The mobile menu overlay uses clipPath animations but:

On /shop and /product/:id, the mobile menu sits behind page content (z-40 vs page content z-50)
No focus trap when open
The useNavigate doesn't close the menu reliably on SPA transitions
📋 Remaining Active Bugs

# Bug Severity File

1 "bolly" brand name in About section 🔴 Critical About.tsx:29, 70
2 SplitTextReveal.tsx component exists but is never imported ⚠️ Low SplitTextReveal.tsx
3 MagneticButton.tsx exists but is never imported ⚠️ Low MagneticButton.tsx
4 useSmoothScroll only runs on Home — Shop/ProductDetail pages don't have smooth scrolling 🟡 Medium Shop.tsx, ProductDetail.tsx
5 Footer scrollToSection references may break on non-home pages 🟡 Medium Footer.tsx
6 package.json name is still "my-app" ⚠️ Low package.json
🏗 Prioritized Action Items
P0 — Ship Blockers
Fix "bolly" → "dobby" in About.tsx (2 occurrences)
Add basic <title> and <meta> tags per page
Add aria-label to all icon-only buttons
P1 — Should Fix Before Launch
Remove the 53 unused ui/ component files and their Radix dependencies
Remove all unused npm packages from package.json
Add loading="lazy" and width/height to all images
Add useSmoothScroll() to Shop and ProductDetail pages
Add a basic React Error Boundary
P2 — Quality Improvements
Consolidate all data into src/data/ (testimonials, blog posts, contact info)
Add prefers-reduced-motion support globally
Implement focus trapping in mobile menu
Add proper keyboard navigation to FAQ accordion
Set "name": "dobby-haircare" in package.json
P3 — Nice to Have
Add page transition animations between routes
Implement image format optimization (WebP/AVIF)
Add structured data (JSON-LD) for products
Build a sitemap generator
Add loading skeletons for product images
Summary
The visual design and animation work is genuinely impressive — it's a beautiful, high-energy D2C landing experience with cinematic GSAP work. The core UX of browsing products, viewing details, and adding to cart functions correctly.

However, the codebase has significant engineering debt: massive unused dependencies, zero accessibility, no SEO, lingering brand name bugs, and inconsistent data patterns. These are the kinds of issues that separate a stunning portfolio piece from a production-grade, shippable product.

Bottom line: Looks like a $5K agency build, ships like a $1.5K prototype. Fixing the P0 and P1 items would push this to a solid 8/10.
