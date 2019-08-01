import React from 'react';

import Nav from '../Nav';
import styles from './appContainer.module.scss';

export default ({children}) => (
  <div>
    <Nav />
    <div className={styles.container}>
      {children}
    </div>
  </div>
)
