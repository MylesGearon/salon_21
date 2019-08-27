import React, { useEffect, Fragment } from 'react';
import p from 'prop-types';
import fitty from 'fitty';
import Img from 'gatsby-image';
import moment from 'moment';

import styles from './concertCard.module.scss';

const ConcertCard = ({concert}) => {
  const {
    node: {
      frontmatter: {
        landscapeImage,
        title,
        artists,
        datetime
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
          <div className={styles.dateContainer}>
            <h3 className={styles.dateNumber}>{concert.parsedDate.format('D')}</h3>
            <br className={styles.dateBreak} />
            <h4 className={styles.dateMonth}>{concert.parsedDate.format('MMM')}</h4>
          </div>
          <div className={styles.details}>
            <p>
              {concert.parsedDate.format('h:sA')} at <a className={styles.location} target="_blank" href="https://maps.google.com">The Westin Gallery</a>
            </p>
            <p className={styles.artists}>
              {artists.join(', ')}
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={[styles.button, styles.detailsButton].join(' ')} >Details</button>
          <button className={[styles.button, styles.buyButton].join(' ')} >Buy Now</button>
        </div>
      </div>
    </div>
  );
}

ConcertCard.propTypes = {
  concert: p.shape({
    node: p.shape({

    })
  })
};

export default ConcertCard;
