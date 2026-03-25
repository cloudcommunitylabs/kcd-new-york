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

  return {
    isCfpOpen,
    isRegistrationOpen,
    isSponsorProspectusVisible,
    now
  };
};
