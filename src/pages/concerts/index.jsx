import React, { Fragment, useEffect } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import _ from 'lodash';
import moment from 'moment';
import fitty from 'fitty';

import AppContainer from '../../components/AppContainer';
import styles from './index.module.scss';
import concertCardStyles from './index.module.scss';
import ConcertCard from './ConcertCard';

const sortConcertsByDate = edges => {
  const concerts = edges.map(edge => {
    const parsedDate = moment(edge.node.frontmatter.datetime)
    return {
      ...edge,
      parsedDate,
      month: `${parsedDate.year()} ${parsedDate.month()}`
    };
  });
  return _.sortBy(concerts, 'parsedDate');
};

const groupConcertsByMonth = concerts => {
  const groupedConcerts = [
    [
      concerts[0].month,
      [concerts.shift()]
    ]
  ];
  concerts.forEach(concert => {
    if (groupedConcerts[groupedConcerts.length - 1][0] === concert.month) {
      groupedConcerts[groupedConcerts.length - 1][1].push(concert);
    } else {
      groupedConcerts.push([concert.month, [concert]]);
    }
  });
  return groupedConcerts;
};

const ConcertIndex = ({ data, path }) => {

  useEffect(() => {
      fitty(`.${concertCardStyles.title}`, {
        maxSize: 24,
        minSize: 10,
        multiLine: false
      });
  }, [false]);

  const futureConcerts = data.allMarkdownRemark.edges
    .filter(edge => moment(edge.node.frontmatter.datetime).isAfter());
  const groupedConcerts = groupConcertsByMonth(sortConcertsByDate(futureConcerts));
  return (
    <Fragment>
      <Helmet><title>Concerts</title></Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>CONCERTS</h2>
          <select
            className={styles.jumpTo}
            onChange={e => window.scrollTo(
              0,
              document.getElementById(e.target.value).getBoundingClientRect().top
            )}
          >
            {groupedConcerts.map(([month, concerts]) => (
              <option key={month} value={month}>
                {moment(month, 'YYYY MM').add(1, 'month').format('MMM YYYY')}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.body}>
          {
            groupedConcerts.map(([month, concerts]) => (
              <Fragment key={month}>
                <h3 className={styles.monthDivider} id={month}>
                  {moment(month, 'YYYY MM').add(1, 'month').format('MMMM YYYY')}
                </h3>
                {concerts.map(concert => <ConcertCard key={concert.title} concert={concert} />)}
              </Fragment>
            ))
          }
        </div>
      </AppContainer>
    </Fragment>
  );
};

export const pageQuery = graphql`
  query concertsIndex {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/*/concerts/**/*" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            datetime
            locationTitle
            artists {
              name
              instrument
            }
            landscapeImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            path
            ticketLink
          }
        }
      }
    }
  }
`

export default ConcertIndex;
