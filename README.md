# KCD New York Website

Official website for **Kubernetes Community Days New York**, part of the [CNCF Kubernetes Community Days](https://www.cncf.io/kcds/) program. KCD New York is on the [CNCF H1 2027 KCD calendar](https://www.cncf.io/blog/2026/08/20/announcing-h1-2027-kcds/) for **June 2027**.

The site currently serves the **KCD New York 2027 "coming soon" landing page**, built on the same theme as the 2026 site. All of the 2026 pages (schedule, speakers, venue, volunteers…) are still in the repo; they are simply switched off in `src/content/event-data.json` until their 2027 data is ready. The 2026 edition itself lives on at **[2026.kcdnewyork.com](https://2026.kcdnewyork.com)** (see [Archiving 2026](#-archiving-2026)).

## 🚀 Quick Start

```bash
# Node 20 (see .nvmrc)
yarn install
# or: npm install --legacy-peer-deps

# Start development server at http://localhost:8000
yarn develop

# Production build into ./public
yarn build

# Serve the production build at http://localhost:9000
yarn serve
```

If you see cache or module errors, run `yarn gatsby-clean` (or `npx gatsby clean`) then try again.

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Updating the Site](#-updating-the-site)
- [Bringing Pages Back for 2027](#-bringing-pages-back-for-2027)
- [2026 Recap Section](#-2026-recap-section)
- [Email Sign-up](#-email-sign-up-constant-contact)
- [API Integrations](#-api-integrations)
- [Adding Images](#-adding-images)
- [Styling & Branding](#-styling--branding)
- [Deployment](#-deployment-cloudflare-pages)
- [Archiving 2026](#-archiving-2026)
- [Contributing](#-contributing)

---

## 📁 Project Structure

```
kcd-new-york/
├── .github/workflows/deploy.yml   # Build + deploy to Cloudflare Pages
├── gatsby-config.js               # Site metadata (from event-data.json)
├── gatsby-node.js                 # Drops pages whose `sections.*` flag is off
├── src/
│   ├── content/
│   │   ├── event-data.json        # ★ Single source of truth: dates, links, sections, 2026 recap
│   │   ├── sponsors.json          # Sponsors per year ("2027": [], "2026": [...], "2025": [...])
│   │   ├── team.json              # Organizing team
│   │   ├── previous-speakers.json # Highlighted past speakers
│   │   └── logos/                 # Local sponsor logos
│   ├── components/
│   │   ├── layout.js              # Navbar + footer (nav items appear as sections are enabled)
│   │   ├── layout.css             # Theme: brand colours, Bulma customisations, landing page styles
│   │   ├── NewsletterSignup.js    # Constant Contact "Stay in the loop" section
│   │   ├── PhotoGallery.js        # Year-filtered photo gallery
│   │   ├── MapEmbed.js            # Responsive iframe (venue floor plan)
│   │   └── seo.js                 # <head> metadata
│   ├── data/gallery-photos.json   # Gallery metadata (photos live in static/images/gallery)
│   ├── utils/
│   │   ├── event-lifecycle.js     # Decides which links, sections and pages are ready to show
│   │   └── sponsor-utils.js       # Logo resolution and tier sizing
│   └── pages/
│       ├── index.js               # 2027 landing page (hero, save the month, about, recap, get involved)
│       ├── schedule.js            # Sessionize schedule (gated: sections.schedule)
│       ├── speakers.js            # Sessionize speaker wall (gated: sections.speakers)
│       ├── sponsors.js            # Sponsors + past editions (gated: sections.sponsors)
│       ├── venue.js               # Venue, floor plan, transit (gated: sections.venue)
│       ├── team.js                # Organizing team (gated: sections.team)
│       ├── volunteers.js          # Volunteer form (gated: sections.volunteers)
│       ├── previous-speakers.js   # (gated: sections.previousSpeakers)
│       ├── code-of-conduct.js, privacy-policy.js, cookie-policy.js, 404.js
│       └── content-pages/*.md     # Legacy OpenEventKit template pages (unused)
└── static/
    ├── img/                       # Hero, venue and team images
    ├── images/gallery/<year>/     # Gallery photos
    ├── CNAME, robots.txt
    └── ...
```

---

## ✏️ Updating the Site

Everything visible on the site is driven by **`src/content/event-data.json`**. Nothing is deleted from the codebase; sections, buttons and whole pages stay hidden until their data is filled in. Leave a link as an empty string (`""`) to keep it hidden.

| Field | What it controls |
| --- | --- |
| `name`, `shortName`, `year` | Site title, navbar brand, page titles, which key of `sponsors.json` is "this year". |
| `status` | `coming-soon` shows the "Coming soon" badges in the navbar and hero. Set to anything else to remove them. |
| `tagline`, `description` | Hero subtitle and the About section copy. |
| `date.display`, `date.note` | The "When" text in the hero (e.g. `June 2027`) and its small note. |
| `date.iso` | Set once the exact date is confirmed (e.g. `2027-06-09`). Turns on the hero countdown, switches the band to "Save the date", adds `startDate` to the structured data, and flips the site to "thank you" mode the day after the event. |
| `venue.name`, `venue.address`, `venue.fullAddress` | The "Where" text. While `name` is empty the hero shows `venue.city` and `venue.note`. |
| `links.registration` | **Register** button in the navbar, hero, CTA banner and speakers page. |
| `links.cfp` | **Call for Papers** nav item and **Submit a talk** buttons. Closes automatically after a `CFP Closes` key date if one exists. |
| `links.sponsorProspectus` | **Sponsor Prospectus** / **Download Prospectus** buttons. |
| `links.volunteerForm` | **Volunteer** button (with `sections.volunteers` also enables the Volunteers page). |
| `links.venueMap` | Makes the hero address a link to Google Maps. |
| `links.sessionizeId` | Sessionize event id used by the Schedule and Speakers pages (with `sections.schedule` / `sections.speakers`). |
| `links.linkedin`, `links.twitter`, `links.flickr` | Social links in the footer, hero fallback buttons and recap section. |
| `links.email`, `links.organizerEmail`, `links.sponsorEmail` | Contact addresses in the footer, team page and sponsors page. |
| `newsletter.*` | Constant Contact sign-up section, see [Email sign-up](#-email-sign-up-constant-contact). |
| `sections.*` | Toggle whole sections and pages: `about`, `getInvolved`, `keyDates`, `recap`, `gallery`, `schedule`, `speakers`, `previousSpeakers`, `sponsors`, `previousSponsors`, `venue`, `team`, `volunteers`. Pages whose flag is off are **not built at all** (see `gatsby-node.js`), so no half-empty page can go live. |
| `keyDates` | Array of `{ "label": "...", "date": "Month D, YYYY" }` shown on the home page timeline and the sponsors page when `sections.keyDates` is `true`. |
| `keynotes` | Optional array of `{ name, company, role, headshot, linkedin }` for the current edition's keynote block on the Speakers page. |
| `previousEdition` | Data for the [2026 recap](#-2026-recap-section). |

---

## 🔁 Bringing Pages Back for 2027

Each 2026 page comes back the moment its data exists:

| Page | Turn on with |
| --- | --- |
| Schedule | `links.sessionizeId` + `sections.schedule: true` |
| Speakers | `links.sessionizeId` + `sections.speakers: true` (optionally `keynotes`) |
| Sponsors | `sections.sponsors: true` (already on) and sponsors in `sponsors.json` → `"2027"` |
| Venue | `venue.name` + `sections.venue: true`. Review the Convene-specific copy in `src/pages/venue.js` (transit tabs, floor plan URL) if the venue changes. |
| Volunteers | `links.volunteerForm` + `sections.volunteers: true` |
| Key dates | `keyDates` array + `sections.keyDates: true` |

Navigation, footer links and the "Get involved" cards update automatically.

---

## 🏁 2026 Recap Section

The landing page carries a "Looking back" section for the previous edition, driven by `previousEdition` in `event-data.json`:

- `stats` — the year in numbers (**the current values are placeholders copied from the 2026 site; replace them with the real attendance, speaker, sponsor and session counts**).
- `keynotes` — the 2026 keynote speakers.
- `summary`, `theme`, `date`, `venue` — the recap copy.
- `url` — the archived 2026 site (`https://2026.kcdnewyork.com`). "Relive KCD New York 2026" links here.
- The 2026 sponsor marquee comes from `sponsors.json` → `"2026"`, and the photo gallery shows every year in `src/data/gallery-photos.json`. Add 2026 photos to `static/images/gallery/2026/` and their metadata to the JSON to get a 2026 tab.

Set `sections.recap: false` to hide the section.

---

## 📬 Email Sign-up (Constant Contact)

The sign-up form is Constant Contact's inline form, the same integration as the KCD Cairo site. Two values in `event-data.json` → `newsletter` control it:

- `constantContactFormId` — the `data-form-id` from the form's inline code (`<div class="ctct-inline-form" data-form-id="…">`).
- `constantContactAccountId` — the `_ctct_m` value from the account's **Universal Code** (Constant Contact → Sign-up Forms → your form → Inline code → *Universal Code*, the line `var _ctct_m = "…"`).

The section, the **Get updates** hero button and the widget script only appear once **both** values are set. The widget loads from `static.ctctcdn.com`.

---

## 🔌 API Integrations

### Sessionize (Schedule & Speakers)

Set `links.sessionizeId` to the Sessionize event id (the segment in `https://sessionize.com/api/v2/<id>/view/...`). `links.sessionizeEmbeds` picks the embed type (`GridSmart` for the schedule, `SpeakerWall` for speakers). Both pages inject the embed at runtime and style it in `layout.css` (see the "Sessionize Embed Custom Styling" block).

### Registration

Set `links.registration` to the ticketing URL (2026 used `https://tickets.kcdnewyork.com`).

### Volunteer form

Set `links.volunteerForm` to the sign-up form URL (Google Forms in 2026).

---

## 🖼️ Adding Images

```
static/img/                    # Hero (kcd-ny-hero.png), venue photos, team headshots (team/)
static/images/gallery/<year>/  # Gallery photos, see src/images/gallery/README.md
src/content/logos/             # Local sponsor logos referenced as "./logos/<file>" in sponsors.json
```

Sponsor logos can also be remote URLs. Prefer WebP/AVIF or compressed JPEG/PNG; suggested sizes: hero 1920×1080, headshots 400×400, sponsor logos ~300×150 transparent PNG/SVG.

---

## 🎨 Styling & Branding

Brand colours are CSS variables at the top of `src/components/layout.css`:

```css
:root {
  --color-primary: #1a2c50;       /* Dark blue – navbar, hero, bands */
  --color-primary-light: #60a1cf;
  --color-secondary: #e2523d;     /* Orange-red – CTAs, highlights */
  --color-accent-warm: #f7a544;   /* Golden orange – eyebrows, countdown labels */
  --color-accent-red: #d13d2f;
}
```

Typography is IBM Plex Sans (with Nunito Sans fallback) from Google Fonts; layout uses Bulma. Landing-page specific styles are in the "2027 landing page additions" block at the end of `layout.css`.

---

## ☁️ Deployment (Cloudflare Pages)

GitHub Actions builds the site and publishes `public/` to Cloudflare Pages with `wrangler` (`.github/workflows/deploy.yml`):

- Push to `main` → production deployment.
- Pull request against `main` → preview deployment; the workflow comments the preview URL on the PR.
- `workflow_dispatch` → manual run.

The target project is the `CLOUDFLARE_PAGES_PROJECT` env in the workflow. Repository secrets: `CLOUDFLARE_API_TOKEN` (Pages: Edit) and `CLOUDFLARE_ACCOUNT_ID`. Set `GATSBY_SITE_URL` to override the canonical URL (defaults to `https://kcdnewyork.com`).

**Manual deploy**

```bash
yarn build
npx wrangler pages deploy public --project-name=<project>
```

---

## 🗄️ Archiving 2026

> ⚠️ **Do not merge the 2027 landing page to `main` before this is done.** The workflow currently deploys `main` to the `kcd-newyork-2026` Cloudflare project, which is the live 2026 site at `kcdnewyork.com`. Merging first would replace the 2026 site with the 2027 landing page and leave nothing for the recap to link to.

The 2026 site is preserved as a frozen edition at **`2026.kcdnewyork.com`**, so every year's site stays online. Steps:

1. **Freeze the source.** From the last 2026 commit on `main` (`c2f6381`, "Add Edera as a sponsor"):
   ```bash
   git tag 2026-final c2f6381
   git branch 2026 c2f6381
   git push origin 2026-final 2026
   ```
2. **Archive-mode tweaks on the `2026` branch** (small PR against `2026`): a slim banner at the top pointing to `kcdnewyork.com` for 2027, `features.registrationEnabled: false`, `features.showSponsorProspectus: false`. Everything else (schedule, speakers, sponsors, venue, photos) stays as it was.
3. **Deploy the archive.** Add a `deploy-2026.yml` workflow that runs on pushes to `2026` and deploys with `--project-name=kcd-newyork-2026 --branch=main` so it becomes that project's production deployment. Protect the `2026` branch.
4. **Cloudflare.** In the `kcd-newyork-2026` Pages project, add the custom domain `2026.kcdnewyork.com`. Create a new Pages project **`kcd-newyork-2027`**, add `kcdnewyork.com` and `www.kcdnewyork.com` to it (removing them from the 2026 project).
5. **Repoint this repo.** Change `CLOUDFLARE_PAGES_PROJECT` in `deploy.yml` to `kcd-newyork-2027`, then merge the 2027 landing page to `main`.

Repeat the same pattern in 2028 (`2027` branch → `2027.kcdnewyork.com`).

---

## 🤝 Contributing

1. **Clone** the repo and install: `yarn install`
2. **Branch:** `git checkout -b feature/your-feature-name`
3. **Edit** `src/content/event-data.json` or the page components; run `yarn develop` to test.
4. **Push** and open a Pull Request to `main`; the workflow posts a Cloudflare preview URL.

**Style:** Use Bulma classes for layout and components; keep components small and reusable; add comments for non-obvious logic.

---

## 📞 Contact

- Organizers: [new-york-org@kubernetescommunitydays.org](mailto:new-york-org@kubernetescommunitydays.org)
- General: [info@kcdnewyork.com](mailto:info@kcdnewyork.com)
- LinkedIn: [KCD New York](https://www.linkedin.com/company/kcdnewyork)

---

## 📄 License

This project is part of the [Kubernetes Community Days](https://kubernetescommunitydays.org/) program, supported by the [CNCF](https://www.cncf.io/).

## 🙏 Acknowledgments

- Landing-page approach shared with [KCD Cairo](https://github.com/cloudcommunitylabs/kcd-cairo)
- Structure and approach originally based on [KCD Toronto 2026](https://github.com/distributethe6ix/kcd-toronto-front-end)
- Built with [Gatsby](https://www.gatsbyjs.com/), styled with [Bulma CSS](https://bulma.io/), hosted on [Cloudflare Pages](https://pages.cloudflare.com/)
