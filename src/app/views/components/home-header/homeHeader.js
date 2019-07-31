import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './homeHeader.scss';

const HomeHeader = ({ mobile }) => {
  const responsive = mobile ? styles.mobile : styles.desktop;

  return (
    <Segment
      className={`${styles.wrapperSegment} ${responsive}`}
      inverted
      textAlign='center'
      vertical
    >
      <Container text>
        <Header
          as='h1'
          className={`${styles.title} ${responsive}`}
          content='Cryptax'
          inverted
        />
        <Header
          as='h2'
          className={`${styles.subTitle} ${responsive}`}
          content='Calculate your taxes with confidence.'
          inverted
        />
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
        <Button
          as='label'
          floated='right'
          icon
          labelPosition='left'
          primary size='large'
        >
          <Icon name='upload' /> Second test
          <input
              hidden
              id='upload'
              multiple
              type="file"
                />
        </Button>

        <Label
          as='label'
          basic
        >
          <Button
              icon="upload"
              label={{
                  basic: true,
                  content: 'Third test'
              }}
              labelPosition="right"
          />
          <input
              hidden
              id="upload"
              multiple
              type="file"
          />
      </Label>

      </Container>
    </Segment>
  )
}

HomeHeader.propTypes = {
  mobile: PropTypes.bool,
}

export default HomeHeader;
