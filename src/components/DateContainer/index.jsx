import React from 'react';
import moment from 'moment';

import styles from './index.module.scss';

const DateContainer = ({date, className}) => (
  <div className={styles.dateContainer + ' ' + className}>
    <h3 className={styles.dateNumber}>{date.format('D')}</h3>
    <br className={styles.dateBreak} />
    <h4 className={styles.dateMonth}>{date.format('MMM')}</h4>
  </div>
);

export default DateContainer;
