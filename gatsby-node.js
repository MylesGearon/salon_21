const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/*/concerts/**/*" } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const concerts = result.data.allMarkdownRemark.edges;

    concerts.forEach(edge => {
      console.log(`concerts/${_.snakeCase(edge.node.frontmatter.title)}`)
      console.log(edge)
      const id = edge.node.id
      createPage({
        path: `concerts/${_.snakeCase(edge.node.frontmatter.title)}`,
        component: path.resolve('src/templates/concert.jsx'),
        context: { title: edge.node.frontmatter.title },
      })
    });
  })
};


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
};
