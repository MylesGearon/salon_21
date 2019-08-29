import React, { useState } from 'react';
import {FiChevronRight} from 'react-icons/fi';

import styles from './index.module.scss';

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default () => {
  const [state, setState] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error))
  }

    return submitted ? <h4 className={styles.thankYou}>Thank you!</h4> : (
      <form name="newsletter_signup" method="POST" data-netlify="true" className={styles.container} onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="newsletter_signup" />
        <input className={styles.input} placeholder="Newsletter" name="email" onChange={handleChange} />
        <button className={styles.submit} type="submit"><FiChevronRight /></button>
      </form>
    );
};
