import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { FiChevronsLeft } from 'react-icons/fi';
import moment from 'moment';
import showdown from 'showdown';

import AppContainer from '../../components/AppContainer';
import DateContainer from '../../components/DateContainer';
import styles from './index.module.scss';

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
        programItems,
        programNotes
      }
    }
  } = data;

  const parsedDate = moment(datetime);

  const markdownParser = new showdown.Converter();
  const programNotesHtml = markdownParser.makeHtml(programNotes);
  console.log(programNotes)
  console.log(programNotesHtml)

  return (
    <Fragment>
      <Helmet><title>{title}</title></Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.imgContainer}>
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
          <div className={styles.titlePositioner}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.locationInfo}>
            <DateContainer date={parsedDate} />
            <p className={styles.timeAndLocation}>{parsedDate.format('h:sA')} at {location}</p>
          </div>
          <div className={styles.concertInfo}>
            <div className={styles.artistsContainer}>
              <h3>Artists</h3>
              {artists.map(artist => <h5>{artist.name}, <i>{artist.instrument}</i></h5>)}
            </div>
            <div className={styles.programContainer}>
              <h3>Program</h3>
              {
                programItems.length == 0 || programItems[0].title.toLowerCase() == 'tba' ?
                  <h5>TBA</h5> :
                  programItems.map(programItem => <h5>{programItem.title}, {programItem.composer}</h5>)
              }
            </div>
          </div>
          <div className={styles.programNotes}>
            <h2 className={styles.programNotesTitle}>Program Notes</h2>
            <div className={styles.programNotesText} dangerouslySetInnerHTML={{__html: programNotesHtml}} />
          </div>
        </div>
        <div className={styles.buyButtonFooter}>
          <Link to="/concerts" className={styles.concertsLink}>
            <FiChevronsLeft />
            <h4 className={styles.concertsLinkText}>View All<br />Concerts</h4>
          </Link>
          <a href={ticketLink} target="_blank" className={styles.buyLink}>
            <button className={styles.buyButton}>
              Buy Now
            </button>
          </a>
        </div>
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
        programNotes
      }
    }
  }
`;
