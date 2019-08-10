import React, { useState } from 'react';
import { Link } from 'gatsby';
import { FiMenu, FiX } from 'react-icons/fi';

import styles from './nav.module.scss';
import smallLogo from '../../assets/logo_black.svg';
import EmailSignup from '../EmailSignup';

const NavLink = ({ text, linkTo, path, currentPath }) => (
  <Link to={linkTo}>
    <h4 className={styles.link + ' ' + (currentPath.match(path) ? styles.active : '')}>{text}</h4>
  </Link>
);

const links = [
  {
    text: 'Home',
    linkTo: '/',
    path: /^\/?$/
  },
  {
    text: 'Concerts',
    linkTo: '/concerts',
    path: /\/concerts.*/
  },
  {
    text: 'About',
    linkTo: '/about',
    path: /\/about/
  },
  {
    text: 'Donate',
    linkTo: '/donate',
    path: /\/donate/
  },
]

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
        <img alt="logo" className={styles.sideNavLogo} src={smallLogo} />
        {
          links.map((linkProps, index) => <NavLink key={index} currentPath={props.currentPath} {...linkProps} />)
        }
        <EmailSignup />
      </div>
      <div className={styles.border} key="border" />
    </div>,
    <div key="fixed-elements" className={styles.mobileFixedElements}>
      <img alt="logo" className={styles.topNavLogo} src={smallLogo} />
      <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
        <MenuIconName />
      </div>
    </div>
  ];
}

export default Nav;
