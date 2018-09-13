import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import React from 'react';

import carlImg from 'assets/img/carl.jpg';
import corentinImg from 'assets/img/corentin.png';
import styles from './about.scss';
import { withResponsiveWrapper } from 'enhancers';

const openLink = (url) => {
  const win = window.open(url);
  win.focus();
};

const About = ({ mobile }) => (
  <Segment vertical>
    <Grid container centered divided='vertically' stackable>
      <Grid.Row>
        <Header as='h3' size='huge'>
          Who we are
        </Header>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={4}>
          <Image bordered centered circular src={carlImg} size='small' />
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width={9}>
          <Segment color='red' textAlign='left'>
            <p className={styles.paragraph}>
              Carl is a backend Java developer
            </p>
            <Icon.Group className={styles.addIcon} size='large' onClick={openLink.bind(null, 'https://www.linkedin.com/in/carlphilipp')}>
              <Icon name='linkedin' />
              <Icon corner name='add' />
            </Icon.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={4}>
          <Image bordered centered circular src={corentinImg} size='small' />
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width={9}>
          <Segment color='blue' textAlign='left'>
            <p className={styles.paragraph}>
              Corentin is a frontend Javascript developer
            </p>
            <Icon.Group className={styles.addIcon} size='large' onClick={openLink.bind(null, 'https://www.linkedin.com/in/corentinleman')}>
              <Icon name='linkedin' />
              <Icon corner name='add' />
            </Icon.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Header as='h3' size='huge'>
          Contact Us
        </Header>
      </Grid.Row>

      <Grid.Row>
        <Button href='mailto:contact@cryptax.com'>Email</Button>
      </Grid.Row>
    </Grid>
    </Segment>
)

export default withResponsiveWrapper(About);
