import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import _ from 'lodash';
import moment from 'moment';

import AppContainer from '../../components/AppContainer';
import styles from './index.module.scss';
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
  const groupedConcerts = groupConcertsByMonth(sortConcertsByDate(data.allMarkdownRemark.edges));
  return (
    <Fragment>
      <Helmet><title>Concerts</title></Helmet>
      <AppContainer currentPath={path}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>CONCERTS</h1>
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
              <Fragment>
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
            artists
            landingPageImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ConcertIndex;
