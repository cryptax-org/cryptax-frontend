import { Link } from 'react-router-dom';
import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import styles from './signUp.scss';

const Login = () => (
  <div className={styles.signUpForm}>
    <Grid className={styles.grid} textAlign='center' verticalAlign='middle'>
      <Grid.Column className={styles.gridColumn} textAlign='left'>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Welcome! Please Sign Up...
        </Header>
        <Form size='large'>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='First Name'
              icon='user'
              iconPosition='left'
              placeholder='First Name'
            />
            <Form.Input
              fluid
              label='Last Name'
              icon='user'
              iconPosition='left'
              placeholder='Last Name'
            />
          </Form.Group>
          <Form.Input
            fluid
            label='E-Mail address'
            icon='mail'
            iconPosition='left'
            placeholder='E-mail address'
          />
          <Form.Input
            fluid
            label='Password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Button fluid color='teal' fluid size='large'>
            Sign Up
          </Button>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default Login;
