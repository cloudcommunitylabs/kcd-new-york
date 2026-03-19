import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";

export default function CodeOfConductPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Code of Conduct</h1>
            <p className="subtitle">Kubernetes Community Days</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>
            {eventData.name} follows the{" "}
            <a href="https://www.cncf.io/events/community-events/code-of-conduct/" target="_blank" rel="noopener noreferrer">
              CNCF Code of Conduct
            </a>
            . We are committed to providing a welcoming and harassment-free experience for everyone. All attendees,
            speakers, sponsors, and volunteers are expected to uphold this code.
          </p>
          <p>
            If you experience or witness unacceptable behavior, please contact the organizers immediately. Report
            incidents to the event staff or via the contact information provided at the venue.
          </p>
        </div>
      </section>
    </Layout>
  );
}
