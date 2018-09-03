import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const HomeHeader = ({ mobile }) => (
  <Segment
    inverted
    textAlign='center'
    style={{ minHeight: mobile ? 270 : 620, padding: '1em 0em' }}
    vertical
  >
    <Container text>
      <Header
        as='h1'
        content='Cryptax'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Calculate your taxes with confidence.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  </Segment>
)

HomeHeader.propTypes = {
  mobile: PropTypes.bool,
}

export default HomeHeader;
