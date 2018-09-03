import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class DesktopWrapper extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { children, isAuthenticated, showHeader, match } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        {showHeader ? (
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item content='Home' as={Link} to='/' active={match.path === '/'} />
                  <Menu.Item content='Transactions' as={Link} to='/transactions' active={match.path.includes('transactions')} />
                  <Menu.Item content='Report' as={Link} to='/report' active={match.path.includes('report')} />
                  <Menu.Item content='About' as={Link} to='/about' active={match.path.includes('about')}/>
                  <Menu.Item position='right'>
                    {isAuthenticated ? (
                      <Button content='Logout' onClick={this.logoutHandler} inverted={!fixed} />
                    ) : (
                      <div>
                        <Button content='Login' as={Link} to='/login' inverted={!fixed} />
                        <Button content='Sign Up' as={Link} to='/sign-up' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} />
                      </div>
                    )}
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
        ) : null}

        {children}
      </Responsive>
    )
  }
}

DesktopWrapper.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  showHeader: PropTypes.bool.isRequired,
}

export default DesktopWrapper;
