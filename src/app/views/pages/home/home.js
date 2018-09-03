import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import React from 'react';

import { HomeHeader } from 'components';
import { ResponsiveWrapper } from 'layouts';
import { sessionThunks } from 'state/ducks/session';
import { withResponsiveWrapper } from 'enhancers';

const Home = ({ mobile }) => {

return (
  <div>
    <HomeHeader mobile={mobile}/>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container centered stackable verticalAlign='middle'>
        <Grid.Column width={12}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            We Calculate the taxes you owe on cryptocurrency transactions
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            You enter the transaction you made within the year, we do the rest!
          </p>
          <Header as='h3' style={{ fontSize: '2em' }}>
            We can import transaction logs from many different exchanges
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Binance, Coinbase, or even Kucoin, they all allow you to export all your transaction in a csv-like file,
            just import it in our webapp, and you're good to go!
          </p>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Get a detailed report of what you owe
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            We generate a detailed report with all the information you need to file your taxes,
            just fill in the boxes with your favorite tax filer, and you are DONE!
          </p>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              This is FREE!
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes, you read that right! Cryptax is absolutely free and is surviving thanks to donations.
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Make a donation
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Any little bit helps, and every cent we receive will be used to pay for hosting the website and developing it further.
            </p>
            <Button as={Link} to='./donate' size='huge'>Donate</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Open source!
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          This website is fully open source and can be found in our <a href='https://github.com/cryptax-org' target='_blank'>Github.</a>
        </p>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as={Link} to='./who-we-are'>Who we are</List.Item>
                <List.Item as='a' href='mailto:contact@cryptax.com'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Quick links' />
              <List link inverted>
                <List.Item as={Link} to='./'>Home</List.Item>
                <List.Item as={Link} to='./transactions'>Transactions</List.Item>
                <List.Item as={Link} to='./reports'>Reports</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatchToProps = {};

export default withResponsiveWrapper(connect(mapStateToProps, mapDispatchToProps)(Home));
