# KCD New York 2026 Website

Official website for Kubernetes Community Days New York 2026 — June 10th, 2026 at Convene One Liberty Plaza, NYC.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install
# or: npm install --legacy-peer-deps

# Start development server
yarn develop
# or: npm run develop

# Build for production
yarn build
# or: npm run build

# Serve production build locally
yarn serve
# or: npm run serve
```

Visit http://localhost:8000 to view the site.

If you see cache or module errors, run `yarn gatsby-clean` (or `npx gatsby clean`) then try again.

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Customization Guide](#-customization-guide)
- [API Integrations](#-api-integrations)
- [Adding Images](#-adding-images)
- [Updating Content](#-updating-content)
- [Styling & Branding](#-styling--branding)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 📁 Project Structure

```
kcd-new-york/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout.js        # Main layout with navbar & footer
│   │   └── layout.css       # Global styles and Bulma customizations
│   ├── images/              # Image assets
│   │   └── icon.png         # Site favicon (update this!)
│   └── pages/               # Page components (auto-routing)
│       ├── index.js         # Homepage
│       ├── about.js         # About KCD New York
│       ├── schedule.js      # Event schedule
│       ├── speakers.js      # Speakers & CFP
│       ├── sponsors.js      # Sponsorship information
│       ├── venue.js         # Venue details
│       ├── team.js          # Organizing team
│       ├── code-of-conduct.js  # Code of Conduct
│       ├── privacy-policy.js   # Privacy Policy
│       ├── cookie-policy.js    # Cookie Policy
│       └── 404.js           # 404 error page
├── gatsby-config.js         # Gatsby configuration
├── netlify.toml             # Netlify build configuration
└── package.json             # Dependencies
```

---

## 🎨 Customization Guide

### 1. **Update Event Details**

#### Date & Location
Edit these files to update event information:

**Homepage** (`src/pages/index.js`):
```javascript
// Line ~15–17
<strong>Date:</strong> June 10, 2026 · <strong>Venue:</strong> Convene One Liberty Plaza
```

**Layout** (`src/components/layout.js`): Update `EVENT_DATE`, `VENUE`, and `ADDRESS` at the top of the file.

**All page headers**: Update the hero sections in each page file.

#### Site Metadata
**File:** `gatsby-config.js`
```javascript
siteMetadata: {
  title: `Kubernetes Community Days New York 2026`,
  siteUrl: `https://kcdnewyork.com`  // Update with your domain
}
```

---

### 2. **Update Contact Emails**

Replace placeholder emails throughout the site:

**Files to update:**
- `src/components/layout.js` (footer)
- `src/pages/sponsors.js`
- `src/pages/team.js`
- `src/pages/code-of-conduct.js`

**Suggested placeholders:**
- `info@kcdnewyork.com`
- `sponsors@kcdnewyork.com`
- `conduct@kcdnewyork.com`
- `volunteer@kcdnewyork.com`
- `team@kcdnewyork.com`

Use real team emails, forwarding, or domain-specific addresses.

---

### 3. **Update Venue Information**

**File:** `src/pages/venue.js`

Current venue: **Convene One Liberty Plaza**, 1 Liberty St, New York, NY 10006.

Update with:
- Full address and map link
- Transit directions (subway, PATH, etc.)
- Accessibility details
- Venue contact info

---

## 🖼️ Adding Images

### Where to Add Images

```
src/images/
├── icon.png              # Favicon (512x512px recommended)
├── logo.png              # KCD New York logo
├── hero-background.jpg   # Homepage hero image
├── venue/                # Venue photos
├── speakers/             # Speaker headshots
└── sponsors/             # Sponsor logos
```

### Using Images in Pages

**Option 1: Static import**
```javascript
import logoImage from '../images/logo.png'

<img src={logoImage} alt="KCD New York Logo" />
```

**Option 2: Gatsby Image (optimized)**
```javascript
import { StaticImage } from "gatsby-plugin-image"

<StaticImage
  src="../images/hero.jpg"
  alt="KCD New York"
  placeholder="blurred"
  layout="fullWidth"
/>
```

### Image tips

- Prefer **WebP or AVIF** for smaller files.
- Compress before adding (e.g. TinyPNG, Squoosh).
- **Suggested sizes:** Hero 1920×1080px; speaker photos 400×400px; sponsor logos ~300×150px (transparent PNG); favicon 512×512px.

---

## 🔌 API Integrations

### Sessionize (Speakers & CFP)

1. Create an event at [Sessionize](https://sessionize.com).
2. Use the API: `https://sessionize.com/api/v2/{event_id}/view/speakers`.
3. In `src/pages/speakers.js`, fetch and map speakers (e.g. `profilePicture`, `fullName`, `bio`).
4. Embed CFP form: `<iframe src="https://sessionize.com/YOUR_EVENT/apply"></iframe>`.

