const eventData = require("./src/content/event-data.json");

/**
 * @type {import('gatsby').GatsbyConfig}
 * Static site – no OpenEvent API. Content is in src/content and src/pages.
 * Everything visible on the site is driven by src/content/event-data.json.
 */
const siteUrl = process.env.GATSBY_SITE_URL || "https://kcdnewyork.com";

const where = eventData.venue && eventData.venue.name ? eventData.venue.fullAddress || eventData.venue.name : eventData.venue.city;

module.exports = {
  siteMetadata: {
    title: eventData.name,
    description: `${eventData.name} — ${eventData.date.display} in ${where}. ${eventData.tagline}`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {},
    },
  ],
};
