import * as React from "react";
import { useState } from "react";
import Layout from "../components/layout";
import MapEmbed from "../components/MapEmbed";

const VENUE = "Convene One Liberty Plaza";
const ADDRESS = "1 Liberty St, New York, NY 10006";
const EVENT_DATE = "June 10, 2026";
const INTERACTIVE_MAP_URL = "https://kcdnewyork2026.expofp.com/";

export default function VenuePage() {
  const [activeTab, setActiveTab] = useState("subway");

  return (
    <Layout>
      {/* Hero Section with Venue Background */}
      <section
        className="hero is-medium"
        style={{
          backgroundImage: "url('/img/convene-interior-01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="hero-body">
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(26, 44, 80, 0.75)",
            zIndex: 0
          }} />
          <div className="container has-text-centered" style={{ position: "relative", zIndex: 1 }}>
            <h1 className="title is-1 has-text-white">Venue</h1>
            <p className="subtitle is-3 has-text-white">
              {VENUE} — Heart of Lower Manhattan
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ color: "#1a2c50" }}>Explore the Event Layout</h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Navigate our interactive floor plan to plan your day
          </p>
          <MapEmbed
            src={INTERACTIVE_MAP_URL}
            title="KCD NY 2026 Interactive Event Floor Plan"
            height={600}
          />
        </div>
      </section>

      {/* About the Venue Section */}
      <section className="section" style={{ background: "#f9f9f9" }}>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-6">
              <h2 className="title is-3">About Convene One Liberty Plaza</h2>
              <div className="content is-size-5" style={{ lineHeight: "1.8" }}>
                <p>
                  Located in the heart of Manhattan's Financial District, Convene One Liberty Plaza offers
                  a premium conference experience with cutting-edge technology and elegant design. The venue
                  features modern AV equipment, high-speed WiFi, and flexible event spaces perfect for
                  technical talks and networking.
                </p>
                <p>
                  Our venue is fully accessible and equipped with all the amenities needed for a world-class
                  technology conference. From the main auditorium to breakout rooms and networking lounges,
                  every space is designed to facilitate learning and collaboration.
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <a
                    href="https://maps.app.goo.gl/oWPRrwrqbjfiqxh29"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-secondary)", fontWeight: 600 }}
                  >
                    {ADDRESS}
                  </a>
                </p>
              </div>
            </div>
            <div className="column is-6">
              <figure className="image">
                <img
                  src="/img/convene-conference-room-01.jpg"
                  alt="Convene One Liberty Plaza conference space interior"
                  style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23f5f5f5' width='600' height='400'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='18'%3EConference Space Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There Section with Tabs */}
      <section className="section" style={{ background: "white", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ color: "#1a2c50" }}>Getting There</h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Convene One Liberty Plaza is easily accessible by public transportation
          </p>

          <div className="kcd-ny-transit-tabs">
            <div className="tabs is-centered is-large">
              <ul>
                <li className={activeTab === "subway" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("subway")} role="button" tabIndex={0}>
                    <span className="kcd-ny-transit-icon">🚇</span>
                    Subway
                  </a>
                </li>
                <li className={activeTab === "path" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("path")} role="button" tabIndex={0}>
                    <span className="kcd-ny-transit-icon">🚈</span>
                    PATH Train
                  </a>
                </li>
                <li className={activeTab === "car" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("car")} role="button" tabIndex={0}>
                    <span className="kcd-ny-transit-icon">🚗</span>
                    Parking
                  </a>
                </li>
                <li className={activeTab === "accessibility" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("accessibility")} role="button" tabIndex={0}>
                    <span className="kcd-ny-transit-icon">♿</span>
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            <div className="kcd-ny-transit-content">
              {activeTab === "subway" && (
                <div>
                  <h3 className="title is-4" style={{ color: "var(--color-primary)" }}>
                    By Subway
                  </h3>
                  <div className="content is-size-5">
                    <p>
                      <strong>Lines:</strong> 2, 3, 4, 5, A, C, E, J, Z, R, W
                    </p>
                    <p>
                      <strong>Nearby Stations:</strong>
                    </p>
                    <ul>
                      <li><strong>Fulton Street</strong> (2, 3, 4, 5, A, C, J, Z) — 3 minutes walk</li>
                      <li><strong>Wall Street</strong> (4, 5) — 5 minutes walk</li>
                      <li><strong>Cortlandt Street</strong> (R, W) — 2 minutes walk</li>
                      <li><strong>World Trade Center</strong> (E) — 4 minutes walk</li>
                    </ul>
                    <p>
                      With over 12 subway lines serving the area, getting to KCD NY 2026 is convenient
                      from anywhere in the five boroughs.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "path" && (
                <div>
                  <h3 className="title is-4" style={{ color: "var(--color-primary)" }}>
                    By PATH Train
                  </h3>
                  <div className="content is-size-5">
                    <p>
                      <strong>Station:</strong> World Trade Center
                    </p>
                    <p>
                      <strong>Walking Time:</strong> 3 minutes
                    </p>
                    <p>
                      The World Trade Center PATH station connects New Jersey (Newark, Hoboken, Jersey City)
                      directly to Lower Manhattan. Exit the station and walk south on Church Street, then
                      turn left onto Liberty Street. Convene One Liberty Plaza will be on your right.
                    </p>
                    <p>
                      <strong>Lines:</strong> Newark–World Trade Center, Hoboken–World Trade Center
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "car" && (
                <div>
                  <h3 className="title is-4" style={{ color: "var(--color-primary)" }}>
                    Parking & Driving
                  </h3>
                  <div className="content is-size-5">
                    <p>
                      <strong>Nearby Parking Garages:</strong>
                    </p>
                    <ul>
                      <li><strong>One Liberty Plaza Parking</strong> — 165 Broadway, New York, NY 10006</li>
                      <li><strong>Liberty Parking</strong> — 123 Washington St, New York, NY 10006</li>
                      <li><strong>85 Broad Street Garage</strong> — 85 Broad St, New York, NY 10004</li>
                    </ul>
                    <p>
                      <strong>Note:</strong> Parking in Lower Manhattan can be expensive ($30-50/day).
                      We strongly encourage using public transportation when possible.
                    </p>
                    <p>
                      <strong>For GPS Navigation:</strong> Enter "1 Liberty Street, New York, NY 10006"
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "accessibility" && (
                <div>
                  <h3 className="title is-4" style={{ color: "var(--color-primary)" }}>
                    Accessibility
                  </h3>
                  <div className="content is-size-5">
                    <p>
                      <strong>Wheelchair Accessible:</strong> Yes — all entrances and event spaces
                    </p>
                    <p>
                      <strong>Accessible Transit Options:</strong>
                    </p>
                    <ul>
                      <li>Fulton Street Station (2, 3, 4, 5, A, C) — Elevator access available</li>
                      <li>World Trade Center Station (E) — Fully accessible with elevators</li>
                      <li>World Trade Center PATH — Fully accessible station</li>
                    </ul>
                    <p>
                      <strong>Additional Accommodations:</strong>
                    </p>
                    <ul>
                      <li>Quiet room available for attendees who need a break</li>
                      <li>Reserved seating available upon request</li>
                      <li>Live captioning for all sessions</li>
                      <li>Service animals welcome</li>
                    </ul>
                    <p>
                      <strong>Need Additional Accommodations?</strong> Contact us at{" "}
                      <a href="mailto:info@kcdnewyork.com" style={{ color: "var(--color-secondary)", fontWeight: 600 }}>
                        info@kcdnewyork.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <h2 className="title is-3 has-text-centered">Location Map</h2>
          <div style={{ marginTop: "2rem" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2918719304807!2d-74.01296368459395!3d40.7096636793306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x2cb2ddf003b00e8c!2s1%20Liberty%20St%2C%20New%20York%2C%20NY%2010006!5e0!3m2!1sen!2sus!4v1645564318234!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps showing Convene One Liberty Plaza location"
            />
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="section" style={{ background: "#f9f9f9", padding: "4rem 1.5rem" }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ color: "#1a2c50" }}>Nearby Amenities</h2>
          <p className="subtitle is-5 has-text-centered has-text-grey" style={{ marginBottom: "3rem" }}>
            Everything you need is just minutes away
          </p>

          <div className="columns">
            <div className="column is-4">
              <div className="kcd-ny-amenity-card">
                <h3 className="kcd-ny-amenity-title">🏨 Hotels</h3>
                <ul className="kcd-ny-amenity-list">
                  <li>
                    <strong>Club Quarters World Trade Center</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>0.2 miles away</span>
                  </li>
                  <li>
                    <strong>Conrad New York Downtown</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>0.3 miles away</span>
                  </li>
                  <li>
                    <strong>Hotel Indigo Lower East Side</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>1.5 miles away</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="column is-4">
              <div className="kcd-ny-amenity-card">
                <h3 className="kcd-ny-amenity-title">☕ Food & Coffee</h3>
                <ul className="kcd-ny-amenity-list">
                  <li>
                    <strong>Blue Bottle Coffee</strong> — World Trade Center
                  </li>
                  <li>
                    <strong>Eataly Downtown</strong> — 4 World Trade Center
                  </li>
                  <li>
                    <strong>Hudson Eats</strong> — Brookfield Place
                  </li>
                  <li>
                    <strong>Starbucks Reserve</strong> — Multiple locations nearby
                  </li>
                </ul>
              </div>
            </div>

            <div className="column is-4">
              <div className="kcd-ny-amenity-card">
                <h3 className="kcd-ny-amenity-title">🗽 Attractions</h3>
                <ul className="kcd-ny-amenity-list">
                  <li>
                    <strong>9/11 Memorial & Museum</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>5 minutes walk</span>
                  </li>
                  <li>
                    <strong>One World Observatory</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>6 minutes walk</span>
                  </li>
                  <li>
                    <strong>Battery Park</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>10 minutes walk</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
