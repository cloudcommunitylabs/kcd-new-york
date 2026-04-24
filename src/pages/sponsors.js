import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";
import { getSponsorLogo, getSponsorDimensions } from "../utils/sponsor-utils";

export const Head = () => (
  <Seo title="Sponsors" description="Our valued sponsors for KCD New York 2026. Join us in supporting the NYC cloud native community." />
);

export default function SponsorsPage() {
  const getTierClass = (tierName) => {
    const tier = tierName.toLowerCase();
    if (tier.includes("diamond")) return "tier-diamond";
    if (tier.includes("platinum")) return "tier-platinum";
    if (tier.includes("gold")) return "tier-gold";
    if (tier.includes("bronze")) return "tier-bronze";
    if (tier.includes("community")) return "tier-community";
    if (tier.includes("reception")) return "tier-reception";
    return "";
  };

  const renderSponsors = (yearData) => {
    return yearData.map((tier) => (
      <div key={tier.tier} className={`tier-section ${getTierClass(tier.tier)}`} style={{ marginBottom: "6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3 className="tier-header is-size-3">
            {tier.tier}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            justifyContent: "center"
          }}
        >
          {tier.sponsors.map((sponsor, idx) => {
            const { width, height } = getSponsorDimensions(tier.tier, sponsor.scale || 1, true);
            const logoSrc = getSponsorLogo(sponsor.logo);
            // Apply staggered delay classes (1 to 6)
            const delayClass = `delay-${(idx % 6) + 1}`;

            return (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`kcd-ny-sponsor-card animate-up ${delayClass}`}
                style={{
                  width: width,
                  height: height
                }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${sponsor.name} logo`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                ) : (
                  <span className="has-text-weight-bold">{sponsor.name}</span>
                )}
              </a>
            );
          })}
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
      <section className="section bg-grain" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
            Our {eventData.year} Sponsors
          </h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Thank you to our partners supporting the {eventData.year} cloud native community
          </p>

          {sponsorsData[eventData.year] && sponsorsData[eventData.year].length > 0 ? (
            renderSponsors(sponsorsData[eventData.year])
          ) : (
            <div className="has-text-centered has-text-grey py-6">
              <p className="is-size-4">Be the first to sponsor KCD New York {eventData.year}!</p>
              <p className="mt-4">Sponsorship opportunities are now open.</p>
            </div>
          )}
        </div>
      </section>

      {/* Previous Sponsors */}
      {eventData.features.showPreviousSponsors && Object.keys(sponsorsData)
        .filter(year => year !== eventData.year)
        .sort((a, b) => b - a)
        .map(year => (
          <section key={year} className="section bg-grain" style={{ background: "#f9f9f9", padding: "4rem 1.5rem" }}>
            <div className="container">
              <h2 className="title is-2 has-text-centered" style={{ marginBottom: "1rem" }}>
                Past Editions Sponsors ({year})
              </h2>
              <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
                We're grateful for those who supported us in {year}
              </p>

              {renderSponsors(sponsorsData[year])}
            </div>
          </section>
        ))
      }

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
                {eventData.keyDates.map((item, idx) => (
                  <div key={idx} className="columns is-mobile" style={{ marginBottom: "0.75rem", alignItems: "center" }}>
                    <div className="column is-8">{item.label}</div>
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
