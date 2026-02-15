import * as React from "react";
import Layout from "../components/layout";

const SPONSOR_TIERS = [
  {
    name: "Diamond",
    icon: "💎",
    color: "#1a2c50",
    available: 3,
    tagline: "Maximum visibility and impact",
    highlights: [
      "Specialty-located booth space",
      "12 complimentary attendee tickets",
      "Keynote presentation opportunity",
      "Quote in premium KCD press release",
      "30% discount code for additional tickets",
      "Dedicated social media promotional mention",
      "1 lead scanner license",
      "Branding in all marketing material"
    ],
    featured: true
  },
  {
    name: "Platinum",
    icon: "⭐",
    color: "#60a1cf",
    available: 4,
    tagline: "Premier event presence",
    highlights: [
      "Extra Large booth space",
      "8 complimentary attendee tickets",
      "Break-out session (15-30min)",
      "Quote in premium KCD press release",
      "30% discount code for additional tickets",
      "Dedicated social media promotional mention",
      "1 lead scanner license",
      "Branding in all marketing material"
    ],
    featured: true
  },
  {
    name: "Gold",
    icon: "🥇",
    color: "#f7a544",
    available: 6,
    tagline: "Strong brand visibility",
    highlights: [
      "Large (8ft) booth space",
      "4 complimentary attendee tickets",
      "Quote in standard press release",
      "20% discount code for guests (6 tickets)",
      "Group social media promotional mention",
      "1 lead scanner license",
      "Branding in all marketing material"
    ],
    featured: false
  },
  {
    name: "Bronze",
    icon: "🥉",
    color: "#e2523d",
    available: 8,
    tagline: "Essential event support",
    highlights: [
      "Medium (6ft) booth space",
      "2 complimentary attendee tickets",
      "20% discount code for additional tickets",
      "Group social media promotional mention",
      "1 lead scanner license",
      "Branding in all marketing material"
    ],
    featured: false
  },
  {
    name: "Community/Media Partner",
    icon: "🤝",
    color: "#e91e8c",
    available: null,
    tagline: "Support the community",
    highlights: [
      "1 ticket",
      "Presence in community zone",
      "Logo on website",
      "Keynote mention"
    ],
    featured: false
  }
];

const ADD_ONS = [
  {
    name: "Session Recording",
    icon: "🎥",
    description: "Extend your presence beyond the event with professional recordings published on the KCD New York YouTube channel"
  },
  {
    name: "Branded T-Shirts",
    icon: "👕",
    description: "Sponsor logo on official event t-shirt worn by all attendees"
  },
  {
    name: "Lanyards",
    icon: "🏷️",
    description: "Showcase your logo on every attendee lanyard with full-color, high-quality printing"
  },
  {
    name: "Happy Hour",
    icon: "🍻",
    description: "Sponsor the official Happy Hour with your branding, entertainment, food, and drinks"
  },
  {
    name: "Lunch Sponsorship",
    icon: "🍽️",
    description: "Sponsor the New York-style lunch with signage and ongoing conversation opportunities"
  },
  {
    name: "Coffee Bar",
    icon: "☕",
    description: "Sponsor the specialty coffee bar with your branding at the beverage station"
  }
];

