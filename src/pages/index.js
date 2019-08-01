import React from "react"
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';

import AppContainer from '../components/AppContainer';
import styles from './index.module.scss';

export default ({data}) => {
  const nextConcertEdge = data.allMarkdownRemark.edges.find(({node}) => {
    return moment(node.frontmatter.datetime) > moment();
  });
  return (
    <AppContainer>
      <Img
        className={styles.img}
        fluid={nextConcertEdge.node.frontmatter.landingPageImage.childImageSharp.fluid}
        fadeIn={true}
      />
    </AppContainer>
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
