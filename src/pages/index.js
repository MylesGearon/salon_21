import React from "react"
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';

import Nav from '../components/nav';
import navStyles from '../components/nav.module.scss';

export default ({data}) => {
  const nextConcertEdge = data.allMarkdownRemark.edges.find(({node}) => {
    return moment(node.frontmatter.datetime) > moment();
  });
  return (
    <div>
      <Nav />
      <Img
        fluid={nextConcertEdge.node.frontmatter.landingPageImage.childImageSharp.fluid}
        fadeIn={true}
        className={navStyles.backgroundImage}
      />
    </div>
  )
};

export const pageQuery = graphql`
  query concerts {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "**/*/concerts/**/*"}}
      sort: { fields: frontmatter___datetime, order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
            datetime
            landingPageImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
