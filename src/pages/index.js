import React, { useEffect, Fragment } from "react"
import _ from 'lodash';
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import moment from "moment"
import { Helmet } from "react-helmet"
import { FiChevronsRight } from 'react-icons/fi';

import AppContainer from "../components/AppContainer"
import styles from "./index.module.scss"

export default ({ data, path }) => {
  const concerts = data.allMarkdownRemark.edges.map(edge => edge.node);
  const futureConcerts = concerts.filter((node) => moment(node.frontmatter.datetime).isAfter()); //defaults to isAfter current time
  const nextConcert = _.minBy(futureConcerts, (node) => (moment(node.frontmatter.datetime)));

  const {
    frontmatter: {
      title,
      portraitImage,
      landscapeImage,
      artists,
      datetime,
      locationTitle,
      ticketLink
    }
  } = nextConcert;
  console.log(title);

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
          <Link to={`concerts/${nextConcert.frontmatter.path}`}>
            <div className={styles.info}>
              <h1 className={styles.title}>{title}</h1>
            </div>
          </Link>
          <h2 className={styles.buyLink}>Details</h2>
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
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            portraitImage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
