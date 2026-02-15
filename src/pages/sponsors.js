import * as React from "react";
import Layout from "../components/layout";

const SPONSOR_TIERS = [
  {
    name: "Diamond",
    logoCount: 3
  },
  {
    name: "Platinum",
    logoCount: 4
  },
  {
    name: "Gold",
    logoCount: 6
  },
  {
    name: "Bronze",
    logoCount: 8
  },
  {
    name: "Community Partner",
    logoCount: 10
  }
];

export default function SponsorsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="hero is-medium"
        style={{
          background: "#1a2c50",
          position: "relative"
        }}
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-white" style={{ marginBottom: "1rem" }}>
              Sponsor KCD New York 2026
            </h1>
            <p className="subtitle is-4 has-text-white" style={{ marginBottom: "2rem", opacity: 0.9 }}>
              Join us in building bridges across NYC's cloud native community
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.canva.com/design/DAG9pfEWHV8/wYffjPEQ02UCKhPyWqyuKg/view"
                className="button is-large kcd-ny-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Prospectus
              </a>
              <a
                href="mailto:ahmed.bebars@cloudcommunitylabs.io"
                className="button is-large"
                style={{ background: "white", color: "#1a2c50", fontWeight: "600" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Our Sponsors
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Thank you to our partners supporting the cloud native community
          </p>

          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.name} style={{ marginBottom: "4rem" }}>
              <div style={{
                textAlign: "center",
                marginBottom: "2rem",
                paddingBottom: "1rem",
                borderBottom: "2px solid #1a2c50"
              }}>
                <h3 className="title is-3" style={{ color: "#1a2c50" }}>
                  {tier.name}
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2rem",
                  justifyContent: "center"
                }}
              >
                {[...Array(tier.logoCount)].map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "200px",
                      height: "120px",
                      border: "2px dashed #e0e0e0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fafafa",
                      color: "#999",
                      fontSize: "0.85rem",
                      textAlign: "center",
                      padding: "1rem"
                    }}
                  >
                    Your Logo Here
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{ background: "#f5f5f5", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "3rem" }}>
            Key Dates
          </h2>
          <div className="columns is-multiline is-centered">
            <div className="column is-8">
              <div className="box" style={{ background: "white", borderRadius: "8px", padding: "2rem", border: "1px solid #e0e0e0" }}>
                <div className="columns is-mobile" style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #e0e0e0" }}>
                  <div className="column is-8 has-text-weight-semibold" style={{ color: "#1a2c50" }}>Milestone</div>
                  <div className="column is-4 has-text-weight-semibold has-text-right" style={{ color: "#1a2c50" }}>Date</div>
                </div>
                {[
                  { milestone: "CFP Opens", date: "Feb 17, 2026" },
                  { milestone: "CFP Closes", date: "Mar 17, 2026" },
                  { milestone: "Sponsorship Agreement", date: "Mar 22, 2026" },
                  { milestone: "CFP Notifications", date: "Apr 15, 2026" },
                  { milestone: "Schedule Announced", date: "Apr 28, 2026" },
                  { milestone: "Sponsor Assets Due", date: "May 11, 2026" },
                  { milestone: "Event Day", date: "Jun 10, 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="columns is-mobile" style={{ marginBottom: "0.75rem", alignItems: "center" }}>
                    <div className="column is-8">{item.milestone}</div>
                    <div className="column is-4 has-text-right" style={{ fontWeight: "600", color: "#1a2c50" }}>
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
      <section className="section" style={{ background: "#1a2c50", color: "white", padding: "4rem 1.5rem" }}>
        <div className="container has-text-centered">
          <h2 className="title is-2 has-text-white" style={{ marginBottom: "1rem" }}>
            Become a Sponsor
          </h2>
          <p className="subtitle is-5 has-text-white" style={{ marginBottom: "2rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 2rem" }}>
            Support 500+ cloud native practitioners and gain visibility in NYC's tech community
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://www.canva.com/design/DAG9pfEWHV8/wYffjPEQ02UCKhPyWqyuKg/view"
              className="button is-large kcd-ny-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Prospectus
            </a>
            <a
              href="mailto:ahmed.bebars@cloudcommunitylabs.io"
              className="button is-large"
              style={{ background: "white", color: "#1a2c50", fontWeight: "600" }}
            >
              Contact Sponsorship Team
            </a>
          </div>
          <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>
            Questions? Email{" "}
            <a href="mailto:ahmed.bebars@cloudcommunitylabs.io" style={{ color: "white", fontWeight: "600", textDecoration: "underline" }}>
              ahmed.bebars@cloudcommunitylabs.io
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
