import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

import { sessionThunks } from "state/ducks/session";

export default function withAuthentication(WrappedComponent) {
  const WithAuthentication = (props) => {
    if ( !props.isAuthenticated ) {
      const { setRedirectAfterLogin, match } = props;
      setRedirectAfterLogin(match.url); // or match.path? What's the difference?

      return <Redirect to="/login" />;
    }

    return ( <WrappedComponent { ...props } /> );
  };

  WithAuthentication.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
  });

  const mapDispatchToProps = {
    setRedirectAfterLogin: sessionThunks.setRedirectAfterLogin,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}
