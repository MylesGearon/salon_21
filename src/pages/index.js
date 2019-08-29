import React, { useEffect, Fragment } from "react"
import _ from 'lodash';
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import moment from "moment"
import { Helmet } from "react-helmet"
import { FiChevronsRight } from 'react-icons/fi';
import fitty from 'fitty';

import AppContainer from "../components/AppContainer"
import styles from "./index.module.scss"

export default ({ data, path }) => {
  const nextConcert = _.maxBy(data.allMarkdownRemark.edges, ({ node }) => (
    moment(node.frontmatter.datetime)
  ));

  const {
    node: {
      frontmatter: {
        title,
        portraitImage,
        landscapeImage,
        artists,
        datetime,
        locationTitle,
        ticketLink
      }
    }
  } = nextConcert;

  useEffect(() => {
    fitty(`.${styles.location}`);
  });

  return (
    <Fragment>
      <Helmet>
        <title>Salon 21</title>
      </Helmet>
      <AppContainer currentPath={path}>
        <Img
          className={styles.img}
          fluid={[
            portraitImage.childImageSharp.fluid,
            {
              ...landscapeImage.childImageSharp.fluid,
              media: '(min-width: 900px)'
            }
          ]}
          fadeIn={true}
        />
        <div className={styles.titleContainer}>
          <Link to={`concerts/${nextConcert.node.frontmatter.path}`}>
            <div className={styles.info}>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.subtitle}>
                <i className={styles.artists}>{artists.map(artist => artist.name).join(' & ')}</i>
                <br />
                <i className={styles.location}>{moment(datetime).format('MM/DD/YY')} at {locationTitle}</i>
                <br />
              </div>
              <i className={styles.detailsIndicator}>details<FiChevronsRight /></i>
            </div>
          </Link>
          <a target="_blank" href={ticketLink} className={styles.buyLink}>
            <h2 className={styles.buyText}>Buy<br />Tickets</h2>
          </a>
        </div>
      </AppContainer>
    </Fragment>
  );
}

export const pageQuery = graphql`
  query landingPage {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/*/concerts/**/*" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            datetime
            artists {
              name
              instrument
            }
            ticketLink
            locationTitle
            path
            landscapeImage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            portraitImage {
              childImageSharp {
                fluid(quality: 100) {
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
