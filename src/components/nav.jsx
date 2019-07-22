import React from 'react';

import styles from './nav.module.scss';
import smallLogo from '../assets/logo_black.svg';

const Nav = props => {

  return [
    <div className={styles.container}>
      <img alt="logo" className={styles.logoContainer} src={smallLogo} />
      <div className={styles.hamburger}>hamburger</div>
      <div className={styles.emailContainer}>
        <input placeholder="Email" />
        <button >Signup</button>
      </div>
    </div>,
    <div className={styles.border}></div>
  ];
}

export default Nav;
