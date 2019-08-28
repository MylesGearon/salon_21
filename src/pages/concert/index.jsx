import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import AppContainer from '../../components/AppContainer';

export default ({ data, path }) => {
  const {
    markdownRemark: {
      frontmatter: {
        title,
        datetime,
        ticketLink,
        location,
        landscapeImage,
        portraitImage,
        artists,
        programItems
      }
    }
  } = data;
  return (
    <Fragment>
      <Helmet><title>{title}</title></Helmet>
      <AppContainer currentPath={path}>

      </AppContainer>
    </Fragment>
  );
}

export const query = graphql`
  query concertQuery($id: String) {
    markdownRemark(id: { eq: $id}) {
      id
      html
      frontmatter {
        title
        datetime
        path
        ticketLink
        location
        landscapeImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        portraitImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        artists {
          name
          instrument
        }
        programItems {
          title
          composer
        }
      }
    }
  }
`;
