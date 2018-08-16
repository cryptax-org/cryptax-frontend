import { Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import React from 'react';

import { MainWrapper } from 'layouts';
import { sessionThunks } from "state/ducks/session";

const Home = ({ isAuthenticated, logout }) => {
  const logoutHandler = () => logout();

  return (
    <MainWrapper>
      <p>Website in construction, please come back later...</p>
      {isAuthenticated ? (
        <Button
          content='Logout'
          onClick={logoutHandler}
        />
      ) : (
        <p>
          <Link to="/login">Login Page</Link>
        </p>
      )}
      <p>
        <Link to="/transactions">Transactions Page</Link>
      </p>
    </MainWrapper>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
  logout: state.session.logout,
});

const mapDispatchToProps = {
  logout: sessionThunks.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
