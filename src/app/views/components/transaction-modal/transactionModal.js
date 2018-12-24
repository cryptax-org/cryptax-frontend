import _ from 'lodash';
import { Button, Icon, Modal, Form, Search, Container } from 'semantic-ui-react';
import Datetime from 'react-datetime'
import moment from 'moment';
import PropTypes from "prop-types";
import React, { Component } from 'react';

import './transactionModal.scss';

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
  updateTransactionStatus: PropTypes.number.isRequired,
};

class TransactionModal extends Component {
  constructor(props) {
    super(props);

    const { initialTransaction, sourceCurrencies } = props;

    this.state = initialTransaction ? {
      open: false,
      date: initialTransaction.date,
      price: initialTransaction.price,
      quantity: initialTransaction.quantity,
      currency1: sourceCurrencies.find(currency => currency.value === initialTransaction.currency1) || '',
      currency2: sourceCurrencies.find(currency => currency.value === initialTransaction.currency2) || '',
      searchResults: [],
      currentFieldSearched: ''
    } : {
      open: false,
      date: moment(),
      price: '',
      quantity: '',
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

    const { updateTransaction } = this.props;

    const {
      date,
      type,
      price,
      quantity,
      currency1,
      currency2,
    } = this.state;

    updateTransaction({
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
    const { updateTransactionStatus, children, initialTransaction } = this.props;

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
        trigger={children}
      >
        <Modal.Header>{initialTransaction ? "Modify Transaction" : "Add A Transaction"}</Modal.Header>
        <Modal.Content>
          <Form id={formName} size='large' onSubmit={this.handleSubmit}>
            <Form.Input
              control={Datetime}
              label='Transaction date and time'
              onChange={this.handleDateChange}
              required
              value={date}
            />
            <Form.Input
              icon='dollar'
              iconPosition='left'
              label='Price'
              name='price'
              onChange={this.handleChange}
              placeholder='Price'
              required
              type='number'
              value={price}
            />
            <Form.Input
              icon='plus'
              iconPosition='left'
              label='Quantity'
              name='quantity'
              onChange={this.handleChange}
              placeholder='Quantity'
              required
              type='number'
              value={quantity}
            />
            <Form.Input
              control={Search}
              placeholder='From Currency'
              input={{ icon: 'search', iconPosition: 'left' }}
              label='From Currency'
              name='currency1'
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              required
              results={searchResults}
              value={currency1.title}
              />
            <Form.Input
              control={Search}
              placeholder='To Currency'
              input={{ icon: 'search', iconPosition: 'left' }}
              label='To Currency'
              name='currency2'
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              required
              results={searchResults}
              value={currency2.title}
            />
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
            updateTransactionStatus={updateTransactionStatus}
          />
        </Modal.Actions>
      </Modal>
    );
  };
};

TransactionModal.propTypes = {
  children: PropTypes.node,
  updateTransaction: PropTypes.func.isRequired,
  updateTransactionStatus: PropTypes.number.isRequired,
  initialTransaction: PropTypes.object,
  sourceCurrencies: PropTypes.array.isRequired,
};

TransactionModal.defaultProps = {
  initialTransaction: null,
}

export default TransactionModal
