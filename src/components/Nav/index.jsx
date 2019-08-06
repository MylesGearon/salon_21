import React, {useState} from 'react';
import { Link } from 'gatsby';
import { FiMenu, FiX } from 'react-icons/fi';

import styles from './nav.module.scss';
import smallLogo from '../../assets/logo_black.svg';

const Nav = props => {
  const [expanded, setExpanded] = useState(false);
  const MenuIconName = expanded ? FiX : FiMenu;
  return [
    <div
      className={`
        ${styles.background}
        ${expanded ? styles.expanded : ''}
      `}
      key="menu"
    >
      <div className={styles.navList}>
        <Link>Test 1</Link>
        <Link>Test 2</Link>
        <Link>Test 3</Link>
        <Link>Test 4</Link>
        <Link>Test 5</Link>
      </div>
      <div className={styles.border} key="border"></div>
    </div>,
    <div className={styles.mobileFixedElements}>
      <img alt="logo" className={styles.logoContainer} src={smallLogo} />
      <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
        <MenuIconName />
      </div>
    </div>
  ];
}

export default Nav;
