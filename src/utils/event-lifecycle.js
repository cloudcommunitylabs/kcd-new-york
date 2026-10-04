/**
 * Derives which parts of the site are ready to show from src/content/event-data.json.
 *
 * Rules of thumb (same approach as the KCD Cairo landing page):
 *  - A link that is an empty string means "not ready yet"; the matching button stays hidden.
 *  - `sections.*` toggles whole sections and pages. Pages whose section is off are
 *    removed from the build in gatsby-node.js so nothing half-finished leaks out.
 *  - Date-driven behaviour (countdown, "event is over", CFP closing) only kicks in
 *    once `date.iso` / the relevant key date is filled in.
 *
 * Written as CommonJS so both gatsby-node.js (Node) and the React pages (webpack) can use it.
 */
const hasValue = (value) => typeof value === "string" && value.trim().length > 0;

const parseDate = (value) => {
  if (!hasValue(value)) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

function getEventLifecycle(eventData, now = new Date()) {
  const links = eventData.links || {};
  const sections = eventData.sections || {};
  const date = eventData.date || {};
  const venue = eventData.venue || {};
  const keyDates = Array.isArray(eventData.keyDates) ? eventData.keyDates : [];
  const previousEdition = eventData.previousEdition || null;

  const eventDate = parseDate(date.iso);
  const hasExactDate = Boolean(eventDate);

  // Event is over the day after the event date (keeps the site "live" on the day itself).
  let isEventOver = false;
  if (eventDate) {
    const dayAfterEvent = new Date(eventDate);
    dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);
    isEventOver = now > dayAfterEvent;
  }

  // CFP is open when a link exists and, if a "CFP Closes" key date is set, we are before it.
  const cfpCloseDate = parseDate((keyDates.find((d) => d.label === "CFP Closes") || {}).date);
  const isCfpOpen = hasValue(links.cfp) && (!cfpCloseDate || now < cfpCloseDate);

  const hasSessionize = hasValue(links.sessionizeId);

  return {
    now,
    isComingSoon: eventData.status === "coming-soon",
    isEventOver,
    hasExactDate,
    eventDate,
    hasVenue: hasValue(venue.name),

    isCfpOpen,
    isRegistrationOpen: hasValue(links.registration),
    isSponsorProspectusVisible: hasValue(links.sponsorProspectus),
    isVolunteerFormVisible: hasValue(links.volunteerForm),
    hasVenueMap: hasValue(links.venueMap),
    hasContactEmail: hasValue(links.email),
    hasLinkedIn: hasValue(links.linkedin),
    hasTwitter: hasValue(links.twitter),
    hasFlickr: hasValue(links.flickr),
    hasAnySocial: hasValue(links.linkedin) || hasValue(links.twitter),

    // Sessionize embeds
    hasSessionize,
    isScheduleLive: sections.schedule === true && hasSessionize,
    useSessionizeSpeakers: sections.speakers === true && hasSessionize,

    // Sections / pages
    showAbout: sections.about !== false,
    showGetInvolved: sections.getInvolved !== false,
    showKeyDates: sections.keyDates === true && keyDates.length > 0,
    showRecap: sections.recap === true && Boolean(previousEdition),
    showSchedule: sections.schedule === true,
    showSpeakers: sections.speakers === true,
    showPreviousSpeakers: sections.previousSpeakers === true,
    showSponsors: sections.sponsors === true,
    showPreviousSponsors: sections.previousSponsors === true,
    showVenue: sections.venue === true && hasValue(venue.name),
    showTeam: sections.team === true,
    showVolunteers: sections.volunteers === true && hasValue(links.volunteerForm),
    showGallery: sections.gallery === true,
  };
}

/**
 * Map of page paths to the lifecycle flag that must be true for the page to be built.
 * Used by gatsby-node.js. Pages not listed here are always built.
 */
const GATED_PAGES = {
  "/schedule/": "showSchedule",
  "/speakers/": "showSpeakers",
  "/previous-speakers/": "showPreviousSpeakers",
  "/sponsors/": "showSponsors",
  "/venue/": "showVenue",
  "/team/": "showTeam",
  "/volunteers/": "showVolunteers",
};

module.exports = { getEventLifecycle, GATED_PAGES, hasValue };
