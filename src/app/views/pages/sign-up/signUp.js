import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { sessionThunks } from "state/ducks";
import styles from './signUp.scss';

class SignUp extends Component {
  constructor(props) {
  super(props);

  this.state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsAndConditions: false
  };
}

  handleChange = (event, { name, value, type, checked }) => {
    const updatedValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: updatedValue })
  }

  handleSubmit = () => {
  }

  handleKeyPress = (event) => {
    if (event.charCode === 32 || event.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault()
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      termsAndConditions
    } = this.state;

    return (
      <div className={styles.signUpForm}>
        <Grid className={styles.grid} textAlign='center' verticalAlign='middle'>
          <Grid.Column className={styles.gridColumn} textAlign='left'>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Welcome! Please Sign Up...
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  label='First Name'
                  name='firstName'
                  onChange={this.handleChange}
                  placeholder='First Name'
                  required
                  value={firstName}
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  label='Last Name'
                  name='lastName'
                  onChange={this.handleChange}
                  placeholder='Last Name'
                  required
                  name={lastName}
                />
              </Form.Group>
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                label='E-Mail address'
                name='email'
                onChange={this.handleChange}
                placeholder='E-mail address'
                required
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                label='Password'
                name='password'
                onChange={this.handleChange}
                placeholder='Password'
                required
                type='password'
                value={password}
              />
              <Form.Checkbox
                label='I agree to the Terms and Conditions'
                name='termsAndConditions'
                onChange={this.handleChange}
                checked={termsAndConditions}
                required
              />
              <Button
                fluid
                color='teal'
                size='large'
                content='Sign Up'/>
            </Form>
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignUp;
