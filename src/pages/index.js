import React from "react"
import { graphql } from 'gatsby';

import Nav from '../components/nav';

export default props => {
  console.log(props);
  return (
    <div>
      <Nav />
    </div>
  )
};

export const pageQuery = graphql`
  query concerts {
    allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/*/concerts/**/*"}}) {
      edges {
        node {
          frontmatter {
            title
            datetime
            landingPageImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
