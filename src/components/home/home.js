import React from 'react';
import { Link } from 'react-router-dom';

import MainWrapper from 'components/main-wrapper';

const Home = () => {
  return (
    <MainWrapper>
      <p>Website in construction, please come back later...</p>
      <p>
        <Link to="/login">Login Page</Link>
      </p>
    </MainWrapper>
  );
};

export default Home;
