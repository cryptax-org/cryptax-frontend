import React from 'react';
import { Icon, Header } from 'semantic-ui-react';

import MainWrapper from 'components/main-wrapper';

const NoMatch = () => {
  return (
    <MainWrapper>
      <Icon name="minus circle" size="big" />
      <strong>Page not found!</strong>
    </MainWrapper>
  );
};

export default NoMatch;
