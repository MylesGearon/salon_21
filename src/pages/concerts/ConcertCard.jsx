import React, { useEffect, Fragment } from 'react';
import p from 'prop-types';
import fitty from 'fitty';
import Img from 'gatsby-image';
import moment from 'moment';
import { Link } from 'gatsby';

import styles from './concertCard.module.scss';
import DateContainer from '../../components/DateContainer';

const ConcertCard = ({concert}) => {
  const {
    node: {
      frontmatter: {
        landscapeImage,
        title,
        artists,
        datetime,
        location,
        path,
        ticketLink
      }
    }
  } = concert;

  useEffect(() => {
    fitty(`.${styles.title}`, {
      maxSize: 24,
      minSize: 20
    });
  });

  return (
    <div className={styles.container}>
      <div>
        <Img
          fluid={landscapeImage.childImageSharp.fluid}
          fadeIn={true}
          className={styles.img}
        />
        <div className={styles.titlePositioner}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.concertInfo}>
          <DateContainer date={concert.parsedDate} className={styles.dateContainer} />
          <div className={styles.details}>
            <p>
              {concert.parsedDate.format('h:sA')} at {location}
            </p>
            {artists.map(({name, instrument}) => <p>{name}, <i>{instrument}</i></p>)}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link to={`/concerts/${path}`} className={styles.linkWrapper}>
            <button className={[styles.button, styles.detailsButton].join(' ')}>
              Details
            </button>
          </Link>
          <a href={ticketLink} target="_blank" className={styles.linkWrapper}>
            <button  className={[styles.button, styles.buyButton].join(' ')}>
              Buy Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

ConcertCard.propTypes = {
  concert: p.shape({
    node: p.shape({
      frontmatter: p.shape({
        landscapeImage: p.object.isRequired,
        title: p.string.isRequired,
        artists: p.arrayOf(p.shape({
          name: p.string.isRequired,
          instrument: p.string.isRequired
        })),
        datetime: p.string.isRequired
      })
    })
  })
};

export default ConcertCard;
