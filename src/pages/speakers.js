import * as React from "react";
import Layout from "../components/layout";
import speakersData from "../content/speakers.json";
import eventData from "../content/event-data.json";
import { getEventLifecycle } from "../utils/event-lifecycle";

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function SpeakersPage() {
  const { isShowPreviousSpeakersVisible } = getEventLifecycle(eventData);

  const speakers2026 = speakersData["2026"] || [];
  const keynotes = speakers2026.filter(s => s.isKeynote);
  const highlighted = speakers2026.filter(s => s.isHighlighted && !s.isKeynote);
  const regular = speakers2026.filter(s => !s.isKeynote && !s.isHighlighted);

  const renderSpeakers = (speakers, title, isMain = false) => {
    if (!speakers || speakers.length === 0) return null;
    
    return (
      <div style={{ marginBottom: isMain ? "5rem" : "4rem" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "3rem",
          paddingBottom: "1rem",
          borderBottom: isMain ? "3px solid #1a2c50" : "2px solid #1a2c50"
        }}>
          <h2 className={isMain ? "title is-1" : "title is-2"} style={{ color: "#1a2c50", fontWeight: "900" }}>
            {title}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
            justifyContent: "center"
          }}
        >
          {speakers.map((speaker, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
                padding: "2rem 1.5rem",
                background: "white",
                color: "#1a2c50",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#1a2c50";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              {(speaker.isKeynote || speaker.isHighlighted) && (
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "-35px",
                  background: speaker.isKeynote ? "#d62293" : "#1a2c50",
                  color: "white",
                  padding: "4px 40px",
                  transform: "rotate(45deg)",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  zIndex: 1
                }}>
                  {speaker.isKeynote ? "KEYNOTE" : "FEATURED"}
                </div>
              )}

              <div 
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  marginBottom: "1.5rem",
                  overflow: "hidden",
                  background: "#f0f4f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#1a2c50",
                  border: "4px solid #fff",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  flexShrink: 0
                }}
              >
                {speaker.headshot ? (
                  <img 
                    src={speaker.headshot} 
                    alt={speaker.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                       e.target.style.display = 'none';
                       e.target.parentNode.innerText = getInitials(speaker.name);
                    }}
                  />
                ) : (
                  getInitials(speaker.name)
                )}
              </div>

              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                <h3 className="title is-5" style={{ marginBottom: "1rem", color: "#1a2c50", fontWeight: "800", minHeight: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {speaker.name}
                </h3>
                
                {speaker.company && (
                  <div style={{ marginBottom: "1rem" }}>
                    <p className="subtitle is-6 has-text-weight-bold" style={{ color: "#d62293", fontSize: "1rem", letterSpacing: "0.3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {speaker.company}
                    </p>
                  </div>
                )}

                <p className="is-size-7 has-text-grey" style={{ 
                  lineHeight: "1.5", 
                  flexGrow: 1, 
                  fontWeight: "500",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "3.2rem"
                }}>
                  {speaker.role}
                </p>

                {speaker.linkedin && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#0077b5",
                        fontWeight: "700",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "#f0f7ff",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#0077b5";
                        e.currentTarget.style.color = "#fff";
                        const svg = e.currentTarget.querySelector('svg');
                        if (svg) svg.style.fill = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#f0f7ff";
                        e.currentTarget.style.color = "#0077b5";
                        const svg = e.currentTarget.querySelector('svg');
                        if (svg) svg.style.fill = "#0077b5";
                      }}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
            <h1 className="title is-1 has-text-white" style={{ marginBottom: "1.5rem" }}>
              Our {eventData.year} Speakers
            </h1>
            <p className="subtitle is-4 has-text-white" style={{ marginBottom: "2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto 2rem" }}>
              Meet the industry experts and visionaries joining us for Kubernetes Community Days New York {eventData.year}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={eventData.links.registration}
                className="button is-large kcd-ny-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </a>
              <a
                href="/schedule"
                className="button is-large"
                style={{ background: "white", color: "#1a2c50", fontWeight: "600" }}
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Speakers Section */}
      <section className="section" style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div className="container">
          {speakers2026.length > 0 ? (
            <>
              {renderSpeakers(keynotes, "Keynote Speakers", true)}
              {renderSpeakers(highlighted, "Highlighted Speakers")}
              {renderSpeakers(regular, "Speakers")}
            </>
          ) : (
            <div className="has-text-centered py-6">
              <h3 className="title is-3">Speaker Lineup Coming Soon!</h3>
              <p className="is-size-5 has-text-grey">The CFP is currently open. We'll announce our speakers shortly after the review process.</p>
              <div className="mt-6">
                <a href={eventData.links.cfp} target="_blank" rel="noopener noreferrer" className="button is-large kcd-ny-cta">
                  Submit your talk
                </a>
              </div>
            </div>
          )}

          {/* Previous Speakers Section */}
          {isShowPreviousSpeakersVisible && speakersData["Previous"] && speakersData["Previous"].length > 0 && (
            <div style={{ marginTop: "6rem" }}>
              {renderSpeakers(speakersData["Previous"], "Past Edition Speakers")}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: "#f0f4f8", padding: "5rem 1.5rem" }}>
        <div className="container has-text-centered">
          <h2 className="title is-2" style={{ color: "#1a2c50", marginBottom: "1.5rem" }}>
            Ready to join the community?
          </h2>
          <p className="subtitle is-5 has-text-grey-dark" style={{ marginBottom: "2.5rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Don't miss out on NYC's largest community-led cloud native event. Tickets are selling fast!
          </p>
          <a
            href={eventData.links.registration}
            className="button is-large kcd-ny-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Your Ticket
          </a>
        </div>
      </section>
    </Layout>
  );
}
