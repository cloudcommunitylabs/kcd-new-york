# Fix Sidebar Whitespace and Remove !important tags

## Objective
Fix the horizontal scrolling issue on mobile devices caused by the sidebar / navbar layout, and clean up the CSS by removing `!important` overrides where possible.

## Key Files & Context
- `src/components/layout.css`: Contains the mobile responsive CSS that sets the navbar item max-width using `100vw` (which ignores scrollbars and causes horizontal scrolling) and heavily relies on `!important` tags for `.kcd-ny-navbar-register` and `.navbar-burger`.

## Implementation Steps

### 1. Fix Horizontal Scroll
Replace the `100vw` usage in `.navbar-brand .navbar-item.has-text-weight-bold` with a percentage-based width that accounts for the burger menu width:
- Change `max-width: calc(100vw - 4rem);` to `max-width: calc(100% - 3.25rem);`

### 2. Remove `!important` from Navbar CSS
Clean up the `layout.css` by removing `!important` flags and using higher specificity selectors where needed.
- Remove `!important` from `.kcd-ny-navbar .navbar-burger` block and its sub-elements.
- Remove `!important` from `.kcd-ny-navbar-register` blocks.
- If necessary to override Bulma defaults, increase selector specificity (e.g., using `.kcd-ny-navbar .kcd-ny-navbar-register` instead of `.kcd-ny-navbar-register`).
- Update `.kcd-ny-navbar-register` mobile styles to avoid `calc(100% - 3rem)` combined with side margins which can also trigger horizontal scroll, replacing with `width: auto`.

## Verification
- Run `npm run develop` and simulate a mobile device (iPhone SE, Pixel) to verify that no horizontal scrollbar appears.
- Ensure the "Register" CTA and the hamburger menu still correctly apply their brand styles without `!important`.
