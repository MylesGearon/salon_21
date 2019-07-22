import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image"

import styles from './nav.module.scss';

const handleAdminClick = () => {
  console.log(netlifyIdentity.currentUser());
  if (netlifyIdentity.currentUser()) {
    window.location.href = `${window.location.origin}/admin`;
  } else {
    netlifyIdentity.open();
  }
}

const Nav = props => {
  useEffect(() => {
    netlifyIdentity.init({container: '#identity-service'});
  }, [null])

  return (
    <div className={styles.container}>
      <Img fluid={props.file.childImageSharp.fluid} />
      <div>Link</div>
      <div>Link</div>
      <div>Link</div>
      <button id="identity-service" onClick={handleAdminClick}>Login with Netlify Identity</button>
      <div className={styles.emailContainer}>
        <input placeholder="Email" />
        <button >Signup</button>
      </div>
    </div>
  );
}

export default () => (
  <StaticQuery query={graphql`
      query {
        file(relativePath: { eq: "detail_-3.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={Nav}
  />
);
