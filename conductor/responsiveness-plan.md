# KCD New York 2026 - Responsiveness Improvement Plan

## Objective
Enhance the mobile and tablet responsiveness of the KCD New York 2026 website to ensure a seamless experience across all viewports. This plan focuses on fixing the mobile navigation collision, optimizing the hero section layout, and refining content stacking on smaller screens.

## Key Files & Context
- `src/content/event-data.json`: Will store the new `shortName` property.
- `src/components/layout.js`: Controls the Navbar and Footer rendering.
- `src/components/layout.css`: Contains custom media queries.
- `src/pages/index.js`: Contains the Homepage layout (Hero, CTAs, Milestone sections).

## Implementation Steps

### 1. Mobile Navbar Branding Fix
The full event name ("Kubernetes Community Days New York 2026") is too long for mobile devices, pushing the hamburger menu off-screen or causing awkward wrapping.
- **Update `event-data.json`**: Add a `"shortName": "KCD NY 2026"` property alongside the existing `"name"` property.
- **Update `layout.js` Navbar**: Modify the `.navbar-brand` link to render both the full name and short name.
  - Use Bulma's `<span className="is-hidden-touch">{eventData.name}</span>` for desktop screens (>= 1024px).
  - Use Bulma's `<span className="is-hidden-desktop">{eventData.shortName}</span>` for mobile/tablet screens (< 1024px).

### 2. Homepage Hero CTA Refinement
In `src/pages/index.js`, the Call-to-Action (CTA) buttons in the Hero section use `<div className="buttons is-centered">`. On very narrow mobile screens, side-by-side buttons can overflow.
- **Update `CtaButtons` Component**: Ensure buttons stack gracefully on mobile by leveraging Bulma's mobile responsiveness classes if they overlap, or adding a custom wrapper class for mobile stacking if needed.

### 3. Milestone & Theme Section Alignment
On `index.js`, the "Building Bridges" and "3rd Year Milestone" sections use Bulma `columns is-vcentered`. 
- **Review Padding**: On mobile, when columns stack, there can sometimes be insufficient vertical spacing between the stacked elements. 
- **Update `index.js`**: Add mobile-specific padding utility classes (e.g., `mb-5-mobile` or custom CSS in `layout.css`) to ensure visual breathing room between stacked columns.

### 4. Countdown Timer Mobile Polish
- **Update `layout.css`**: Verify that the `.kcd-ny-countdown-units` flexbox uses `flex-wrap: wrap` or scales down the `font-size` for `.kcd-ny-countdown-value` slightly on screens `< 400px` to prevent the numbers from crowding.

## Verification & Testing
1. **Local Development**: Run `npm run develop` (or yarn/pnpm equivalent).
2. **Viewport Testing**: Use browser DevTools to simulate:
   - iPhone SE (375px) - Check Navbar brand, CTA stacking, and Countdown.
   - iPad (768px) - Check Navbar transition and Milestone grid.
   - Desktop (1024px+) - Ensure the full "Kubernetes Community Days New York 2026" title appears and grid layouts look cinematic.
3. **Burger Menu Test**: Click the mobile hamburger menu to ensure the `navbar-menu` drawer opens smoothly without horizontal scrollbars.