import React from 'react';
import { Icon, Header } from 'semantic-ui-react';

import { MainWrapper } from 'layouts';

const NoMatch = () => {
  return (
    <MainWrapper>
      <Icon name="minus circle" size="big" />
      <strong>Page not found!</strong>
    </MainWrapper>
  );
};

export default NoMatch;
