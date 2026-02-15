import * as React from "react";
import Layout from "../components/layout";
import PhotoGallery from "../components/PhotoGallery";
import galleryData from "../data/gallery-photos.json";

const EVENT_DATE = "June 10, 2026";
const VENUE = "Convene One Liberty Plaza";
const ADDRESS = "1 Liberty St, New York, NY 10006";

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

const KEY_DATES = [
  { label: "CFP Opens", date: "February 17, 2026" },
  { label: "CFP Closes", date: "March 17, 2026" },
  { label: "CFP Notifications", date: "April 14, 2026" },
  { label: "Schedule Announced", date: "April 28, 2026" },
  { label: "Event Day", date: "June 10, 2026" },
];

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
      {/* Hero with high-contrast event details box */}
      <section
        className="hero is-medium kcd-ny-hero"
        style={{
          backgroundImage: "url('/img/kcd-ny-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-body">
          <div className="kcd-ny-hero-overlay" />
          <div className="kcd-ny-hero-badge">
            Celebrating Our 3rd Year
          </div>
          <div className="container has-text-centered kcd-ny-hero-content">
            <h1 className="title is-1 kcd-ny-hero-title">Kubernetes Community Days New York 2026</h1>
            <p className="subtitle is-3 has-text-white" style={{ marginTop: "1rem", fontWeight: "600", textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>
              Building Bridges in Cloud Native
            </p>
            <div className="kcd-ny-hero-details-box">
              <p className="kcd-ny-hero-detail">
                <span className="kcd-ny-hero-label">Date:</span> {EVENT_DATE}
                <span className="kcd-ny-hero-sep"> · </span>
                <span className="kcd-ny-hero-label">Venue:</span> {VENUE}
              </p>
              <p className="kcd-ny-hero-detail kcd-ny-hero-address">
                <a href="https://maps.app.goo.gl/oWPRrwrqbjfiqxh29" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                  {ADDRESS}
                </a>
              </p>
              <div className="mt-4">
                <a
                  href="https://sessionize.com/kcd-new-york-2026/"
                  className="button kcd-ny-cta is-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Call for Papers is Open!
                </a>
              </div>
              <div className="mt-2" style={{ color: "white" }}>
                <span className="is-size-7">Register (coming soon)</span>
              </div>
            </div>
            <div className="mt-2">
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* About the Theme Section */}
      <section className="section" style={{ background: "#1a2c50", color: "white", padding: "3rem 1.5rem" }}>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <h2 className="title is-2 has-text-white" style={{ marginBottom: "1.5rem" }}>
                🌉 Building Bridges in Cloud Native
              </h2>
              <div className="content is-size-5" style={{ color: "rgba(255,255,255,0.95)", lineHeight: "1.8" }}>
                <p>
                  Just as New York's iconic Brooklyn Bridge connects communities across the East River,
                  KCD New York 2026 connects cloud native practitioners, technologies, and ideas across
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
            <div className="column is-5 has-text-centered">
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
          <div className="columns is-vcentered">
            <div className="column is-4 has-text-centered">
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
                Each year, these connections grow stronger. Join us in 2026 as we continue building bridges
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
            Kubernetes Community Days (KCD) New York 2026 brings the community together on {EVENT_DATE} at {VENUE} in
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
              <span className="button kcd-ny-cta is-medium" aria-disabled="true">
                Register (coming soon)
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
