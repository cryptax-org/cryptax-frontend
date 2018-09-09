import { Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react'

import { sessionThunks } from "state/ducks/session";
import styles from './signUp.scss';

//TODO: support auto fill

export class SignUp extends Component {
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

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const updatedValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: updatedValue })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      termsAndConditions,
    } = this.state;

    const { signUp } = this.props;

    if (termsAndConditions) {
      signUp({
        firstName,
        lastName,
        email,
        password,
      });
    }
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

    const {
      isSignedUp,
      isAuthenticated,
      redirectURL,
    } = this.props;

    return isAuthenticated ? (
      <Redirect to={redirectURL} />
    ) : isSignedUp ? (
      <Redirect to='/login' />
    ) : (
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
                  value={lastName}
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
                onChange={(event, data) => this.handleChange(
                  {
                    target: {
                      name: data.name,
                      type: data.type,
                      checked: data.checked
                    }
                  }
                )}
                checked={termsAndConditions}
                required
              />
              <Button
                fluid
                color='teal'
                size='large'
                type='submit'
                content='Sign Up'
              />
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

SignUp.propTypes = {
  isSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirectURL: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSignedUp: state.session.isSignedUp,
  isAuthenticated: state.session.isAuthenticated,
  redirectURL: state.session.redirectAfterLogin,
});

const mapDispatchToProps = {
  signUp: sessionThunks.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
