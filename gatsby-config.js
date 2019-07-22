module.exports = {
  plugins: [
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/cms`,
        name: "cms",
      },
    },
    'gatsby-plugin-sass'
  ],
}
