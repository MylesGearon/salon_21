import React from 'react';

import styles from './index.module.scss';

export default () => (
    <form name="newsletter_signup" method="POST" data-netlify="true" className={styles.container}>
      <p>
        <label><span style={{display: 'none'}}>Email: </span><input className={styles.input} placeholder="Email" name="email" /></label>
      </p>
      <p>
        <button className={styles.submit} type="submit">Keep In Touch!</button>
      </p>
    </form>
);
