import React, { useEffect } from 'react';
import p from 'prop-types';
import fitty from 'fitty';
import Img from 'gatsby-image';
import moment from 'moment';

import styles from './concertCard.module.scss';

const ConcertCard = ({concert}) => {
  const {
    node: {
      frontmatter: {
        landingPageImage,
        title,
        artists,
        datetime
      }
    }
  } = concert;

  useEffect(() => {
    fitty(`.${styles.title}`, {
      maxSize: 24
    });
    fitty(`.${styles.artists}`, {
      maxSize: 16
    });
  });

  return (
    <div className={styles.container}>
      <Img
        fluid={landingPageImage.childImageSharp.fluid}
        fadeIn={true}
        className={styles.img}
      />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.artists}>{artists}</h3>
      </div>
      <p className={styles.date}>
        {moment(datetime).format('MMM Do YYYY')}
      </p>
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
