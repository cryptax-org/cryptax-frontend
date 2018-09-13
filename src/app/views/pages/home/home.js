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
import { sessionThunks } from 'state/ducks/session';
import styles from './home.scss';
import { withResponsiveWrapper } from 'enhancers';

const Home = ({ mobile }) => (
  <div>
    <HomeHeader mobile={mobile}/>
    <Segment className={styles.firstSection} vertical>
      <Grid container centered stackable verticalAlign='middle'>
        <Grid.Column width={12}>
          <Header as='h3' size='huge'>
            We Calculate the taxes you owe on cryptocurrency transactions
          </Header>
          <p className={styles.paragraph}>
            You enter the transaction you made within the year, we do the rest!
          </p>
          <Header as='h3' size='huge'>
            We can import transaction logs from many different exchanges
          </Header>
          <p className={styles.paragraph}>
            Binance, Coinbase, or even Kucoin, they all allow you to export all your transaction in a csv-like file,
            just import it in our webapp, and you're good to go!
          </p>
          <Header as='h3' size='huge'>
            Get a detailed report of what you owe
          </Header>
          <p className={styles.paragraph}>
            We generate a detailed report with all the information you need to file your taxes,
            just fill in the boxes with your favorite tax filer, and you are DONE!
          </p>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment className={styles.priceSegment} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column className={styles.gridColumn}>
            <Header as='h3' size='huge'>
              This is FREE!
            </Header>
            <p className={styles.paragraph}>
              Yes, you read that right! Cryptax is absolutely free and is surviving thanks to donations.
            </p>
          </Grid.Column>
          <Grid.Column className={styles.gridColumn}>
            <Header as='h3' size='huge'>
              Make a donation
            </Header>
            <p className={styles.paragraph}>
              Any little bit helps, and every cent we receive will be used to pay for hosting the website and developing it further.
            </p>
            <Button as={Link} to='./donate' size='huge'>Donate</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment className={styles.openSourceSegment} vertical>
      <Container text>
        <Header as='h3' size='huge'>
          Open source!
        </Header>
        <p className={styles.paragraph}>
          This website is fully open source and can be found in our <a href='https://github.com/cryptax-org' target='_blank'>Github.</a>
        </p>
      </Container>
    </Segment>
    <Segment className={styles.footerSegment} inverted vertical>
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

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatchToProps = {};

export default withResponsiveWrapper(connect(mapStateToProps, mapDispatchToProps)(Home));
