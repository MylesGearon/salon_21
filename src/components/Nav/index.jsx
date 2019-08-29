import React, { useState } from 'react';
import { Link } from 'gatsby';
import { FiMenu, FiX, FiMail } from 'react-icons/fi';
import { FaFacebookSquare } from 'react-icons/fa';

import styles from './nav.module.scss';
import smallLogo from '../../assets/Salon21_Logo.png';
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
    text: 'Support',
    linkTo: '/support',
    path: /\/support/
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
        <Link to="/">
          <img alt="logo" className={styles.sideNavLogo} src={smallLogo} />
        </Link>
        {
          links.map((linkProps, index) => <NavLink key={index} currentPath={props.currentPath} {...linkProps} />)
        }
        <EmailSignup />
        <div>
          <div className={styles.externalLink + ' ' + styles.emailLink}>
            <FiMail className={styles.externalLinkIcon}/>
            <a target="_blank" href="mailto:bonjour@salon21.org">
              <span className={styles.externalLinkText}>
                bonjour@salon21.org
              </span>
            </a>
          </div>
          <div className={styles.externalLink}>
            <FaFacebookSquare className={styles.externalLinkIcon}/>
            <a target="_blank" href="https://facebook.com/salon21cincinnati">
              <span className={styles.externalLinkText}>
                fb.com/Salon21Cincinnati
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.border} key="border" />
    </div>,
    <div key="fixed-elements" className={styles.mobileFixedElements}>
      <Link to="/">
        <img alt="logo" className={styles.topNavLogo} src={smallLogo} />
      </Link>
      <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
        <MenuIconName />
      </div>
    </div>
  ];
}

export default Nav;
