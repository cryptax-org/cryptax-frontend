import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { sessionThunks } from "state/ducks/session";
import styles from './login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const { login } = this.props;

    login({
      email,
      password,
    });
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    const {
      isAuthenticated,
      redirectURL,
    } = this.props;

    return isAuthenticated ? (
      <Redirect to={redirectURL} />
    ) : (
      <div className={styles.loginForm}>
        <Grid className={styles.grid} textAlign='center' verticalAlign='middle'>
          <Grid.Column className={styles.gridColumn}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='email'
                  onChange={this.handleChange}
                  placeholder='E-mail address'
                  value={email}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name='password'
                  onChange={this.handleChange}
                  placeholder='Password'
                  type='password'
                  value={password}
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/sign-up">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
  redirectURL: state.session.redirectAfterLogin,
});

const mapDispatchToProps = {
  login: sessionThunks.loginAndStoreTokenAndGetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
