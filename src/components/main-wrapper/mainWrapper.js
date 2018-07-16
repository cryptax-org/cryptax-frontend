import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

import { pullRight, h1 } from './mainWrapper.scss';

const MainWrapper = ({ children }) => {
  return (
    <Container>
      <Link to="/">
        <Header as="h1" className={h1}>
          Cryptax
        </Header>
      </Link>
      {children}
      <Divider />
      <p className={pullRight}>
        Made with <Icon name="heart" color="red" /> by C&C
      </p>
    </Container>
  );
};

export default MainWrapper;
