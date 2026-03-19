import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";

export default function SponsorsPage() {
  const renderSponsors = (yearData) => {
    return yearData.map((tier) => (
      <div key={tier.tier} style={{ marginBottom: "4rem" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #1a2c50"
        }}>
          <h3 className="title is-3" style={{ color: "#1a2c50" }}>
            {tier.tier}
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
          {tier.sponsors.map((sponsor, idx) => (
            <a
              key={idx}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "220px",
                height: "130px",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                color: "#1a2c50",
                fontSize: "1.1rem",
                fontWeight: "700",
                textAlign: "center",
                padding: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#1a2c50";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              {sponsor.logo ? (
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "100%", 
                    objectFit: "contain" 
                  }} 
                />
              ) : (
                sponsor.name
              )}
            </a>
          ))}
        </div>
      </div>
    ));
  };

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
              Sponsor KCD New York {eventData.year}
            </h1>
            <p className="subtitle is-4 has-text-white" style={{ marginBottom: "2rem", opacity: 0.9 }}>
              Join us in building bridges across NYC's cloud native community
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={eventData.links.sponsorProspectus}
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

      {/* Current Sponsors */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Our {eventData.year} Sponsors
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Thank you to our partners supporting the {eventData.year} cloud native community
          </p>

          {sponsorsData["2026"] && sponsorsData["2026"].length > 0 ? (
            renderSponsors(sponsorsData["2026"])
          ) : (
            <div className="has-text-centered has-text-grey py-6">
              <p className="is-size-4">Be the first to sponsor KCD New York {eventData.year}!</p>
              <p className="mt-4">Sponsorship opportunities are now open.</p>
            </div>
          )}
        </div>
      </section>

      {/* Previous Sponsors */}
      <section className="section" style={{ background: "#f9f9f9", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Previous Sponsors (2025)
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            We're grateful for those who supported us in 2025
          </p>

          {renderSponsors(sponsorsData["2025"])}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
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
                {eventData.milestones.map((item, idx) => (
                  <div key={idx} className="columns is-mobile" style={{ marginBottom: "0.75rem", alignItems: "center" }}>
                    <div className="column is-8">{item.name}</div>
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
              href={eventData.links.sponsorProspectus}
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
