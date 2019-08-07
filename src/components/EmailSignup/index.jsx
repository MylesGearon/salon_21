import React from 'react';
import styles from './index.module.scss';

export default () => (
  <div className={styles.container}>
    <input className={styles.input} placeholder="Email" />
    <button className={styles.submit} type="submit">Keep In Touch!</button>
  </div>
);
