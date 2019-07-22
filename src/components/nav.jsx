import React, {useState} from 'react';
import { FiMenu } from 'react-icons/fi';

import styles from './nav.module.scss';
import smallLogo from '../assets/logo_black.svg';

const Nav = props => {
  const [expanded, setExpanded] = useState(false);
  return [
    <div
      className={`
        ${styles.container}
        ${expanded ? styles.expanded : ''}
      `}
      key="menu"
    >
      <div className={styles.border} key="border"></div>
    </div>,
    <div className={styles.fixedElements}>
      <img alt="logo" className={styles.logoContainer} src={smallLogo} />
      <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
        <FiMenu />
      </div>
    </div>
  ];
}

export default Nav;
