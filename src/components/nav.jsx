import React from 'react';

import styles from './nav.module.scss';
import smallLogo from '../assets/small_logo.svg';

const Nav = props => {

  return (
    <div className={styles.container}>
      <img className={styles.logoContainer} src={smallLogo} />
      <div className={styles.emailContainer}>
        <input placeholder="Email" />
        <button >Signup</button>
      </div>
    </div>
  );
}

export default Nav;
