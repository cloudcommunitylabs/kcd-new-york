import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Privacy Policy</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>Privacy policy for {eventData.name} will be published here. For CNCF event policies, see the CNCF and Kubernetes Community Days program documentation.</p>
        </div>
      </section>
    </Layout>
  );
}
