import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class MobileWrapper extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { children, isAuthenticated, showHeader } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        {showHeader ? (
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
              <Menu.Item as={Link} to='/' active>
                Home
              </Menu.Item>
              <Menu.Item content='Transactions' as={Link} to='/transactions' />
              <Menu.Item content='Report' as={Link} to='/report' />
              <Menu.Item content='About' as={Link} to='/about' />
            </Sidebar>

            <Sidebar.Pusher
              dimmed={sidebarOpened}
              onClick={this.handlePusherClick}
              style={{ minHeight: '100vh' }}
            >
              <Segment
                inverted
                textAlign='center'
                style={{ padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      {isAuthenticated ? (
                        <Button content='Logout' onClick={this.logoutHandler} inverted />
                      ) : (
                        <div>
                          <Button content='Login' as={Link} to='/login' inverted />
                          <Button content='Sign Up' as={Link} to='/sign-up' inverted style={{ marginLeft: '0.5em' }} />
                        </div>
                      )}
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>

              <div>{React.cloneElement(this.props.children, { mobile: true })}</div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        ) : null}
      </Responsive>
    )
  }
}

MobileWrapper.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  showHeader: PropTypes.bool.isRequired,
}

export default MobileWrapper;
