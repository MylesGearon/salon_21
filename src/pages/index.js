import React, { Fragment } from "react"
import _ from 'lodash';
import { graphql } from "gatsby"
import Img from "gatsby-image"
import moment from "moment"
import { Helmet } from "react-helmet"

import AppContainer from "../components/AppContainer"
import styles from "./index.module.scss"

export default ({ data, path }) => {
  const nextConcert = _.maxBy(data.allMarkdownRemark.edges, ({ node }) => (
    moment(node.frontmatter.datetime)
  ));

  return (
    <Fragment>
      <Helmet key="Helmet">
        <title>Salon 21</title>
      </Helmet>
      <AppContainer currentPath={path} key="AppContainer">
        <Img
          className={styles.img}
          fluid={[
            nextConcert.node.frontmatter.portraitImage.childImageSharp.fluid,
            {
              ...nextConcert.node.frontmatter.landscapeImage.childImageSharp.fluid,
              media: '(min-width: 900px)'
            }
          ]}
          fadeIn={true}
        />
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
