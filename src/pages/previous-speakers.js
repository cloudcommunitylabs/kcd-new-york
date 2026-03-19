import * as React from "react";
import Layout from "../components/layout";
import speakersData from "../content/previous-speakers.json";
import eventData from "../content/event-data.json";

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function PreviousSpeakersPage() {
  const speakers = speakersData.featured || [];

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
              Previous Speakers
            </h1>
            <p className="subtitle is-4 has-text-white" style={{ marginBottom: "2rem", opacity: 0.9 }}>
              Celebrating the experts who built bridges at previous KCD New York events
            </p>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ marginBottom: "3rem" }}>
            Highlighted Speakers
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "2rem",
              justifyContent: "center"
            }}
          >
            {speakers.map((speaker, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "2rem",
                  background: "white",
                  color: "#1a2c50",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
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
                {/* Avatar */}
                <div 
                  style={{
                    width: "120px",
                    height: "120px",
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
                    border: "3px solid #e0e0e0"
                  }}
                >
                  {speaker.headshot ? (
                    <img 
                      src={speaker.headshot} 
                      alt={speaker.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    getInitials(speaker.name)
                  )}
                </div>

                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "100%" }}>
                  <h3 className="title is-5" style={{ marginBottom: "0.5rem", color: "#1a2c50", wordBreak: "break-word" }}>
                    {speaker.name}
                  </h3>
                  {speaker.company && (
                    <p className="subtitle is-6 has-text-weight-bold" style={{ marginBottom: "0.25rem", color: "#d62293", wordBreak: "break-word", lineHeight: "1.3" }}>
                      {speaker.company}
                    </p>
                  )}
                  <p className="is-size-6 has-text-grey" style={{ lineHeight: "1.4", wordBreak: "break-word", marginTop: "auto" }}>
                    {speaker.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="has-text-centered" style={{ marginTop: "4rem" }}>
            <p className="is-size-5 mb-4">Want to be our next speaker?</p>
            <a
              href={eventData.links.cfp}
              className="button is-large kcd-ny-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit to our CFP
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
