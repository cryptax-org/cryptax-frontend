import { Button, Container, Table, Header, Menu, Icon, Segment, Grid, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import groupBy from 'lodash/groupBy';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react';

import { withResponsiveWrapper } from 'enhancers';

export class DeleteModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  onDelete = () => {
    const { deleteTransaction } = this.props;

    deleteTransaction();
    this.close();
  }

  render() {
    const { open } = this.state;

    const { children } = this.props

    return (
      <Modal
        basic
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={children}
      >
        <Header icon='delete' content='Delete transaction?' />
        <Modal.Content>
        <p>
            Are you sure you want to delete this transaction?
        </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='green' inverted onClick={() => this.close()}>
              <Icon name='remove' /> No
          </Button>
          <Button color='red' inverted onClick={() => this.onDelete()}>
              <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  };
};

DeleteModal.propTypes = {
  children: PropTypes.node,
  deleteTransaction: PropTypes.func.isRequired,
};

export default withResponsiveWrapper(DeleteModal);
