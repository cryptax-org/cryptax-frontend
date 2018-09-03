import PropTypes from 'prop-types'
import React, { Component } from 'react'

import DesktopWrapper from './desktop-wrapper';
import MobileWrapper from './mobile-wrapper';

const ResponsiveWrapper = (props) => (
  <div>
    <DesktopWrapper {...props} />
    <MobileWrapper {...props} />
  </div>
)

ResponsiveWrapper.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  showHeader: PropTypes.bool,
}

ResponsiveWrapper.defaultProps = {
  showHeader: true,
}

export default ResponsiveWrapper;
