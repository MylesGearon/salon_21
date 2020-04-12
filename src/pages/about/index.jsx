import React, { Fragment } from "react"
import Helmet from 'react-helmet'

import AppContainer from "../../components/AppContainer"
import styles from './index.module.scss';

const AboutPage = ({ data, path }) => {
  const page = data.allMarkdownRemark.nodes[0];
  return (
    <Fragment>
      <Helmet>
        <title>{page.frontmatter.title}</title>
      </Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.body}>
          <h1>{page.frontmatter.title}</h1>
          <div className={styles.youtubeContainer}>
            <iframe
              className={styles.youtubeIframe}
              src={`https://www.youtube.com/embed/WjxOthMQTW0`}
              frameBorder="0"
            />
          </div>
          <div className={styles.markdownWrapper} dangerouslySetInnerHTML={{__html: page.html}} />
        </div>
      </AppContainer>
    </Fragment>
  );
}

export const pageQuery = graphql`
  query aboutPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/*/cms/pages/about.md"}}) {
      nodes {
        frontmatter {
          title
        }
        html
      }
    }
  }
`;

export default AboutPage;
