import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const Head = () => <Seo title="Cookie Policy" description="KCD New York's policy regarding the use of cookies and similar technologies." />;

export default function CookiePolicyPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cookie Policy</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>Cookie policy for KCD New York 2026 will be published here.</p>
        </div>
      </section>
    </Layout>
  );
}
