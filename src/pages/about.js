import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";

export default function AboutPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">About KCD New York</h1>
            <p className="subtitle">{eventData.name}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>
            Kubernetes Community Days (KCD) are community-organized events that bring together adopters and developers
            of Kubernetes and other cloud native technologies. {eventData.name} is a one-day event for learning,
            sharing, and networking.
          </p>
          <p>
            The event is supported by the Cloud Native Computing Foundation (CNCF) and follows the global Kubernetes
            Community Days program. We welcome everyone—from first-time contributors to seasoned practitioners.
          </p>
        </div>
      </section>
    </Layout>
  );
}
