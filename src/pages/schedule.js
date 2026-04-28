import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";

export const Head = () => (
  <Seo title="Schedule" description="Full event schedule for KCD New York 2026. Join us for technical talks and networking." />
);

export default function SchedulePage() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
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
    script.src = "https://sessionize.com/api/v2/ub0c1f4u/view/GridSmart";
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
  }, []);

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Schedule</h1>
            <p className="subtitle">{eventData.date} — {eventData.venue.name}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div id="sessionize-gridsmart" ref={containerRef} />
        </div>
      </section>
    </Layout>
  );
}
