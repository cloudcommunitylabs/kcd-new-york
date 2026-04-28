import * as React from "react";
import Layout from "../components/layout";
import previousSpeakersData from "../content/previous-speakers.json";
import eventData from "../content/event-data.json";
import { getEventLifecycle } from "../utils/event-lifecycle";
import Seo from "../components/seo";

export const Head = () => <Seo title="Speakers" description="Meet our keynote speakers and the industry experts joining us for KCD New York 2026." />;

const KEYNOTES = [
  {
    name: "Lin Sun",
    company: "Solo.io",
    role: "VP of Open Source at Solo.io, Kubecon Co-Chair, Istio Maintainer",
    headshot: "https://sessionize.com/image/b154-400o400o1-UnrH8vnN8XbaR16rnvDHp6.jpg",
    linkedin: "https://www.linkedin.com/in/lin-sun-a9b7a81/"
  },
  {
    name: "Mauricio Salatino",
    company: "Dash0",
    role: "Dapr OSS Maintainer, Author of Platform Engineering on Kubernetes",
    headshot: "https://stateofopencon.com/app/uploads/2023/01/mauricio-salaboy-salatino-2-768x768.jpg",
    linkedin: "https://www.linkedin.com/in/salaboy/"
  },
  {
    name: "Chad M. Crowell",
    company: "Akamai",
    role: "Principal SRE at Akamai, Author of Acing the CKA Exam Book, K8s Maintainer",
    headshot: "https://sessionize.com/image/774a-400o400o1-K23HwFw5ZZKADAFn9gmvYd.jpg",
    linkedin: "https://linkedin.com/in/chadmcrowell"
  }
];

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function SpeakersPage() {
  const { isShowPreviousSpeakersVisible, useSessionizeSpeakers } = getEventLifecycle(eventData);
  const { sessionizeId, sessionizeEmbeds } = eventData.links;
  const embedType = sessionizeEmbeds?.speakers || "SpeakerWall";
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!useSessionizeSpeakers || !sessionizeId) return;

    const container = containerRef.current;
    if (!container) return;

    const originalWrite = document.write.bind(document);
    const originalWriteln = document.writeln.bind(document);
    document.write = (html) => container.insertAdjacentHTML("beforeend", html);
    document.writeln = document.write;

    const script = document.createElement("script");
    script.src = `https://sessionize.com/api/v2/${sessionizeId}/view/${embedType}`;
    script.async = false;
    script.onload = () => {
      document.write = originalWrite;
      document.writeln = originalWriteln;
      if (window.sessionize && typeof window.sessionize.loader === "function") {
        window.sessionize.loader();
      }
    };
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
      document.write = originalWrite;
      document.writeln = originalWriteln;
    };
  }, [useSessionizeSpeakers, sessionizeId, embedType]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero is-medium" style={{ background: "#1a2c50" }}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-white">Our Speakers</h1>
            <p className="subtitle is-4 has-text-white opacity-90">
              Meet the visionaries and experts leading the cloud native conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="section" style={{ background: "#f8fafc", padding: "5rem 1.5rem" }}>
        <div className="container">
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <span style={{ color: "#d62293", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "0.5rem" }}>
              Featured
            </span>
            <h2 className="title is-2" style={{ color: "#1a2c50", fontWeight: "900" }}>
              Keynote Speakers
            </h2>
            <div style={{ width: "60px", height: "4px", background: "#d62293", margin: "1.5rem auto" }} />
          </div>

          <div className="columns is-centered is-multiline">
            {KEYNOTES.map((speaker) => (
              <div key={speaker.name} className="column is-4-desktop is-6-tablet">
                <div style={{
                  height: "100%",
                  background: "white",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  borderTop: "6px solid #d62293",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative"
                }}>
                  <div style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "2rem",
                    border: "4px solid #f0f4f8",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                  }}>
                    <img 
                      src={speaker.headshot} 
                      alt={speaker.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  
                  <h3 className="title is-4 mb-4" style={{ color: "#1a2c50", fontWeight: "800" }}>{speaker.name}</h3>
                  <p className="subtitle is-6 mb-4" style={{ color: "#d62293", fontWeight: "700", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
                    {speaker.company}
                  </p>
                  <p className="is-size-6 has-text-grey-dark mb-5" style={{ lineHeight: "1.5", flexGrow: 1 }}>
                    {speaker.role}
                  </p>
                  
                  {speaker.linkedin && (
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button is-small is-light"
                      style={{ color: "#0077b5", fontWeight: "700", borderRadius: "4px" }}
                    >
                      <LinkedInIcon />
                      <span className="ml-2">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Speakers Section */}
      <section className="section" style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div className="container">
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <h2 className="title is-2" style={{ color: "#1a2c50", fontWeight: "900" }}>
              Full Speaker Lineup
            </h2>
            <div style={{ width: "60px", height: "4px", background: "#1a2c50", margin: "1.5rem auto" }} />
          </div>

          {useSessionizeSpeakers && sessionizeId ? (
            <div id="sessionize-speakers" className="mb-6">
              <div 
                ref={containerRef}
                className="sessionize-loader" 
                data-sessionize-load-url={`https://sessionize.com/api/v2/${sessionizeId}/view/${embedType}?under=True`}
              >
                <div className="sz-spinner"></div>
              </div>
            </div>
          ) : (
            <div className="has-text-centered py-6">
              <h3 className="title is-3">More Speakers Coming Soon!</h3>
              <p className="is-size-5 has-text-grey">Stay tuned as we finalize the full schedule.</p>
            </div>
          )}
        </div>
      </section>

      {/* Previous Speakers Section */}
      {isShowPreviousSpeakersVisible && (
        <section className="section" style={{ background: "#f8fafc", padding: "5rem 1.5rem" }}>
          <div className="container">
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <h2 className="title is-2" style={{ color: "#1a2c50", fontWeight: "900" }}>
                Past Edition Speakers
              </h2>
              <div style={{ width: "60px", height: "4px", background: "#1a2c50", margin: "1.5rem auto" }} />
            </div>

            <div className="columns is-multiline is-centered">
              {previousSpeakersData.map((speaker, idx) => (
                <div key={idx} className="column is-3-desktop is-4-tablet is-6-mobile">
                  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 1rem",
                      border: "3px solid #f0f4f8"
                    }}>
                      <img src={speaker.headshot} alt={speaker.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h3 className="title is-5 mb-1" style={{ color: "#1a2c50" }}>{speaker.name}</h3>
                    <p className="is-size-7 has-text-grey-dark">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
