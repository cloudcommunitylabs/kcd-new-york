import * as React from "react";
import { Link } from "gatsby";
import "./layout.css";

const EVENT_DATE = "June 10, 2026";
const VENUE = "Convene One Liberty Plaza";
const ADDRESS = "1 Liberty St, New York, NY 10006";

const NavLink = ({ to, children }) => (
  <Link to={to} className="navbar-item" activeClassName="is-active">
    {children}
  </Link>
);

export default function Layout({ children, title }) {
  return (
    <div className="site">
      <nav className="navbar is-fixed-top kcd-ny-navbar" role="navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-text-weight-bold">
            KCD New York 2026
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/">Home</NavLink>
            {/* <NavLink to="/about">About</NavLink> */}
            {/* <NavLink to="/schedule">Schedule</NavLink> */}
            {/* <NavLink to="/speakers">Speakers</NavLink> */}
            <NavLink to="/sponsors">Sponsors</NavLink>
            <NavLink to="/venue">Venue</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/code-of-conduct">Code of Conduct</NavLink>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
      <footer className="footer kcd-ny-footer">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">KCD New York 2026</h3>
              <p className="kcd-ny-footer-text">
                Kubernetes Community Days New York is a community-organized event bringing together the cloud native community.
              </p>
            </div>
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">Quick Links</h3>
              <ul className="kcd-ny-footer-links">
                {/* <li><Link to="/about">About</Link></li> */}
                {/* <li><Link to="/speakers">Speakers</Link></li> */}
                <li><Link to="/sponsors">Sponsors</Link></li>
                <li><Link to="/venue">Venue</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/code-of-conduct">Code of Conduct</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              </ul>
            </div>
            <div className="column is-4">
              <h3 className="title is-6 kcd-ny-footer-heading">Contact</h3>
              <p className="kcd-ny-footer-text">
                <a href="mailto:new-york-org@kubernetescommunitydays.org">new-york-org@kubernetescommunitydays.org</a>
              </p>
              <p className="kcd-ny-footer-text">
                <a href="mailto:info@kcdnewyork.com">info@kcdnewyork.com</a>
              </p>
            </div>
          </div>
          <div className="has-text-centered kcd-ny-footer-copy">
            <p>© {new Date().getFullYear()} KCD New York. Part of the CNCF Kubernetes Community Days program.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
