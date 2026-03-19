const eventData = require("./src/content/event-data.json");

/**
 * @type {import('gatsby').GatsbyConfig}
 * Static site – no OpenEvent API. Content is in src/content and src/pages.
 * See https://github.com/distributethe6ix/kcd-toronto-front-end for reference.
 */
module.exports = {
  siteMetadata: {
    title: eventData.name,
    description: `${eventData.name} — ${eventData.date} at ${eventData.venue.fullAddress}.`,
    siteUrl: `https://kcdnewyork.com`,
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
