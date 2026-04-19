import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";

const SESSIONS = [
];

export const Head = () => (
  <Seo title="Schedule" description="Full event schedule for KCD New York 2026. Join us for technical talks and networking." />
);

export default function SchedulePage() {
  const scheduleAnnouncementDate = eventData.keyDates.find(d => d.label === "Schedule Announced")?.date;

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
        <div className="container has-text-centered">
          <div className="notification is-light">
            <h2 className="title is-4">Schedule Coming Soon!</h2>
            <p className="is-size-5">
              The full event schedule will be announced on <strong>{scheduleAnnouncementDate}</strong>.
            </p>
            <p className="mt-4">
              Stay tuned for exciting talks and workshops from the cloud native community.
            </p>
          </div>

          <div className="columns is-centered mt-6">
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
