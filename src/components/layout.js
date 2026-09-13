import * as React from "react";
import { Link } from "gatsby";
import "./layout.css";
import eventData from "../content/event-data.json";
import { getEventLifecycle } from "../utils/event-lifecycle";

const NavLink = ({ to, children }) => (
  <Link to={to} className="navbar-item" activeClassName="is-active">
    {children}
  </Link>
);

/**
 * Site chrome (navbar + footer). Navigation items only appear when the matching
 * section or link is ready in src/content/event-data.json.
 */
export default function Layout({ children }) {
  const [isActive, setIsActive] = React.useState(false);
  const lifecycle = getEventLifecycle(eventData);
  const { links, previousEdition } = eventData;

  const navItems = [
    { to: "/", label: "Home", show: true },
    { to: "/schedule", label: "Schedule", show: lifecycle.showSchedule },
    { to: "/speakers", label: "Speakers", show: lifecycle.showSpeakers },
    { to: "/sponsors", label: "Sponsors", show: lifecycle.showSponsors },
    { to: "/venue", label: "Venue", show: lifecycle.showVenue },
    { to: "/team", label: "Team", show: lifecycle.showTeam },
    { to: "/code-of-conduct", label: "Code of Conduct", show: true },
    { to: "/volunteers", label: "Volunteers", show: lifecycle.showVolunteers },
  ].filter((item) => item.show);

  return (
    <div className="site">
      <nav className="navbar is-fixed-top kcd-ny-navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-text-weight-bold">
            <span className="is-hidden-touch">{eventData.name}</span>
            <span className="is-hidden-desktop">{eventData.shortName}</span>
          </Link>

          <button
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
            type="button"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            {lifecycle.isCfpOpen && (
              <a href={links.cfp} className="navbar-item" target="_blank" rel="noopener noreferrer">
                Call for Papers
              </a>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {lifecycle.isRegistrationOpen ? (
                <a
                  href={links.registration}
                  className="button kcd-ny-cta is-rounded kcd-ny-navbar-register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register
                </a>
              ) : (
                lifecycle.isComingSoon && (
                  <span className="kcd-ny-nav-badge">
                    <span className="kcd-ny-pulse" aria-hidden="true" />
                    Coming soon
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
      <footer className="footer kcd-ny-footer">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">{eventData.name}</h3>
              <p className="kcd-ny-footer-text">
                Kubernetes Community Days New York is a community-organized event bringing together the cloud native
                community. Part of the{" "}
                <a href={links.kcdProgram} target="_blank" rel="noopener noreferrer">
                  Kubernetes Community Days
                </a>{" "}
                program supported by the{" "}
                <a href={links.cncf} target="_blank" rel="noopener noreferrer">
                  CNCF
                </a>
                .
              </p>
              {previousEdition && previousEdition.url && (
                <p className="kcd-ny-footer-text">
                  <a href={previousEdition.url} target="_blank" rel="noopener noreferrer">
                    Looking for {previousEdition.name}? Visit the archive →
                  </a>
                </p>
              )}
            </div>
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">Quick Links</h3>
              <ul className="kcd-ny-footer-links">
                {navItems
                  .filter((item) => item.to !== "/")
                  .map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                {lifecycle.isSponsorProspectusVisible && (
                  <li>
                    <a href={links.sponsorProspectus} target="_blank" rel="noopener noreferrer">
                      Sponsor Prospectus
                    </a>
                  </li>
                )}
                {lifecycle.isRegistrationOpen && (
                  <li>
                    <a href={links.registration} target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </li>
                )}
                {lifecycle.isCfpOpen && (
                  <li>
                    <a href={links.cfp} target="_blank" rel="noopener noreferrer">
                      Call for Papers
                    </a>
                  </li>
                )}
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookie-policy">Cookie Policy</Link>
                </li>
              </ul>
            </div>
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">Contact</h3>
              {links.organizerEmail && (
                <p className="kcd-ny-footer-text">
                  <a href={`mailto:${links.organizerEmail}`}>{links.organizerEmail}</a>
                </p>
              )}
              {lifecycle.hasContactEmail && (
                <p className="kcd-ny-footer-text">
                  <a href={`mailto:${links.email}`}>{links.email}</a>
                </p>
              )}
              {lifecycle.hasLinkedIn && (
                <p className="kcd-ny-footer-text">
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </p>
              )}
              {lifecycle.hasTwitter && (
                <p className="kcd-ny-footer-text">
                  <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </p>
              )}
              {lifecycle.hasFlickr && (
                <p className="kcd-ny-footer-text">
                  <a href={links.flickr} target="_blank" rel="noopener noreferrer">
                    Photos on Flickr
                  </a>
                </p>
              )}
            </div>
          </div>
          <div className="has-text-centered kcd-ny-footer-copy">
            <p>
              © {new Date().getFullYear()} KCD New York. Part of the CNCF Kubernetes Community Days program. Kubernetes
              and the Kubernetes logo are trademarks of The Linux Foundation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