export default function SponsorsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="hero is-medium"
        style={{
          background: "linear-gradient(135deg, #1a2c50 0%, #60a1cf 100%)",
          position: "relative"
        }}
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-white" style={{ marginBottom: "1rem" }}>
              Partner with KCD New York 2026
            </h1>
            <p className="subtitle is-4 has-text-white" style={{ marginBottom: "2rem", opacity: 0.95 }}>
              Join us in celebrating our 3rd year as NYC's premier cloud native community event
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.canva.com/design/DAG9pfEWHV8/wYffjPEQ02UCKhPyWqyuKg/view"
                className="button is-large kcd-ny-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Download Full Prospectus
              </a>
              <a
                href="mailto:ahmed.bebars@cloudcommunitylabs.io"
                className="button is-large"
                style={{ background: "white", color: "#1a2c50" }}
              >
                📧 Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "3rem" }}>
            Why Sponsor KCD New York?
          </h2>
          <div className="columns is-multiline">
            <div className="column is-3-desktop is-6-tablet">
              <div className="has-text-centered" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
                <p className="title is-3" style={{ color: "#1a2c50", marginBottom: "0.5rem" }}>500+</p>
                <p className="subtitle is-6">Cloud Native Practitioners</p>
              </div>
            </div>
            <div className="column is-3-desktop is-6-tablet">
              <div className="has-text-centered" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
                <p className="title is-3" style={{ color: "#1a2c50", marginBottom: "0.5rem" }}>3rd</p>
                <p className="subtitle is-6">Year Milestone Event</p>
              </div>
            </div>
            <div className="column is-3-desktop is-6-tablet">
              <div className="has-text-centered" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗽</div>
                <p className="title is-3" style={{ color: "#1a2c50", marginBottom: "0.5rem" }}>NYC</p>
                <p className="subtitle is-6">Premier Tech Hub Location</p>
              </div>
            </div>
            <div className="column is-3-desktop is-6-tablet">
              <div className="has-text-centered" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>☸️</div>
                <p className="title is-3" style={{ color: "#1a2c50", marginBottom: "0.5rem" }}>100%</p>
                <p className="subtitle is-6">Cloud Native Focused</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="section" style={{ background: "#f5f5f5", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Sponsorship Opportunities
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Choose the level that best fits your goals and budget
          </p>

          <div className="columns is-multiline">
            {SPONSOR_TIERS.map((tier, index) => (
              <div
                key={tier.name}
                className={`column ${tier.featured ? 'is-6-desktop' : 'is-4-desktop'} is-12-tablet`}
              >
                <div
                  className="box"
                  style={{
                    height: "100%",
                    border: tier.featured ? `3px solid ${tier.color}` : "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "2rem",
                    position: "relative",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "white"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {tier.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        right: "20px",
                        background: tier.color,
                        color: "white",
                        padding: "0.25rem 1rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase"
                      }}
                    >
                      Popular
                    </div>
                  )}

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{tier.icon}</div>
                    <h3
                      className="title is-4"
                      style={{ color: tier.color, marginBottom: "0.5rem" }}
                    >
                      {tier.name}
                    </h3>
                    <p className="subtitle is-6 has-text-grey">
                      {tier.tagline}
                    </p>
                    {tier.available && (
                      <p style={{
                        display: "inline-block",
                        background: "#f7a544",
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600"
                      }}>
                        {tier.available} {tier.available === 1 ? 'spot' : 'spots'} available
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <p className="has-text-weight-semibold" style={{ marginBottom: "0.75rem", color: tier.color }}>
                      What's Included:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {tier.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            marginBottom: "0.5rem",
                            fontSize: "0.9rem"
                          }}
                        >
                          <span style={{ color: tier.color, marginRight: "0.5rem", fontSize: "1.2rem" }}>✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="mailto:ahmed.bebars@cloudcommunitylabs.io"
                    className="button is-fullwidth"
                    style={{
                      background: tier.color,
                      color: "white",
                      borderColor: tier.color,
                      fontWeight: "600"
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Opportunities */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Add-On Opportunities
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Enhance your sponsorship with additional visibility options
          </p>

          <div className="columns is-multiline">
            {ADD_ONS.map((addon, index) => (
              <div key={addon.name} className="column is-4-desktop is-6-tablet">
                <div
                  className="box"
                  style={{
                    height: "100%",
                    padding: "1.5rem",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px"
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{addon.icon}</div>
                  <h3 className="title is-5" style={{ color: "#1a2c50", marginBottom: "0.75rem" }}>
                    {addon.name}
                  </h3>
                  <p className="has-text-grey" style={{ fontSize: "0.95rem" }}>
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="has-text-centered" style={{ marginTop: "2rem" }}>
            <p className="subtitle is-6 has-text-grey">
              Interested in add-ons? Contact us for availability and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{ background: "#1a2c50", color: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered has-text-white" style={{ marginBottom: "3rem" }}>
            Key Dates
          </h2>
          <div className="columns is-multiline is-centered">
            <div className="column is-8">
              <div className="box" style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "2rem" }}>
                <div className="columns is-mobile" style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="column is-8 has-text-white has-text-weight-semibold">Milestone</div>
                  <div className="column is-4 has-text-white has-text-weight-semibold has-text-right">Date</div>
                </div>
                {[
                  { milestone: "CFP Opens", date: "Feb 17th, 2026" },
                  { milestone: "CFP Closes", date: "March 17th, 2026" },
                  { milestone: "Sponsorship Agreement Signed", date: "March 22th, 2026" },
                  { milestone: "CFP Notifications", date: "April 15th, 2026" },
                  { milestone: "Schedule Announced", date: "April 28th, 2026" },
                  { milestone: "Sponsor Assets Due", date: "May 11th, 2026" },
                  { milestone: "Event Day", date: "June 10th, 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="columns is-mobile" style={{ marginBottom: "0.75rem", alignItems: "center" }}>
                    <div className="column is-8 has-text-white">{item.milestone}</div>
                    <div className="column is-4 has-text-white has-text-right" style={{ fontWeight: "600" }}>
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container has-text-centered">
          <h2 className="title is-2" style={{ marginBottom: "1rem" }}>
            Ready to Become a Sponsor?
          </h2>
          <p className="subtitle is-5 has-text-grey" style={{ marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Join us in supporting New York's cloud native community and gain visibility among 500+ practitioners
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://www.canva.com/design/DAG9pfEWHV8/wYffjPEQ02UCKhPyWqyuKg/view"
              className="button is-large kcd-ny-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Full Prospectus
            </a>
            <a
              href="mailto:ahmed.bebars@cloudcommunitylabs.io"
              className="button is-large"
              style={{ background: "#1a2c50", color: "white", borderColor: "#1a2c50" }}
            >
              📧 Contact Sponsorship Team
            </a>
          </div>
          <p className="has-text-grey" style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
            Questions? Reach out to{" "}
            <a href="mailto:ahmed.bebars@cloudcommunitylabs.io" style={{ color: "#1a2c50", fontWeight: "600" }}>
              ahmed.bebars@cloudcommunitylabs.io
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
