import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import styles from './nav.module.scss';

const handleAdminClick = () => {
  console.log(netlifyIdentity.currentUser());
  if (netlifyIdentity.currentUser()) {
    window.location.href = `${window.location.origin}/admin`;
  } else {
    netlifyIdentity.open();
  }
}

const Nav = props => {
  useEffect(() => {
    netlifyIdentity.init({container: '#identity-service'});
  }, [null])

  return (
    <div className={styles.container}>
      <div>logo</div>
      <div>Link</div>
      <div>Link</div>
      <div>Link</div>
      <button id="identity-service" onClick={handleAdminClick}>Login with Netlify Identity</button>
      <div className={styles.emailContainer}>
        <input placeholder="Email" />
        <button >Signup</button>
      </div>
    </div>
  );
}

export default Nav;
