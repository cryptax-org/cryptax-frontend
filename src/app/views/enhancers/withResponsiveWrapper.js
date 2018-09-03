import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

import { ResponsiveWrapper } from 'layouts';
import { sessionThunks } from "state/ducks/session";

export default function withResponsiveWrapper(WrappedComponent, showHeader) {
  const WithResponsiveWrapper = (props) => {
    const { isAuthenticated, logout, match } = props;

    return (
      <ResponsiveWrapper isAuthenticated={isAuthenticated} logout={logout} match={match} showHeader={showHeader}>
        <WrappedComponent { ...props } />
      </ResponsiveWrapper>
    );
  };

  WithResponsiveWrapper.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
  });

  const mapDispatchToProps = {
    logout: sessionThunks.logout,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithResponsiveWrapper);
}
