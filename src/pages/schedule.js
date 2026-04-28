import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";

export const Head = () => (
  <Seo title="Schedule" description="Full event schedule for KCD New York 2026. Join us for technical talks and networking." />
);

export default function SchedulePage() {
  const { useSessionizeSchedule } = eventData.features;
  const { sessionizeId, sessionizeEmbeds } = eventData.links;
  const embedType = sessionizeEmbeds?.schedule || "GridSmart";
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!useSessionizeSchedule || !sessionizeId) return;
    
    const container = containerRef.current;
    if (!container) return;

    // The Sessionize embed uses document.write() and a DOMContentLoaded
    // listener — both hostile to dynamic insertion. Redirect document.write
    // into our container, then invoke the loader manually since DCL fired
    // long before this effect ran.
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
  }, [useSessionizeSchedule, sessionizeId, embedType]);

  return (
    <Layout>
      <section className="hero is-primary is-medium" style={{ background: "#1a2c50", paddingBottom: "10rem" }}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">Event Schedule</h1>
            <p className="subtitle is-4">{eventData.date} — {eventData.venue.name}</p>
          </div>
        </div>
      </section>
      
      <section className="section" style={{ marginTop: "-12rem", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div 
            className="sessionize-grid-container"
            style={{ 
              background: "white", 
              padding: "2rem", 
              borderRadius: "12px", 
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              minHeight: "600px"
            }}
          >
            <div className="content mb-6">
              <h2 className="title is-3 has-text-centered">Full Lineup</h2>
              <p className="has-text-centered is-size-5">
                Explore the full lineup of technical talks, roundtables, and networking opportunities.
              </p>
              <p className="has-text-centered is-size-7 has-text-grey mt-2">
                * Schedule is subject to change.
              </p>
            </div>
            
            {useSessionizeSchedule && sessionizeId ? (
              <div id="sessionize-schedule">
                <div 
                  ref={containerRef}
                  className="sessionize-loader" 
                  data-sessionize-load-url={`https://sessionize.com/api/v2/${sessionizeId}/view/${embedType}?under=True`}
                >
                  <div className="sz-spinner"></div>
                </div>
              </div>
            ) : (
              <div className="notification is-warning has-text-centered">
                <p className="is-size-5">The schedule is currently being finalized. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
