import * as React from "react";

/**
 * "Stay in the loop" section powered by a Constant Contact inline sign-up form
 * (same integration as the KCD Cairo landing page).
 *
 * The form markup is the inline snippet from Constant Contact
 * (<div class="ctct-inline-form" data-form-id="…">). The widget script that
 * renders it is added in the page <head> (see src/pages/index.js) together
 * with the account's universal code (_ctct_m). Both values live in
 * src/content/event-data.json under "newsletter". The section stays hidden
 * until both are filled in.
 */
export const NEWSLETTER_WIDGET_SRC =
  "https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";

export function hasNewsletterForm(newsletter) {
  return Boolean(newsletter && newsletter.constantContactFormId && newsletter.constantContactAccountId);
}

export default function NewsletterSignup({ newsletter }) {
  if (!hasNewsletterForm(newsletter)) {
    return null;
  }

  return (
    <section className="section kcd-ny-updates-section" id="updates">
      <div className="container">
        <div className="columns is-vcentered is-variable is-8">
          <div className="column is-5">
            <span className="kcd-ny-eyebrow">Stay in the loop</span>
            <h2 className="title is-2 kcd-ny-section-title">{newsletter.title || "Get KCD New York updates"}</h2>
            {newsletter.text && <p className="is-size-5 kcd-ny-lead">{newsletter.text}</p>}
          </div>
          <div className="column is-7">
            <div className="kcd-ny-updates-card">
              {/* Begin Constant Contact Inline Form Code */}
              <div className="ctct-inline-form" data-form-id={newsletter.constantContactFormId} />
              {/* End Constant Contact Inline Form Code */}
              <noscript>
                <p className="has-text-grey">Enable JavaScript to see the sign-up form.</p>
              </noscript>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
