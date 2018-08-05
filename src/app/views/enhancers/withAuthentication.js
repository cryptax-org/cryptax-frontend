import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

export default function withAuthentication(WrappedComponent) {
  const WithAuthentication = (props) => {
    if ( !props.isAuthenticated ) {
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

  return connect(mapStateToProps)(WithAuthentication);
}
