import * as React from "react";

/**
 * "Stay in the loop" section powered by a Constant Contact inline sign-up form.
 *
 * The form markup is the inline snippet from Constant Contact
 * (<div class="ctct-inline-form" data-form-id="…">). Constant Contact's
 * "universal code" (the _ctct_m account id plus the widget script) is injected
 * from a client-side effect rather than from the Gatsby <Head>: Gatsby re-applies
 * Head elements on hydration, which runs the widget script twice ("Universal
 * code snippet was installed more than once") and leaves the form empty.
 * Loading it once, after hydration, lets the widget find the inline div and render.
 *
 * Both values live in src/content/event-data.json under "newsletter". The
 * section stays hidden until both are filled in.
 */
export const NEWSLETTER_WIDGET_SRC =
  "https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";

export function hasNewsletterForm(newsletter) {
  return Boolean(newsletter && newsletter.constantContactFormId && newsletter.constantContactAccountId);
}

function loadWidget(accountId) {
  if (typeof window === "undefined") return;
  window._ctct_m = accountId;
  if (document.getElementById("signupScript")) return; // already injected (client-side navigation)
  const script = document.createElement("script");
  script.id = "signupScript";
  script.src = NEWSLETTER_WIDGET_SRC;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

export default function NewsletterSignup({ newsletter }) {
  const ready = hasNewsletterForm(newsletter);

  React.useEffect(() => {
    if (!ready) return;
    loadWidget(newsletter.constantContactAccountId);
  }, [ready, newsletter]);

  if (!ready) {
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
