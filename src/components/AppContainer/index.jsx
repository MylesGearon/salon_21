import React from 'react';
import p from 'prop-types';
import '../../assets/mission_gothic/stylesheet.css';

import Nav from '../Nav';
import styles from './appContainer.module.scss';

const AppContainer = ({children, currentPath, className}) => (
  <div>
    <Nav currentPath={currentPath} />
    <div className={styles.container + ' ' + className}>
      {children}
    </div>
  </div>
);

AppContainer.propTypes = {
  currentPath: p.string.isRequired
};

export default AppContainer;
