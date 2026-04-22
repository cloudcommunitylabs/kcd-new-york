import * as React from "react";
import Layout from "../components/layout";
import PhotoGallery from "../components/PhotoGallery";
import galleryData from "../data/gallery-photos.json";

import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";
import speakersData from "../content/speakers.json";
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
          <div className="container kcd-ny-hero-content has-text-centered">
            <h1 className="title kcd-ny-hero-title kcd-ny-animate-up kcd-ny-delay-1">
              {eventData.name}
            </h1>
            
            <p className="subtitle kcd-ny-hero-subtitle kcd-ny-animate-up kcd-ny-delay-2">
              Building Bridges in Cloud Native
            </p>
            
            <div className="kcd-ny-hero-details-box kcd-ny-animate-up kcd-ny-delay-3">
              <div className="columns is-mobile is-multiline is-centered is-vcentered">
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">Date</span>
                  <span className="is-size-5 has-text-weight-bold">{EVENT_DATE}</span>
                </div>
                <div className="column is-hidden-mobile is-narrow kcd-ny-hero-sep">
                  <div style={{width: "1px", height: "40px", background: "rgba(0,0,0,0.1)"}}></div>
                </div>
                <div className="column is-12-mobile is-auto-tablet kcd-ny-hero-detail">
                  <span className="kcd-ny-hero-label">Venue</span>
                  <span className="is-size-5 has-text-weight-bold">{VENUE}</span>
                </div>
              </div>
              <p className="kcd-ny-hero-address mt-2 mb-5">
                <a href={eventData.links.venueMap} target="_blank" rel="noopener noreferrer" className="has-text-grey-dark">
                  {ADDRESS}
                </a>
              </p>
              <div className="mt-4">
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

      {/* Featured Speakers Section - Architectural Modernist Style */}
      <section className="section" style={{ 
        background: "#ffffff", 
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle geometric background pattern */}
        <div style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, #f0f4f8 2px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.5,
          zIndex: 0
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <span style={{ 
              color: "#d62293", 
              fontWeight: "700", 
              textTransform: "uppercase", 
              letterSpacing: "2px", 
              fontSize: "0.85rem",
              display: "block",
              marginBottom: "0.5rem"
            }}>
              2026 Lineup
            </span>
            <h2 className="title is-2" style={{ color: "#1a2c50", fontWeight: "900", letterSpacing: "-1px" }}>
              Featured Speakers
            </h2>
            <div style={{ width: "60px", height: "4px", background: "#1a2c50", margin: "1.5rem auto" }} />
          </div>

          <div className="columns is-multiline is-centered">
            {(speakersData["2026"] || [])
              .filter(s => s.isKeynote || s.isHighlighted)
              .slice(0, 3)
              .map((speaker, idx) => {
                const companyUrls = {
                  "Akamai": "https://www.akamai.com",
                  "Solo.io": "https://www.solo.io",
                  "Diagrid": "https://www.diagrid.io"
                };
                const companyUrl = companyUrls[speaker.company];

                return (
                  <div key={idx} className="column is-4-desktop is-6-tablet">
                    <div 
                      style={{ 
                        height: "100%", 
                        background: "#fff",
                        borderRadius: "0px",
                        borderLeft: "8px solid #1a2c50",
                        padding: "2rem 1.5rem",
                        boxShadow: "15px 15px 0px #f0f4f8",
                        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translate(-6px, -6px)";
                        e.currentTarget.style.boxShadow = "22px 22px 0px #e2e8f0";
                        e.currentTarget.style.borderColor = "#d62293";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translate(0, 0)";
                        e.currentTarget.style.boxShadow = "15px 15px 0px #f0f4f8";
                        e.currentTarget.style.borderColor = "#1a2c50";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                        <figure className="image" style={{ marginRight: "1rem", flexShrink: 0, width: "100px", height: "100px" }}>
                          <img 
                            src={speaker.headshot} 
                            alt={speaker.name}
                            style={{ objectFit: "cover", height: "100px", width: "100px", filter: "grayscale(5%) contrast(1.05)" }}
                          />
                        </figure>
                        <div style={{ textAlign: "left" }}>
                           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <h3 className="title is-4" style={{ color: "#1a2c50", fontWeight: "800", lineHeight: "1.1", marginBottom: "0", fontSize: "1.3rem" }}>
                                 {speaker.name}
                              </h3>
                              {speaker.linkedin && (
                                 <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#0077b5">
                                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                 </a>
                              )}
                           </div>
                           {companyUrl ? (
                             <a href={companyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <p style={{ color: "#d62293", fontWeight: "700", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "0.3rem" }}>
                                   {speaker.company}
                                </p>
                             </a>
                           ) : (
                             <p style={{ color: "#d62293", fontWeight: "700", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "0.3rem" }}>
                                {speaker.company}
                             </p>
                           )}
                        </div>
                      </div>
                      
                      <div style={{ flexGrow: 1 }}>
                        <p style={{ 
                          color: "#4a5568", 
                          fontSize: "0.85rem", 
                          lineHeight: "1.4",
                          fontStyle: "italic",
                          borderTop: "1px solid #edf2f7",
                          paddingTop: "1rem"
                        }}>
                          {speaker.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="has-text-centered" style={{ marginTop: "6rem" }}>
            <a 
              href="/speakers" 
              className="button is-large"
              style={{
                background: "#1a2c50",
                color: "white",
                borderRadius: "0",
                padding: "1.5rem 3rem",
                fontWeight: "700",
                border: "none",
                boxShadow: "10px 10px 0px #d62293",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translate(-4px, -4px)";
                e.currentTarget.style.boxShadow = "14px 14px 0px #d62293";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "10px 10px 0px #d62293";
              }}
            >
              Discover All Speakers
            </a>
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
