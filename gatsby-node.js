const eventData = require("./src/content/event-data.json");
const { getEventLifecycle, GATED_PAGES } = require("./src/utils/event-lifecycle");

/**
 * Pages whose section is switched off in src/content/event-data.json are removed
 * from the build, so a half-empty Schedule or Speakers page never goes live.
 * Flip the matching `sections.*` flag (and fill in the data it needs) to bring a page back.
 */
exports.onCreatePage = ({ page, actions, reporter }) => {
  const flag = GATED_PAGES[page.path];
  if (!flag) return;

  const lifecycle = getEventLifecycle(eventData);
  if (!lifecycle[flag]) {
    reporter.info(`[event-data] Skipping ${page.path} (sections flag "${flag}" is off)`);
    actions.deletePage(page);
  }
};
