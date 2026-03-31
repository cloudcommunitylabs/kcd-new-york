import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";

export default function VolunteersPage() {
  const volunteerFormUrl = eventData.links.volunteerForm;

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">Join the Team</h1>
            <p className="subtitle is-3">Volunteers & Community Helpers</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="content is-size-5 mb-6">
                <p>
                  To us, <strong>volunteers are the heart of the community</strong> and the future of our organizing team. 
                  We’re looking for a few dedicated people to join the engine room of this event.
                </p>
                <p>
                  Since spots are limited, we want to get to know the "real you." Use the form below to tell us why 
                  you’re excited to jump in and what unique energy you’ll bring to the New York scene.
                </p>
                
                <div className="has-text-centered mt-5">
                  <a 
                    href={volunteerFormUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button kcd-ny-cta is-large is-rounded is-fullwidth-mobile"
                  >
                    Fill Out Volunteer Form
                  </a>
                </div>
              </div>

              <div className="mt-6 has-text-centered">
                <p className="has-text-grey">
                  Questions? {" "}
                  <a 
                    href="mailto:new-york-org@kubernetescommunitydays.org"
                    style={{ color: "var(--color-secondary)", fontWeight: 600 }}
                  >
                    Contact the organizers
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
