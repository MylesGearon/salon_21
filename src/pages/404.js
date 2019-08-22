import React from 'react';
import { Link } from 'gatsby';

import AppContainer from '../components/AppContainer';

const Page404 = ({path}) => (
  <AppContainer currentPath={path}>
    <h1>You've naviatged to an invalid page</h1>
    <Link to="/">
      <button>Go to the home page</button>
    </Link>
  </AppContainer>
);

export default Page404;
