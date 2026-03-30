import * as React from "react";
import Layout from "../components/layout";
import eventData from "../content/event-data.json";

export default function VolunteersPage() {
  const volunteerFormUrl = "https://tally.so/embed/RGRQAd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

  return (
    <Layout>
      <section className="hero is-primary kcd-ny-hero">
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
              </div>

              <div className="box p-0" style={{ overflow: "hidden", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <iframe
                  src={volunteerFormUrl}
                  width="100%"
                  height="800"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="KCD New York Volunteer Registration"
                  style={{ border: "none" }}
                />
              </div>
              
              <div className="mt-6 has-text-centered">
                <p className="has-text-grey">
                  Having trouble with the form? {" "}
                  <a 
                    href={eventData.links.volunteerForm} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-secondary)", fontWeight: 600 }}
                  >
                    Open it in a new window
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
