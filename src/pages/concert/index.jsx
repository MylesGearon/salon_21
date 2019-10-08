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
        locationTitle,
        address1,
        address2,
        landscapeImage,
        portraitImage,
        artists,
        programItems,
        sponsors,
        programNotes
      }
    }
  } = data;

  const parsedDate = moment(datetime);

  const markdownParser = new showdown.Converter();
  const programNotesHtml = markdownParser.makeHtml(programNotes);
  const showBuyButton = parsedDate.isAfter();
  console.log(showBuyButton)

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
        <div className={styles.bodyContainer}>
          <div className={styles.body}>
            <div className={styles.locationCol}>
              {
                showBuyButton ? (
                  <a href={ticketLink} target="_blank" className={styles.desktopBuyLink}>
                    <button className={styles.buyButton}>
                      Buy Now
                    </button>
                  </a>
                ) : null
              }
              <DateContainer className={styles.dateContainer} date={parsedDate} />
              <p className={styles.timeAndLocation}>{parsedDate.format('MMMM Do YYYY h:ssA')}</p>
              <p className={styles.address}>{locationTitle}<br />{address1}<br />{address2}</p>
            </div>
            <div className={styles.concertInfo}>
              <div className={styles.artistsContainer}>
                <h3 className={styles.infoSectionHeader}>Artists</h3>
                {artists.map(artist => <h5>{artist.name}, <i>{artist.instrument}</i></h5>)}
              </div>
              <div className={styles.programContainer}>
                <h3 className={styles.infoSectionHeader}>Program</h3>
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
            <div className={styles.sponsorsContainer}>
              <h3 className={styles.sponsorsTitle}>Sponsored By</h3>
              <div className={styles.sponsorsLogosContainer}>
                {sponsors.map(sponsor => <Img className={styles.sponsorLogo} fluid={sponsor.logo.childImageSharp.fluid} />)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buyButtonFooter}>
          <Link to="/concerts" className={styles.concertsLink}>
            <FiChevronsLeft />
            <h4 className={styles.concertsLinkText}>View All<br />Concerts</h4>
          </Link>
            {
              showBuyButton ? (
                <a href={ticketLink} target="_blank" className={styles.buyLink}>
                  <button className={styles.buyButton}>
                    Buy Now
                  </button>
                </a>
              ) : null
            }
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
        locationTitle
        address1
        address2
        landscapeImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        portraitImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
        sponsors {
          title
          logo {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        programNotes
      }
    }
  }
`;
