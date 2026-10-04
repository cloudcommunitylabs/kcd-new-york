import * as React from "react";
import Layout from "../components/layout";
import PhotoGallery from "../components/PhotoGallery";
import NewsletterSignup, { hasNewsletterForm } from "../components/NewsletterSignup";
import Seo from "../components/seo";
import galleryData from "../data/gallery-photos.json";
import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";
import { getEventLifecycle } from "../utils/event-lifecycle";
import { getSponsorLogo, getTierClass } from "../utils/sponsor-utils";

const WHAT_TO_EXPECT = [
  {
    title: "Expert Talks",
    icon: "🎤",
    description: "Technical talks from industry experts and practitioners sharing real-world experiences and best practices.",
  },
  {
    title: "Hands-On Workshops",
    icon: "💻",
    description: "Practical workshops where you can learn by doing and gain hands-on experience with cloud native tools.",
  },
  {
    title: "Networking",
    icon: "🤝",
    description: "Connect with the cloud native community, meet potential employers, and build lasting professional relationships.",
  },
  {
    title: "Cloud Native Technologies",
    icon: "☸️",
    description: "Learn about Kubernetes, containers, service mesh, observability, and the latest cloud native innovations.",
  },
  {
    title: "Local & International Speakers",
    icon: "🌎",
    description: "Hear from both local practitioners and international experts in the cloud native ecosystem.",
  },
  {
    title: "Community Driven",
    icon: "❤️",
    description: "Celebrate and contribute to open source projects that power modern cloud infrastructure.",
  },
];

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const Head = () => {
  const lifecycle = getEventLifecycle(eventData);
  const { venue } = eventData;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.name,
    description: eventData.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: lifecycle.hasVenue ? venue.name : venue.city,
      address: {
        "@type": "PostalAddress",
        ...(lifecycle.hasVenue && venue.address ? { streetAddress: venue.address } : {}),
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "KCD New York",
      url: "https://kcdnewyork.com",
    },
  };
  if (lifecycle.hasExactDate) {
    schema.startDate = `${eventData.date.iso}T08:00:00-04:00`;
    schema.endDate = `${eventData.date.iso}T18:00:00-04:00`;
  }

  return (
    <Seo>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Seo>
  );
};

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const target = targetDate.getTime();

    const tick = () => {
      const difference = target - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="kcd-ny-countdown">
      <p className="kcd-ny-countdown-title">Event Kickoff in:</p>
      <div className="kcd-ny-countdown-units">
        {[
          ["Days", timeLeft.days],
          ["Hrs", timeLeft.hours],
          ["Min", timeLeft.minutes],
          ["Sec", timeLeft.seconds],
        ].map(([label, value]) => (
          <div key={label} className="kcd-ny-countdown-unit">
            <span className="kcd-ny-countdown-value">{value}</span>
            <span className="kcd-ny-countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroActions({ lifecycle, newsletterReady }) {
  const { links } = eventData;

  const primaryActions = [
    lifecycle.isRegistrationOpen && { href: links.registration, label: "Register Now!", className: "kcd-ny-cta" },
    newsletterReady && { href: "#updates", label: "Get updates", className: "kcd-ny-cta", internal: true },
    lifecycle.isCfpOpen && { href: links.cfp, label: "Call for Papers is Open!", className: "kcd-ny-cta is-outlined kcd-ny-cta-outline" },
    lifecycle.isSponsorProspectusVisible && { href: links.sponsorProspectus, label: "Sponsor Prospectus", className: "kcd-ny-button-secondary" },
  ].filter(Boolean);

  const socialActions = [
    lifecycle.hasLinkedIn && { href: links.linkedin, label: "Follow on LinkedIn" },
    lifecycle.hasTwitter && { href: links.twitter, label: "Follow on X" },
  ].filter(Boolean);

  const actions = primaryActions.length > 0 ? primaryActions : socialActions.map((a) => ({ ...a, className: "kcd-ny-button-secondary" }));
  if (actions.length === 0) return null;

  return (
    <div className="buttons is-centered mt-4">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className={`button is-large ${action.className}`}
          target={action.internal ? undefined : "_blank"}
          rel={action.internal ? undefined : "noopener noreferrer"}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}

function RecapSection({ previousEdition, lifecycle }) {
  const { links } = eventData;
  const previousSponsors = sponsorsData[previousEdition.year] || [];
  const hasSponsors = previousSponsors.some((tier) => tier.sponsors && tier.sponsors.length > 0);
  const keynotes = previousEdition.keynotes || [];
  const stats = previousEdition.stats || [];

  return (
    <section className="section kcd-ny-recap-section" id="recap">
      <div className="container">
        <div className="columns is-vcentered is-variable is-8">
          <div className="column is-5 has-text-centered">
            <span className="kcd-ny-eyebrow">Looking back</span>
            <div className="kcd-ny-recap-year">{previousEdition.year}</div>
            <div className="kcd-ny-milestone-subtitle">{previousEdition.theme}</div>
            {stats.length > 0 && (
              <div className="kcd-ny-stat-grid kcd-ny-stat-grid-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="kcd-ny-stat-item">
                    <div className="kcd-ny-stat-value">{stat.value}</div>
                    <div className="kcd-ny-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="column is-7">
            <h2 className="title is-2 kcd-ny-section-title">What happened at {previousEdition.name}</h2>
            <p className="is-size-5 kcd-ny-lead">{previousEdition.summary}</p>
            <p className="kcd-ny-recap-meta">
              {previousEdition.date}
              {previousEdition.venue && <> · {previousEdition.venue}</>}
            </p>
            <div className="buttons mt-5">
              {previousEdition.url && (
                <a href={previousEdition.url} className="button is-medium kcd-ny-cta" target="_blank" rel="noopener noreferrer">
                  Relive {previousEdition.name}
                </a>
              )}
              {lifecycle.hasFlickr && (
                <a href={links.flickr} className="button is-medium is-outlined kcd-ny-button-outline" target="_blank" rel="noopener noreferrer">
                  Photos on Flickr
                </a>
              )}
            </div>
          </div>
        </div>

        {keynotes.length > 0 && (
          <div className="kcd-ny-recap-keynotes">
            <h3 className="title is-4 has-text-centered kcd-ny-section-title">{previousEdition.year} Keynote Speakers</h3>
            <div className="columns is-multiline is-centered">
              {keynotes.map((speaker) => (
                <div key={speaker.name} className="column is-4-desktop is-6-tablet">
                  <div className="kcd-ny-keynote-card">
                    <figure className="image kcd-ny-keynote-photo">
                      <img src={speaker.headshot} alt={speaker.name} loading="lazy" />
                    </figure>
                    <div>
                      <div className="kcd-ny-keynote-name">
                        <h4 className="title is-5">{speaker.name}</h4>
                        {speaker.linkedin && (
                          <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} on LinkedIn`}>
                            <LinkedInIcon />
                          </a>
                        )}
                      </div>
                      <p className="kcd-ny-keynote-company">{speaker.company}</p>
                      <p className="kcd-ny-keynote-role">{speaker.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSponsors && (
          <div className="kcd-ny-recap-sponsors">
            <h3 className="title is-4 has-text-centered kcd-ny-section-title">Thank you to our {previousEdition.year} sponsors</h3>
            <div className="sponsor-marquee">
              <div className="sponsor-marquee-track">
                {[1, 2].map((loopIdx) => (
                  <React.Fragment key={`loop-${loopIdx}`}>
                    {previousSponsors.map((tier) =>
                      tier.sponsors.map((sponsor) => {
                        const logoSrc = getSponsorLogo(sponsor.logo);
                        return (
                          <a
                            key={`${loopIdx}-${tier.tier}-${sponsor.name}`}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`sponsor-marquee-item ${getTierClass(tier.tier)}`}
                          >
                            {logoSrc ? <img src={logoSrc} alt={sponsor.name} loading="lazy" /> : <span className="title is-5">{sponsor.name}</span>}
                          </a>
                        );
                      })
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function IndexPage() {
  const lifecycle = getEventLifecycle(eventData);
  const { links, date, venue, previousEdition } = eventData;
  const newsletterReady = hasNewsletterForm(eventData.newsletter);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="hero is-fullheight-with-navbar kcd-ny-hero"
        style={{
          backgroundImage: "url('/img/kcd-ny-hero-2027.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-body">
          <div className="kcd-ny-hero-overlay" />
          <div className="container kcd-ny-hero-content has-text-centered">
            <p className="kcd-ny-hero-eyebrow kcd-ny-animate-up kcd-ny-delay-1">Kubernetes Community Days · New York City</p>
            <h1 className="title kcd-ny-hero-title kcd-ny-animate-up kcd-ny-delay-1">{eventData.name}</h1>

            <p className="subtitle kcd-ny-hero-subtitle kcd-ny-animate-up kcd-ny-delay-2">{eventData.tagline}</p>

            {lifecycle.isComingSoon && !lifecycle.isRegistrationOpen && (
              <p className="kcd-ny-coming-soon kcd-ny-animate-up kcd-ny-delay-2" role="status">
                <span className="kcd-ny-pulse" aria-hidden="true" />
                Coming soon
              </p>
            )}

            <div className="kcd-ny-hero-details-box kcd-ny-animate-up kcd-ny-delay-3">
              <div className="columns is-mobile is-multiline is-centered is-vcentered">
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">When</span>
                  <span className="is-size-5 has-text-weight-bold">{date.display}</span>
                  {!lifecycle.hasExactDate && date.note && <span className="kcd-ny-hero-note">{date.note}</span>}
                </div>
                <div className="column is-hidden-mobile is-narrow kcd-ny-hero-sep">
                  <div style={{ width: "1px", height: "40px", background: "rgba(0,0,0,0.1)" }}></div>
                </div>
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">Where</span>
                  <span className="is-size-5 has-text-weight-bold">{lifecycle.hasVenue ? venue.name : venue.city}</span>
                  {!lifecycle.hasVenue && venue.note && <span className="kcd-ny-hero-note">{venue.note}</span>}
                </div>
              </div>
              {lifecycle.hasVenue && venue.address && (
                <p className="kcd-ny-hero-address mt-2">
                  {lifecycle.hasVenueMap ? (
                    <a href={links.venueMap} target="_blank" rel="noopener noreferrer" className="has-text-grey-dark">
                      {venue.address}
                    </a>
                  ) : (
                    venue.address
                  )}
                </p>
              )}
              <HeroActions lifecycle={lifecycle} newsletterReady={newsletterReady} />
            </div>

            {lifecycle.hasExactDate && !lifecycle.isEventOver && (
              <div className="mt-6 kcd-ny-animate-up kcd-ny-delay-4 has-text-centered">
                <Countdown targetDate={lifecycle.eventDate} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Save the month band */}
      <section className="section kcd-ny-band" id="save-the-date">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <span className="kcd-ny-eyebrow kcd-ny-eyebrow-light">{lifecycle.hasExactDate ? "Save the date" : "Save the month"}</span>
              <h2 className="title is-2 has-text-white kcd-ny-band-date">
                {date.display} <span className="kcd-ny-band-sep">·</span> {lifecycle.hasVenue ? venue.name : venue.city}
              </h2>
              <p className="is-size-5 kcd-ny-band-note">
                {lifecycle.hasExactDate
                  ? "Add it to your calendar and we'll see you there."
                  : "The exact date and venue will be confirmed soon. Bookmark this page and check back, or sign up for updates."}
              </p>
            </div>
            <div className="column is-5 has-text-centered">
              <div className="kcd-ny-band-icon" aria-hidden="true">
                🗽
              </div>
              <p className="subtitle is-4 has-text-white kcd-ny-band-tagline">
                Connecting
                <br />
                Communities • Technologies • Ideas
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup newsletter={eventData.newsletter} />

      {/* About */}
      {lifecycle.showAbout && (
        <section className="section" id="about">
          <div className="container content">
            <span className="kcd-ny-eyebrow">About the event</span>
            <h2 className="title is-3 kcd-ny-section-title">Cloud native, made in New York</h2>
            <p className="is-size-5">{eventData.description}</p>
            <p>
              KCD New York is a community-run conference supported by the Cloud Native Computing Foundation (CNCF). Whether you're
              running Kubernetes in production, contributing to open source, or exploring cloud native technologies, KCD New York
              offers a front-row seat to the community and the ecosystem.
            </p>
          </div>
        </section>
      )}

      {/* What to Expect */}
      {lifecycle.showAbout && (
        <section className="section kcd-ny-dark-section">
          <div className="container">
            <h2 className="title is-3 has-text-centered kcd-ny-dark-title">What to Expect</h2>
            <div className="columns is-multiline is-variable is-5 mt-5">
              {WHAT_TO_EXPECT.map((item) => (
                <div key={item.title} className="column is-6-tablet is-4-desktop">
                  <div className="kcd-ny-feature-box">
                    <span className="kcd-ny-feature-icon" role="img" aria-label={item.title}>
                      {item.icon}
                    </span>
                    <h3 className="title is-5 kcd-ny-feature-box-title">{item.title}</h3>
                    <p className="kcd-ny-feature-box-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Dates */}
      {lifecycle.showKeyDates && (
        <section className="section kcd-ny-dates-section" id="key-dates" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="container">
            <h2 className="title is-3 has-text-centered">Key Dates</h2>
            <div className="timeline mt-6">
              {eventData.keyDates.map((item, index) => (
                <div key={item.label} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                  <div className="timeline-content">
                    <span className="timeline-date">{item.date}</span>
                    <span className="timeline-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2026 Recap */}
      {lifecycle.showRecap && <RecapSection previousEdition={previousEdition} lifecycle={lifecycle} />}

      {/* Photo gallery (all past editions) */}
      {lifecycle.showGallery && galleryData.photos.length > 0 && (
        <PhotoGallery photos={galleryData.photos} columns={3} showYearFilter={true} flickrUrl={links.flickr} />
      )}

      {/* Get involved */}
      {lifecycle.showGetInvolved && (
        <section className="section kcd-ny-involve-section" id="get-involved">
          <div className="container has-text-centered">
            <span className="kcd-ny-eyebrow">Get involved</span>
            <h2 className="title is-2 kcd-ny-section-title">Speak. Sponsor. Volunteer.</h2>
            <p className="is-size-5 kcd-ny-lead kcd-ny-lead-center">
              Call for proposals, sponsorship packages, volunteering and registration for {eventData.shortName} will be announced right
              here.
            </p>
            <div className="columns is-multiline is-centered mt-5">
              <div className="column is-4-desktop is-6-tablet">
                <div className="kcd-ny-involve-card">
                  <span className="kcd-ny-feature-icon" role="img" aria-label="Speakers">
                    🎤
                  </span>
                  <h3 className="title is-4">Speakers</h3>
                  <p>Have a story about running cloud native in production? The call for proposals opens soon.</p>
                  {lifecycle.isCfpOpen ? (
                    <a href={links.cfp} className="button kcd-ny-cta" target="_blank" rel="noopener noreferrer">
                      Submit a talk
                    </a>
                  ) : (
                    <span className="kcd-ny-chip">CFP opens soon</span>
                  )}
                </div>
              </div>
              <div className="column is-4-desktop is-6-tablet">
                <div className="kcd-ny-involve-card">
                  <span className="kcd-ny-feature-icon" role="img" aria-label="Sponsors">
                    🤝
                  </span>
                  <h3 className="title is-4">Sponsors</h3>
                  <p>Put your brand in front of New York's cloud native community and support a community-run event.</p>
                  {lifecycle.isSponsorProspectusVisible ? (
                    <a href={links.sponsorProspectus} className="button kcd-ny-cta" target="_blank" rel="noopener noreferrer">
                      View the prospectus
                    </a>
                  ) : links.sponsorEmail ? (
                    <a href={`mailto:${links.sponsorEmail}`} className="button kcd-ny-cta">
                      Talk to us
                    </a>
                  ) : (
                    <span className="kcd-ny-chip">Prospectus coming soon</span>
                  )}
                </div>
              </div>
              <div className="column is-4-desktop is-6-tablet">
                <div className="kcd-ny-involve-card">
                  <span className="kcd-ny-feature-icon" role="img" aria-label="Volunteers">
                    ❤️
                  </span>
                  <h3 className="title is-4">Volunteers</h3>
                  <p>Help us make KCD New York happen, from registration desks to room moderation.</p>
                  {lifecycle.isVolunteerFormVisible ? (
                    <a href={links.volunteerForm} className="button kcd-ny-cta" target="_blank" rel="noopener noreferrer">
                      Volunteer
                    </a>
                  ) : (
                    <span className="kcd-ny-chip">Sign-up opens soon</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Venue preview (only once a venue is confirmed) */}
      {lifecycle.showVenue && (
        <section className="section kcd-ny-venue-preview">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-6 kcd-ny-venue-preview-image" style={{ backgroundImage: "url('/img/convene-exterior-01.jpg')" }} />
              <div className="column is-6 has-text-white" style={{ padding: "2rem" }}>
                <h2 className="title is-2 has-text-white">{venue.name}</h2>
                <div className="content is-size-5" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                  <p>{venue.fullAddress || venue.address}</p>
                  <div style={{ marginTop: "2rem" }}>
                    <a href="/venue" className="button is-large kcd-ny-button-secondary">
                      Learn More About the Venue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="section kcd-ny-cta-banner">
        <div className="container">
          <div className="kcd-ny-cta-banner-inner">
            <div>
              <h2 className="title is-4 kcd-ny-cta-banner-title">
                {lifecycle.isRegistrationOpen ? "Ready to Join Us?" : "Be the first to know"}
              </h2>
              <p className="kcd-ny-cta-banner-text">
                {lifecycle.isRegistrationOpen
                  ? "Be part of New York's premier cloud native community event. Register today to secure your spot!"
                  : "Registration, the call for proposals and sponsorship details are on the way. Follow along so you don't miss them."}
              </p>
            </div>
            <div className="kcd-ny-cta-banner-button">
              <div className="buttons is-centered">
                {lifecycle.isRegistrationOpen ? (
                  <a href={links.registration} className="button kcd-ny-cta is-medium" target="_blank" rel="noopener noreferrer">
                    Register Now!
                  </a>
                ) : newsletterReady ? (
                  <a href="#updates" className="button kcd-ny-cta is-medium">
                    Get updates
                  </a>
                ) : lifecycle.hasLinkedIn ? (
                  <a href={links.linkedin} className="button kcd-ny-cta is-medium" target="_blank" rel="noopener noreferrer">
                    Follow on LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
