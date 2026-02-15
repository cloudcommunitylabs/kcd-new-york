import * as React from "react";
import Layout from "../components/layout";

export default function SponsorsPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Sponsors</h1>
            <p className="subtitle">Support KCD New York 2026</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>Sponsorship opportunities for KCD New York 2026 are now available!</p>
          <div className="mt-5">
            <a
              href="https://www.canva.com/design/DAG9pfEWHV8/wYffjPEQ02UCKhPyWqyuKg/view"
              className="button is-primary is-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Sponsor Prospectus
            </a>
          </div>
          <p className="mt-5">Interested in supporting the event? Reach out to the organizing team at <a href="mailto:new-york-org@kubernetescommunitydays.org">new-york-org@kubernetescommunitydays.org</a>.</p>
        </div>
      </section>
    </Layout>
  );
}
