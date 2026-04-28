export const getEventLifecycle = (eventData) => {
  const now = new Date();

  const keyDates = eventData.keyDates || [];

  // Find CFP close date from keyDates
  const cfpCloseDateStr = keyDates.find(d => d.label === "CFP Closes")?.date;
  const cfpCloseDate = cfpCloseDateStr ? new Date(cfpCloseDateStr) : null;

  // CFP is open if current date is before close date
  const isCfpOpen = cfpCloseDate && now < cfpCloseDate;

  // Registration is controlled by feature flag and must have a link
  const isRegistrationOpen = eventData.features?.registrationEnabled && eventData.links?.registration;

  // Sponsor prospectus visibility
  const isSponsorProspectusVisible = eventData.features?.showSponsorProspectus && eventData.links?.sponsorProspectus;

  // Previous speakers visibility
  const isShowPreviousSpeakersVisible = eventData.features?.showPreviousSpeakers;

  // Sessionize status
  const isScheduleLive = eventData.features?.useSessionizeSchedule;
  const useSessionizeSpeakers = eventData.features?.useSessionizeSpeakers;

  // Event is over if current date is after the event date
  const eventDate = new Date(eventData.date);
  // Add 1 day to the event date to ensure it stays "live" during the actual day
  const dayAfterEvent = new Date(eventDate);
  dayAfterEvent.setDate(eventDate.getDate() + 1);
  const isEventOver = now > dayAfterEvent;

  return {
    isCfpOpen,
    isRegistrationOpen,
    isSponsorProspectusVisible,
    isShowPreviousSpeakersVisible,
    isScheduleLive,
    useSessionizeSpeakers,
    isEventOver,
    now
  };
};
