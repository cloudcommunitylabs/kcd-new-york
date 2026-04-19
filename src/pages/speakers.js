import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const Head = () => (
  <Seo title="Speakers" description="Learn about the speakers at KCD New York 2026. Experts from the cloud native community." />
);

export default function SpeakersPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Speakers</h1>
            <p className="subtitle">Call for proposals and speaker lineup</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>Our speaker lineup and call for proposals (CFP) details will be announced here. Stay tuned for updates.</p>
        </div>
      </section>
    </Layout>
  );
}
