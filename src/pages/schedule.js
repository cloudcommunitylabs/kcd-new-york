import * as React from "react";
import Layout from "../components/layout";

const SESSIONS = [
];

export default function SchedulePage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Schedule</h1>
            <p className="subtitle">June 10, 2026 — Convene One Liberty Plaza</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              {SESSIONS.map((session) => (
                <div key={session.title} className="schedule-card">
                  <div className="schedule-time">{session.time}</div>
                  <img src={session.image} alt={session.speaker} className="schedule-speaker-img" />
                  <div className="schedule-info">
                    <h3 className="title is-5 schedule-title">{session.title}</h3>
                    <p className="schedule-speaker-name">{session.speaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
