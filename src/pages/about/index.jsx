import React, { Fragment } from "react"
import Helmet from 'react-helmet'

import AppContainer from "../../components/AppContainer"
import styles from './index.module.scss';

export default ({ path }) => (
  <Fragment>
    <Helmet>
      <title>About Salon 21</title>
    </Helmet>
    <AppContainer currentPath={path}>
      <div className={styles.body}>
        <h1>About Us</h1>
        <div className={styles.youtubeContainer}>
          <iframe
            className={styles.youtubeIframe}
            src={`https://www.youtube.com/embed/WjxOthMQTW0`}
            frameBorder="0"
          />
        </div>
        <h3>PARTY LIKE CHOPIN</h3>
        <p>Composers like Chopin and Mendelssohn performed right in people’s living rooms. We bring these salons into the 21st century with intimate piano concerts in unexpected places around Cincinnati.</p>
        <h3>EAT. DRINK. LISTEN.</h3>
        <p>We believe that classical music is for everyone. Enjoy wine, food and friends as you get immersed in an outstanding classical piano performances exploring world-class music and exciting new ideas. All concerts are free of charge with a $15 suggested donation.</p>
        <h3>MINGLE</h3>
        <p>You won’t find stages at Salon 21. We break down the barriers between audience and artists. Experience a short concert up close then talk with the artists following the show.</p>
      </div>
    </AppContainer>
  </Fragment>
);
