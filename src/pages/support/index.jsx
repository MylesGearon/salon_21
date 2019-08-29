import React, { Fragment } from "react"
import Helmet from 'react-helmet'

import AppContainer from "../../components/AppContainer"
import styles from './index.module.scss';

export default ({ path }) => (
  <Fragment>
    <Helmet>
      <title>Support Salon 21</title>
    </Helmet>
    <AppContainer currentPath={path}>
      <div className={styles.body}>
        <h1>Support Salon 21</h1>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="N7GQ27FKEVHA2" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
        <h3>HOW CAN YOU GET INVOLVED?</h3>
        <p>Salon 21: Petite Piano Concerts is a 501(3)(c) non-profit organization. We believe that classical music is for everyone, therefore all concerts are free of charge with a $15 suggested donation. Become more involved with Salon 21: Petite Piano Concerts by making your charitable contribution today. Help us continue presenting up-close and personal piano concerts!</p>

        <h3>Thank You!</h3>

        <h4>Services</h4>
        <p>Patrick Cadieux, filmmaker and photographer</p>
        <p>Myles Gearon, website designer</p>
        <p>Bri Hicks, photographer</p>
        <p>Sanjay Nelson, sound engineer</p>
        <p>Dolan Personke, graphic designer</p>
      </div>
    </AppContainer>
  </Fragment>
);
