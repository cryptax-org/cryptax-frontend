import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { sessionThunks } from "state/ducks/session";
import styles from './verifyUser.scss';
import { withResponsiveWrapper } from 'enhancers';

export class VerifyUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDots: 0,
      dots: ``,
    };
  }

  componentWillMount() {
    const { authorizeUser, match } = this.props;

    authorizeUser(match.params.userId, match.params.token);
  }

  componentDidMount() {
    setInterval(this.changeLoadingDots.bind(this), 500);
  }

  changeLoadingDots = () => {
    const { numberOfDots, dots } = this.state;

    let newNumberOfDots = numberOfDots + 1;
    newNumberOfDots = newNumberOfDots > 3 ? 0 : newNumberOfDots;
    let newDots = ``;
    for (let i = 0 ; i < newNumberOfDots ; i++) {
      newDots=`${newDots}.`;
    }

    this.setState({numberOfDots: newNumberOfDots, dots: newDots});
  }

  render() {
    const { isAuthorized } = this.props; // I need 3 states, I should use my enum for that
    const { dots } = this.state;

    return (
      <div className={styles.verifyUser}>
        <Grid className={styles.grid} container centered stackable verticalAlign='middle'>
          <Grid.Column className={styles.gridColumn} textAlign='center' width={5}>
            <Segment>
              <Header as='h3' size='huge'>
                {isAuthorized ? (
                  <div>
                    <div>
                      Authorized!
                    </div>
                    <div>
                      Redirecting{dots}
                    </div>
                  </div>
                ) : isAuthorized === false ?
                  `Authorizing${dots}`
                : `Oops, something went wrong. Please try again`}
              </Header>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

VerifyUser.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  authorizeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.session.isAuthorized,
});

const mapDispatchToProps = {
  authorizeUser: sessionThunks.authorizeUserAndRedirect,
};

export default withResponsiveWrapper(connect(mapStateToProps, mapDispatchToProps)(VerifyUser));
