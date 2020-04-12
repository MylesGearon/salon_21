import React, { Fragment } from "react"
import Helmet from 'react-helmet'

import AppContainer from "../../components/AppContainer"
import styles from './index.module.scss';

const SupportPage = ({ data, path }) =>  {
  const page = data.allMarkdownRemark.nodes[0];
  return (
    <Fragment>
      <Helmet>
        <title>{page.frontmatter.title}</title>
      </Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.body}>
          <h1>{page.frontmatter.title}</h1>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="N7GQ27FKEVHA2" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
          <div dangerouslySetInnerHTML={{ __html: page.html}} />
        </div>
      </AppContainer>
    </Fragment>
  );
}

export const pageQuery = graphql`
  query supportPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/*/cms/pages/support.md"}}) {
      nodes {
        frontmatter {
          title
        }
        html
      }
    }
  }
`;

export default SupportPage;
