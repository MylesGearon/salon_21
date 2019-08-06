import React from "react"
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import AppContainer from '../components/AppContainer';
import styles from './index.module.scss';

export default ({data, path}) => {
  const nextConcertEdge = data.allMarkdownRemark.edges.find(({node}) => {
    return moment(node.frontmatter.datetime) > moment();
  });
  return [
    <Helmet key='Helmet'><title>Salon 21</title></Helmet>,
    <AppContainer currentPath={path} key="AppContainer">
      <Img
        className={styles.img}
        fluid={nextConcertEdge.node.frontmatter.landingPageImage.childImageSharp.fluid}
        fadeIn={true}
      />
    </AppContainer>
  ]
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
