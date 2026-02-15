import * as React from "react";
import Layout from "../components/layout";

const ORGANIZER_EMAIL = "new-york-org@kubernetescommunitydays.org";

/* KCD NY brand dark blue for placeholder avatars (matches speaker card style) */
const AVATAR_BG = "1a2c50";

/**
 * Placeholder avatars (initials) until real photos are added.
 * LinkedIn URLs: replace with each organizer's real profile (e.g. linkedin.com/in/username).
 */
const TEAM = [
  {
    name: "Ahmed Bebars",
    role: "Principal Engineer",
    company: "The New York Times",
    eventRole: "Finance and Budgeting, Event Planner",
    linkedin: "https://www.linkedin.com/in/ahmedbebars/",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQF0yGgn_72DQA/profile-displayphoto-shrink_800_800/B4EZNpS2QUH0Ak-/0/1732638369119?e=1772668800&v=beta&t=TIZPi_H-ZWKme2j-7DIbWn4w4EjCA6XRZ-6F-7oUKpM"
  },
  {
    name: "Cedric Clyburn",
    role: "Senior Developer Advocate ",
    company: "Red Hat",
    eventRole: "AV and Media Recording",
    linkedin: "https://www.linkedin.com/in/cedricclyburn/",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHgxZvXMUiKFQ/profile-displayphoto-crop_800_800/B4EZjz2KMpGoAI-/0/1756437718145?e=1772668800&v=beta&t=02e3-iYYXcJL_w0QS6-WWYlt43sop-ESCvj-iFRnK_Y"
  },
  {
    name: "Julia Furst Morgado",
    role: "Principal Developer Relations Engineer",
    company: "Dash0",
    eventRole: "Sponsors Support, Event Planner, Volunteers Coordination",
    linkedin: "https://www.linkedin.com/in/juliafmorgado/",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGSgvpxq1aL1A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732106483574?e=1772668800&v=beta&t=e-jfb81_DVh3hR8VAWxPGfL3BSVvCo86yp-VdqWZ5bI"
  },
  {
    name: "Kelly Revenaugh",
    role: "Community Experience Lead",
    company: "Testkube",
    eventRole: "Marketing and Promotion, Event Planner",
    linkedin: "https://www.linkedin.com/in/kellyrevenaugh/",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEnL3eM3ZS9YQ/profile-displayphoto-shrink_200_200/B4EZUmB3bpHgAc-/0/1740099778612?e=1772668800&v=beta&t=JcMjqjGDeCNvR2-tSBBpDDsUXQH9uTIuF2a_jpD_rCk"
  },
  {
    name: "Scott Rigby",
    role: "Helm project maintainer",
    company: "Replicated",
    eventRole: "Program",
    linkedin: "https://www.linkedin.com/in/scottrigby/",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGumu2mqbzeKg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722536568026?e=1772668800&v=beta&t=jlekTTb_f5mNkdOhlqD3UkSA2lMB7eWK7YTAlTq3i1g"
  },
  {
    name: "Christopher Tineo",
    role: "Senior Devops Engineer",
    company: "Game Plan Tech",
    eventRole: "Program, Event Planner, Volunteers Coordination",
    linkedin: "https://www.linkedin.com/in/christopher-tineo/",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGAwKLESo8Lrg/profile-displayphoto-scale_200_200/B4EZmpQCtaKoAY-/0/1759481181365?e=1772668800&v=beta&t=qm2Xde3s126Ru_DsrxecrPbbgxVIEeHKgW_o5E9e1u0"
  },
];

export default function TeamPage() {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Organizing Team</h1>
            <p className="subtitle">KCD New York 2026 organizers</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p className="mb-6">
            The Kubernetes Community Days New York 2026 organizing team. Reach the full team at{" "}
            <a href={`mailto:${ORGANIZER_EMAIL}`}>{ORGANIZER_EMAIL}</a>.
          </p>

          <div className="columns is-multiline is-variable is-5">
            {TEAM.map((person) => (
              <div key={person.name} className="column is-6-tablet is-4-desktop">
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
                        <span className="tag is-primary is-light">{person.eventRole}</span>
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
