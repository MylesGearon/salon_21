import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import AppContainer from '../../components/AppContainer';
import styles from './index.module.scss';
import ConcertCard from './ConcertCard';

const ConcertIndex = ({ data, path }) => {
  return (
    <Fragment>
      <Helmet><title>Concerts</title></Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.header}>
          <h1>CONCERTS</h1>
          <select className={styles.jumpTo}>
            <option>Sep 2019</option>
            <option>Oct 2019</option>
            <option>Nov 2019</option>
          </select>
        </div>
        {data.allMarkdownRemark.edges.map(edge => <ConcertCard key={edge} concert={edge} />)}
      </AppContainer>
    </Fragment>
  );
};

export const pageQuery = graphql`
  query concertsIndex {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/*/concerts/**/*" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            datetime
            artists
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
`

export default ConcertIndex;
