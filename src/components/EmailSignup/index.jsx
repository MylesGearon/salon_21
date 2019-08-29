import React from 'react';

import styles from './index.module.scss';

export default () => (
    <form name="newsletter_signup" method="POST" data-netlify="true" className={styles.container}>
      <input className={styles.input} placeholder="Email" name="email" />
      <button className={styles.submit} type="submit">Keep In Touch!</button>
    </form>
);