### Ti.to / Eventbrite (Registration)

**Ti.to (good for tech events):**
```javascript
// In src/pages/index.js – load Ti.to script, then:
<tito-button event="kcd-new-york/2026">Register Now</tito-button>
```

**Eventbrite:** Use the [Eventbrite widget](https://www.eventbrite.com/platform/docs/embedding-eventbrite) and embed in a page.

### Mailchimp / Buttondown (Newsletter)

Add a signup form (e.g. in `src/components/newsletter-signup.js` or the footer) that POSTs to your Mailchimp or Buttondown endpoint. Use a form with `action`, `method="post"`, and an email `input` with `name="EMAIL"`.

---

## 📝 Updating Content

### Sponsors page

**File:** `src/pages/sponsors.js`

Define tiers (e.g. Platinum, Gold, Silver, Community) and pricing. Add logos under `src/images/sponsors/` and import them in the page.

### Speakers page

**File:** `src/pages/speakers.js`

- **Manual:** Keep an array of `{ name, role, company, image, bio, twitter }` and map over it.
- **Sessionize:** Fetch from the Sessionize API and render the same structure.

### Schedule page

**File:** `src/pages/schedule.js`

Update the `scheduleItems` array with real slots, e.g.:
```javascript
{ time: "9:00 AM - 9:30 AM", title: "Registration & Coffee", description: "..." }
```

---

## 🎨 Styling & Branding

### Colors

**File:** `src/components/layout.css`

```css
:root {
  --color-primary: #326ce5;    /* Kubernetes blue */
  --color-secondary: #00d1b2;   /* Teal */
  --color-dark: #363636;
  --color-light: #f5f5f5;
}
```

### Typography

Fonts are set in `src/components/layout.css` (e.g. IBM Plex Sans, Nunito Sans). To change them, update the `@import` and `font-family` rules there.

---

## 🚀 Deployment

### Netlify (recommended)

**Production (main website):**
- Deploy the main site from the `main` branch.
- In Netlify: **Site configuration** → **Build & deploy** → **Continuous deployment** → set **Production branch** to `main`.
- Every push to `main` triggers a production deploy; the main site URL serves this branch.

**Preview environments (PRs):**
- Enable deploy previews so each pull request gets a unique preview URL.
- In Netlify: **Site configuration** → **Build & deploy** → **Continuous deployment** → under **Deploy Previews**, enable **Deploy Previews for pull requests**.
- When you open a PR, Netlify builds it and comments with a preview link (e.g. `deploy-preview-123--your-site.netlify.app`).

**Build settings** (in `netlify.toml`):
- Build command: `yarn install && yarn build`
- Publish directory: `public`
- Node 20, Yarn 1.22

### Manual deploy

```bash
yarn build
# Then deploy the `public` folder (e.g. Netlify CLI: netlify deploy --prod)
```

### Custom domain

In Netlify: Site Settings → Domain management → Add custom domain, then set DNS (A/CNAME) at your registrar. SSL is provisioned automatically.

---

## 🤝 Contributing

1. **Clone** the repo and install: `yarn install`
2. **Branch:** `git checkout -b feature/your-feature-name`
3. **Edit** content or code; run `yarn develop` to test.
4. **Commit:** `git add .` and `git commit -m "Add: your change"`
5. **Push** and open a Pull Request to `main`.

**Style:** Use Bulma classes for layout and components; keep components small and reusable; add comments for non-obvious logic.

---

## 📞 Support & Contact

**Placeholders to replace:**
- Organizer contact (e.g. info@kcdnewyork.com)
- Social: Twitter/X, LinkedIn, etc.
- Official event contact: [new-york-org@kubernetescommunitydays.org](https://kubernetescommunitydays.org)

---

## 📄 License

This project is part of the [Kubernetes Community Days](https://kubernetescommunitydays.org/) program, supported by the [CNCF](https://www.cncf.io/).

---

## 🙏 Acknowledgments

- Structure and approach based on [KCD Toronto 2026](https://github.com/distributethe6ix/kcd-toronto-front-end)
- Built with [Gatsby](https://www.gatsbyjs.com/)
- Styled with [Bulma CSS](https://bulma.io/)
- Hosted on [Netlify](https://www.netlify.com/)
- Supported by [Cloud Native Computing Foundation](https://www.cncf.io/)
