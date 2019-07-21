import React from 'react';

import styles from './nav.module.scss';

const Nav = props => (
  <div className={styles.container}>
    <div>logo</div>
    <div>Link</div>
    <div>Link</div>
    <div>Link</div>
    <div className={styles.emailContainer}>
      <input placeholder="Email" />
      <button >Signup</button>
    </div>
  </div>
);

export default Nav;
