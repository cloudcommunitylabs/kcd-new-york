import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";
import sponsorsData from "../content/sponsors.json";
import { getSponsorLogo, getSponsorDimensions, getTierClass } from "../utils/sponsor-utils";

export const Head = () => (
  <Seo title="Sponsors" description="Our valued sponsors for KCD New York 2026. Join us in supporting the NYC cloud native community." />
);

export default function SponsorsPage() {
  const renderSponsors = (yearData) => {
    return yearData.map((tier) => (
      <div key={tier.tier} className={`tier-section ${getTierClass(tier.tier)}`}>


        <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 2 }}>
          <h3 className="is-size-4 has-text-weight-bold" style={{ letterSpacing: "0.3em", color: "rgba(26, 44, 80, 0.5)", textTransform: "uppercase" }}>
            {tier.tier.toLowerCase().includes("partner") ? tier.tier : `${tier.tier} Partners`}
          </h3>
        </div>

        <div className="sponsor-grid">
          {tier.sponsors.map((sponsor, idx) => {
            const { width, height } = getSponsorDimensions(tier.tier, sponsor.scale || 1, true);
            const logoSrc = getSponsorLogo(sponsor.logo);
            const delayClass = `delay-${(idx % 6) + 1}`;

            return (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`kcd-ny-sponsor-card animate-up ${delayClass}`}
                style={{ width: width, height: height, maxWidth: "100%" }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${sponsor.name} logo`}
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
      <div className="sponsors-page-wrapper">
        {/* Hero Section */}
        <section className="hero is-medium" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-1" style={{ marginBottom: "1.5rem", fontSize: "4.5rem", fontWeight: "900", letterSpacing: "-0.04em", color: "#1a2c50" }}>
                Partner With Us
              </h1>
              <p className="subtitle is-4" style={{ marginBottom: "3.5rem", opacity: 0.8, fontWeight: "300", maxWidth: "800px", margin: "0 auto 3.5rem", color: "#1a2c50" }}>
                Fueling the growth of New York's cloud native community. Join the vanguard of tech leadership.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a 
                  href={eventData.links.sponsorProspectus} 
                  className="button is-large" 
                  style={{ 
                    background: "#e2523d", 
                    color: "white", 
                    fontWeight: "800", 
                    border: "none", 
                    boxShadow: "0 10px 20px rgba(226, 82, 61, 0.2)",
                    borderRadius: "4px"
                  }} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Download Prospectus
                </a>
                <a 
                  href="mailto:ahmed.bebars@cloudcommunitylabs.io" 
                  className="button is-large is-outlined" 
                  style={{ 
                    borderColor: "#1a2c50", 
                    color: "#1a2c50", 
                    fontWeight: "600", 
                    background: "transparent",
                    borderRadius: "4px",
                    borderWidth: "2px"
                  }}
                >
                  Contact Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Current Year Sponsors */}
        <section className="section" style={{ padding: "4rem 1.5rem" }}>
          <div className="container">
            {sponsorsData[eventData.year] && sponsorsData[eventData.year].length > 0 ? (
              renderSponsors(sponsorsData[eventData.year])
            ) : (
              <div className="has-text-centered py-6">
                <p className="is-size-3 has-text-weight-bold" style={{ opacity: 0.3, color: "#1a2c50" }}>2026 Sponsorships Opening Soon</p>
              </div>
            )}
          </div>
        </section>

        {/* Previous Editions */}
        {eventData.features.showPreviousSponsors && Object.keys(sponsorsData)
          .filter(year => year !== eventData.year)
          .sort((a, b) => b - a)
          .map(year => (
            <section key={year} className="section" style={{ padding: "6rem 1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="container">
                <div style={{ textAlign: "center", marginBottom: "8rem" }}>
                  <h2 className="title is-2" style={{ fontWeight: "900", letterSpacing: "-0.02em", color: "#1a2c50" }}>Past Editions ({year})</h2>
                  <div style={{ width: "60px", height: "2px", background: "rgba(0,0,0,0.1)", margin: "2rem auto" }} />
                </div>
                {renderSponsors(sponsorsData[year])}
              </div>
            </section>
          ))
        }

        {/* Timeline Section */}
        <section className="section" style={{ padding: "8rem 1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="container">
            <h2 className="title is-2 has-text-centered" style={{ marginBottom: "5rem", color: "#1a2c50", fontWeight: "900" }}>
              Key Milestones
            </h2>
            <div className="columns is-centered">
              <div className="column is-8">
                <div style={{ background: "rgba(0,0,0,0.01)", borderRadius: "24px", padding: "3rem", border: "1px solid rgba(0,0,0,0.05)", backdropFilter: "blur(10px)" }}>
                  {eventData.keyDates.map((item, idx) => (
                    <div key={idx} className="columns is-mobile" style={{ marginBottom: "2rem", alignItems: "center", borderBottom: idx < eventData.keyDates.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none", paddingBottom: "1.5rem" }}>
                      <div className="column is-8">
                        <p className="is-size-5" style={{ color: "#1a2c50", fontWeight: "600" }}>{item.label}</p>
                      </div>
                      <div className="column is-4 has-text-right">
                        <p className="is-size-5" style={{ color: "#e2523d", fontWeight: "800" }}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section" style={{ padding: "10rem 1.5rem", textAlign: "center", position: "relative" }}>
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "300px", 
            height: "300px", 
            background: "radial-gradient(circle, rgba(226, 82, 61, 0.05) 0%, transparent 70%)",
            zIndex: 0
          }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <h2 className="title is-1" style={{ color: "#1a2c50", fontWeight: "900", marginBottom: "2rem" }}>Ready to Build Bridges?</h2>
            <p className="subtitle is-4" style={{ color: "rgba(26, 44, 80, 0.6)", maxWidth: "600px", margin: "0 auto 3rem" }}>
              Secure your spot and reach NYC's most engaged cloud native community.
            </p>
            <a href="mailto:ahmed.bebars@cloudcommunitylabs.io" className="button is-large" style={{ background: "#1a2c50", color: "white", fontWeight: "800", padding: "0 4rem", borderRadius: "4px" }}>
              Contact Sponsorship Team
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

