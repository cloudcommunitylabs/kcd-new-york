import * as React from "react";
import Layout from "../components/layout";

const VENUE = "Convene One Liberty Plaza";
const ADDRESS = "1 Liberty St, New York, NY 10006";
const EVENT_DATE = "June 10, 2026";

export default function VenuePage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Venue</h1>
            <p className="subtitle">{VENUE} — {EVENT_DATE}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <h2 className="title is-4">{VENUE}</h2>
          <p className="mb-4">
            <strong>Address:</strong> <a href="https://maps.app.goo.gl/oWPRrwrqbjfiqxh29" target="_blank" rel="noopener noreferrer">{ADDRESS}</a>
          </p>
          <p>
            Convene One Liberty Plaza is located in Lower Manhattan, near the World Trade Center and easily accessible
            by subway (multiple lines), PATH, and ferry. More details on transit and accessibility will be added as we
            get closer to the event.
          </p>
        </div>
      </section>
    </Layout>
  );
}
