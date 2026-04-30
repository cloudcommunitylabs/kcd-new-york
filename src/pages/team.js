import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import eventData from "../content/event-data.json";
import teamData from "../content/team.json";

const ORGANIZER_EMAIL = "new-york-org@kubernetescommunitydays.org";

export const Head = () => (
  <Seo title="Team" description="Meet the organizing team behind KCD New York 2026." />
);

export default function TeamPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Organizing Team</h1>
            <p className="subtitle">{eventData.name} organizers</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p className="mb-6">
            The {eventData.name} organizing team. Reach the full team at{" "}
            <a href={`mailto:${ORGANIZER_EMAIL}`}>{ORGANIZER_EMAIL}</a>.
          </p>

          <div className="columns is-multiline is-variable is-5">
            {teamData.map((person) => (
              <div key={person.id} className="column is-6-tablet is-4-desktop">
                <div className="card kcd-ny-speaker-card">
                  <div className="card-image kcd-ny-card-image">
                    <figure className="image kcd-ny-avatar-circle">
                      <img src={person.image} alt={person.name} />
                    </figure>
                  </div>
                  <div className="card-content kcd-ny-card-content">
                    <p className="title is-5 kcd-ny-organizer-name mb-5">{person.name}</p>
                    <p className="subtitle is-6 kcd-ny-organizer-role mb-2">{person.role}</p>
                    {person.company && (
                      <p className="is-size-6 kcd-ny-organizer-company mb-3">{person.company}</p>
                    )}
                    {person.eventRole && (
                      <p className="is-size-7 has-text-weight-semibold has-text-grey mb-3">
                        <span className="tag is-primary is-light" style={{ whiteSpace: 'normal', height: 'auto', padding: '0.5rem' }}>
                          {person.eventRole}
                        </span>
                      </p>
                    )}
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kcd-ny-linkedin-link"
                        aria-label={`${person.name} on LinkedIn`}
                      >
                        <span className="kcd-ny-linkedin-icon" aria-hidden>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
