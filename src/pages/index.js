import * as React from "react";
import Layout from "../components/layout";
import PhotoGallery from "../components/PhotoGallery";
import galleryData from "../data/gallery-photos.json";

import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";
import { getEventLifecycle } from "../utils/event-lifecycle";
import { getSponsorLogo } from "../utils/sponsor-utils";
import Seo from "../components/seo";


const EVENT_DATE = eventData.date;
const VENUE = eventData.venue.name;
const ADDRESS = eventData.venue.address;

export const Head = () => {
  const eventDateISO = new Date(eventData.date).toISOString().split('T')[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventData.name,
    "startDate": `${eventDateISO}T08:00:00-04:00`,
    "endDate": `${eventDateISO}T18:00:00-04:00`,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": eventData.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Liberty St",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10006",
        "addressCountry": "US"
      }
    },
    "description": "Kubernetes Community Days New York is a community-organized event bringing together the cloud native community.",
    "organizer": {
      "@type": "Organization",
      "name": "KCD New York",
      "url": "https://kcdnewyork.com"
    }
  };

  return (
    <Seo>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Seo>
  );
};

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

const KEY_DATES = eventData.keyDates;

function CtaButtons({ size = "medium", showLabel = true }) {
  const { isCfpOpen, isRegistrationOpen, isSponsorProspectusVisible, isEventOver } = getEventLifecycle(eventData);

  if (isEventOver) {
    return (
      <div className="has-text-centered py-4">
        <p className="title is-4 has-text-white mb-2">Thank you for joining us!</p>
        <p className="subtitle is-6 has-text-white opacity-90">Stay tuned for event recordings and photos.</p>
      </div>
    );
  }

  return (
    <div className="cta-buttons-container">
      <div className="buttons is-centered">
        {isRegistrationOpen ? (
          <a
            href={eventData.links.registration}
            className={`button kcd-ny-cta is-${size}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now!
          </a>
        ) : (
          <span className={`button kcd-ny-cta is-${size}`} aria-disabled="true" style={{ opacity: 0.8, cursor: "not-allowed" }}>
            Register (coming soon)
          </span>
        )}

        {isCfpOpen && (
          <a
            href={eventData.links.cfp}
            className={`button kcd-ny-cta is-${size} is-outlined`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Call for Papers is Open!
          </a>
        )}
        
        {isSponsorProspectusVisible && (
          <a
            href={eventData.links.sponsorProspectus}
            className={`button kcd-ny-button-secondary is-${size}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sponsor Prospectus
          </a>
        )}
      </div>
      {!isRegistrationOpen && showLabel && (
        <div className="mt-2" style={{ color: "white" }}>
          <span className="is-size-7">Registration details will be announced soon</span>
        </div>
      )}
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const targetDate = new Date(EVENT_DATE).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (new Date().getTime() > new Date(EVENT_DATE).getTime()) {
    return (
      <div className="kcd-ny-countdown">
        <p className="title is-4 has-text-white mb-0">Thanks for making KCD New York great!</p>
      </div>
    );
  }

  return (
    <div className="kcd-ny-countdown">
      <p className="kcd-ny-countdown-title">Event Kickoff in:</p>
      <div className="kcd-ny-countdown-units">
        <div className="kcd-ny-countdown-unit">
          <span className="kcd-ny-countdown-value">{timeLeft.days}</span>
          <span className="kcd-ny-countdown-label">Days</span>
        </div>
        <div className="kcd-ny-countdown-unit">
          <span className="kcd-ny-countdown-value">{timeLeft.hours}</span>
          <span className="kcd-ny-countdown-label">Hrs</span>
        </div>
        <div className="kcd-ny-countdown-unit">
          <span className="kcd-ny-countdown-value">{timeLeft.minutes}</span>
          <span className="kcd-ny-countdown-label">Min</span>
        </div>
        <div className="kcd-ny-countdown-unit">
          <span className="kcd-ny-countdown-value">{timeLeft.seconds}</span>
          <span className="kcd-ny-countdown-label">Sec</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      {/* Hero with elegant glassmorphism and motion */}
      <section
        className="hero is-fullheight-with-navbar kcd-ny-hero"
        style={{
          backgroundImage: "url('/img/kcd-ny-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-body">
          <div className="kcd-ny-hero-overlay" />
          <div className="container kcd-ny-hero-content">
            <h1 className="title kcd-ny-hero-title kcd-ny-animate-up kcd-ny-delay-1 has-text-centered">
              {eventData.name}
            </h1>
            
            <p className="subtitle kcd-ny-hero-subtitle kcd-ny-animate-up kcd-ny-delay-2 has-text-centered">
              Building Bridges in Cloud Native
            </p>
            
            <div className="kcd-ny-hero-details-box kcd-ny-animate-up kcd-ny-delay-3 has-text-centered">
              <div className="columns is-mobile is-multiline is-centered">
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">Date</span>
                  <span style={{fontWeight: 700}}>{EVENT_DATE}</span>
                </div>
                <div className="column is-hidden-mobile is-narrow kcd-ny-hero-sep">
                  <div style={{width: "1px", height: "40px", background: "rgba(255,255,255,0.3)"}}></div>
                </div>
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">Venue</span>
                  <span style={{fontWeight: 700}}>{VENUE}</span>
                </div>
              </div>
              <p className="kcd-ny-hero-address mt-3 mb-5">
                <a href={eventData.links.venueMap} target="_blank" rel="noopener noreferrer">
                  {ADDRESS}
                </a>
              </p>
              <div>
                <CtaButtons size="large" showLabel={false} />
              </div>
            </div>
            
            <div className="mt-6 kcd-ny-animate-up kcd-ny-delay-4 has-text-centered">
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* About the Theme Section */}
      <section className="section" style={{ background: "#1a2c50", color: "white", padding: "3rem 1.5rem" }}>
        <div className="container">
          <div className="columns is-vcentered is-mobile-stacked">
            <div className="column is-7 mb-5-mobile">
              <h2 className="title is-2 has-text-white" style={{ marginBottom: "1.5rem" }}>
                🌉 Building Bridges in Cloud Native
              </h2>
              <div className="content is-size-5" style={{ color: "rgba(255,255,255,0.95)", lineHeight: "1.8" }}>
                <p>
                  Just as New York's iconic Brooklyn Bridge connects communities across the East River,
                  {eventData.name} connects cloud native practitioners, technologies, and ideas across
                  the ecosystem.
                </p>
                <p style={{ marginBottom: "0" }}>
                  Over three years, we've built bridges between developers and operators,
                  between startups and enterprises, between local talent and global expertise.
                  This year, we continue that tradition—bringing together 500+ practitioners to
                  share knowledge, forge partnerships, and strengthen the connections that power
                  modern cloud infrastructure.
                </p>
              </div>
            </div>
            <div className="column is-5 has-text-centered mt-5-mobile">
              <div style={{ fontSize: "8rem", lineHeight: "1", marginBottom: "1rem" }}>🌉</div>
              <p className="subtitle is-4 has-text-white" style={{ fontWeight: "600" }}>
                Connecting<br/>Communities • Technologies • Ideas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3rd Year Milestone Section */}
      <section className="section kcd-ny-milestone-section">
        <div className="container">
          <div className="columns is-vcentered is-reversed-mobile">
            <div className="column is-4 has-text-centered mb-6-mobile">
              <div className="kcd-ny-milestone-number">3</div>
              <div className="kcd-ny-milestone-subtitle">Years Strong</div>
              <div className="kcd-ny-stat-grid" style={{ marginTop: "1.5rem" }}>
                <div className="kcd-ny-stat-item">
                  <div className="kcd-ny-stat-value">500+</div>
                  <div className="kcd-ny-stat-label">Attendees</div>
                </div>
                <div className="kcd-ny-stat-item">
                  <div className="kcd-ny-stat-value">50+</div>
                  <div className="kcd-ny-stat-label">Speakers</div>
                </div>
                <div className="kcd-ny-stat-item">
                  <div className="kcd-ny-stat-value">20+</div>
                  <div className="kcd-ny-stat-label">Sponsors</div>
                </div>
                <div className="kcd-ny-stat-item">
                  <div className="kcd-ny-stat-value">30+</div>
                  <div className="kcd-ny-stat-label">Sessions</div>
                </div>
              </div>
            </div>
            <div className="column is-8">
              <h2 className="title is-2">Three Years of Building Bridges</h2>
              <p className="is-size-5" style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                Since 2024, we've been building bridges across New York City's cloud native community.
                What started as a gathering has grown into a thriving network of practitioners, innovators,
                and leaders who are shaping the future of cloud infrastructure.
              </p>
              <p className="is-size-5" style={{ lineHeight: "1.6" }}>
                Each year, these connections grow stronger. Join us in {eventData.year} as we continue building bridges
                between ideas, technologies, and the people who bring them to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Join the community */}
      <section className="section">
        <div className="container content">
          <h2 className="title is-3">Join Hundreds of Cloud Native Practitioners</h2>
          <p>
            {eventData.name} brings the community together on {EVENT_DATE} at {VENUE} in
            Manhattan. Join developers, platform engineers, and cloud native enthusiasts for a day of talks
            and networking.
          </p>
          <p>
            KCD New York is a community-run conference supported by the Cloud Native Computing Foundation (CNCF).
            Whether you're running Kubernetes in production, contributing to open source, or exploring cloud native
            technologies, KCD New York offers a front-row seat to the community and the ecosystem.
          </p>
        </div>
      </section>

      {/* Key Dates Section */}
      <section className="section kcd-ny-dates-section" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">
          <h2 className="title is-3 has-text-centered">Key Dates</h2>
          <div className="timeline mt-6">
            {KEY_DATES.map((item, index) => (
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

      {/* Historical Photos Gallery */}
      <PhotoGallery photos={galleryData.photos} columns={3} showYearFilter={true} />

      {/* What to Expect - dark section with feature grid */}
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

      {/* Featured Sponsors Section */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-3 has-text-centered">Our {eventData.year} Sponsors</h2>
          <div className="mt-6 sponsor-marquee">
            <div className="sponsor-marquee-track">
              {/* Loop twice to make the infinite animation seamless */}
              {[1, 2].map((loopIdx) => (
                <React.Fragment key={`loop-${loopIdx}`}>
                  {sponsorsData[eventData.year] && sponsorsData[eventData.year].flatMap(tier => tier.sponsors).map((sponsor, idx) => {
                    const logoSrc = getSponsorLogo(sponsor.logo);
                    return (
                      <a 
                        key={`${loopIdx}-${idx}`} 
                        href={sponsor.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="sponsor-marquee-item"
                      >
                        {logoSrc ? (
                          <img src={logoSrc} alt={sponsor.name} />
                        ) : (
                          <span className="title is-4">{sponsor.name}</span>
                        )}
                      </a>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="has-text-centered mt-6">
            <a href="/sponsors" className="button is-outlined kcd-ny-button-secondary">
              View All Sponsors
            </a>
          </div>
        </div>
      </section>

      {/* Venue Preview */}
      <section className="section kcd-ny-venue-preview">
        <div className="container">
          <div className="columns is-vcentered">
            <div
              className="column is-6 kcd-ny-venue-preview-image"
              style={{
                backgroundImage: "url('/img/convene-exterior-01.jpg')",
              }}
            >
              {/* Image background */}
            </div>
            <div className="column is-6 has-text-white" style={{ padding: "2rem" }}>
              <h2 className="title is-2 has-text-white">World-Class Venue in the Financial District</h2>
              <div className="content is-size-5" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                <ul style={{ lineHeight: "1.8" }}>
                  <li>Steps from World Trade Center and One World Observatory</li>
                  <li>Accessible by 12+ subway lines and PATH train</li>
                  <li>Modern facility with state-of-the-art AV equipment</li>
                  <li>Spacious conference rooms and networking areas</li>
                </ul>
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

      {/* CTA banner */}
      <section className="section kcd-ny-cta-banner">
        <div className="container">
          <div className="kcd-ny-cta-banner-inner">
            <div>
              <h2 className="title is-4 kcd-ny-cta-banner-title">Ready to Join Us?</h2>
              <p className="kcd-ny-cta-banner-text">
                Be part of New York's premier cloud native community event. Register today to secure your spot!
              </p>
            </div>
            <div className="kcd-ny-cta-banner-button">
              <CtaButtons size="medium" showLabel={false} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
