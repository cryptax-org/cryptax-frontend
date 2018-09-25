import _ from 'lodash';
import { Button, Icon, Modal, Form, Search, Container } from 'semantic-ui-react';
import Datetime from 'react-datetime'
import moment from 'moment';
import PropTypes from "prop-types";
import React, { Component } from 'react';

import './addTransactionModal.scss';

import { PostTransactionEnum } from 'state/ducks/transactions';

class NestedModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
      >
        <Modal.Header>Transaction Added!</Modal.Header>
        <Modal.Content>
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  };
}

NestedModal.propTypes = {
  addTransactionStatus: PropTypes.number.isRequired,
};

class AddTransactionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      date: moment(),
      price: 0,
      quantity: 0,
      currency1: '',
      currency2: '',
      searchResults: [],
      currentFieldSearched: ''
    }
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  };

  handleDateChange = date => {
    this.setState({ date })
  };

  handleSubmit = e => {
    e.preventDefault();

    const { addTransaction } = this.props;

    const {
      date,
      type,
      price,
      quantity,
      currency1,
      currency2,
    } = this.state;

    addTransaction({
      date,
      type,
      price,
      quantity,
      currency1: currency1.description,
      currency2: currency2.description,
    });
  };

  resetSearch = () => this.setState({ searchResults: [], currency1: '' })

  handleResultSelect = (e, { result }) => {
    const { currentFieldSearched } = this.state;
    this.setState({ [currentFieldSearched]: result })
  }

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({ currentFieldSearched: name });

    if (value.length < 1) {
      this.resetSearch()
    } else {
      const { sourceCurrencies } = this.props;

      this.setState({ [name]: { title: value }})
      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = result => re.test(result.title) || re.test(result.description);

      this.setState({ searchResults: sourceCurrencies.filter(isMatch) });
    }
  };

  render() {
    const { floated, addTransactionStatus } = this.props;

    const {
      open,
      date,
      type,
      price,
      quantity,
      currency1,
      currency2,
      searchResults,
    } = this.state;

    const formName = 'form1';

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button floated={floated} icon labelPosition='left' primary size='large'>
            <Icon name='plus' /> Add Transaction Manually
          </Button>
        }
      >
        <Modal.Header>Add A Transaction</Modal.Header>
        <Modal.Content>
          <Form id={formName} size='large' onSubmit={this.handleSubmit}>
            <div className='required field'>
              <label>Transaction date and time</label>
              <Datetime
                value={date}
                onChange={this.handleDateChange}
              />
            </div>
            <Form.Input
              fluid
              icon='dollar'
              iconPosition='left'
              label='Price'
              name='price'
              onChange={this.handleChange}
              placeholder='0'
              required
              type='number'
              value={price}
            />
            <Form.Input
              fluid
              icon='plus'
              iconPosition='left'
              label='Quantity'
              name='quantity'
              onChange={this.handleChange}
              placeholder='0'
              required
              type='number'
              value={quantity}
            />
            <div className='required field'>
              <label>From Currency</label>
              <Search
                input={{ icon: 'search', iconPosition: 'left' }}
                name='currency1'
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={searchResults}
                value={currency1.title}
              />
            </div>
            <div className='required field'>
              <label>To Currency</label>
              <Search
                input={{ icon: 'search', iconPosition: 'left' }}
                name='currency2'
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={searchResults}
                value={currency2.title}
              />
            </div>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            color='teal'
            form={formName}
            onClick={this.close}
            secondary
            size='large'
            type='button'
          />
          <Button
            content='Submit'
            color='teal'
            form={formName}
            primary
            size='large'
            type='submit'
          />
          <NestedModal
            addTransactionStatus={addTransactionStatus}
          />
        </Modal.Actions>
      </Modal>
    );
  };
};

AddTransactionModal.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  addTransactionStatus: PropTypes.number.isRequired,
  sourceCurrencies: PropTypes.array.isRequired,
};

export default AddTransactionModal
