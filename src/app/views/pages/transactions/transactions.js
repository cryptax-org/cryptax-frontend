import { Button, Table, Label, Menu, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react';

import { AddTransactionModal } from 'components';
import { currenciesThunks } from 'state/ducks/currencies';
import { transactionsThunks } from 'state/ducks/transactions';
import styles from './transactions.scss';

export class Transactions extends Component {
  componentWillMount() {
    const {
      getCurrencies,
      currencies,
      currenciesTimestamp,
      getTransactions,
      user,
      jwt
    } = this.props;

    getTransactions(user.id, jwt);

    if (!currencies.lenght) {
      getCurrencies(jwt);
    }
  }

  addTransactionWrapper = transaction => {
    const { addTransaction, user, jwt } = this.props;

    addTransaction(user.id, transaction, jwt);
  }

  render() {
    const { currencies, transactions, addTransactionStatus } = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Currency 1</Table.HeaderCell>
            <Table.HeaderCell>Currency 2</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.map(transaction => {
            return (
              <Table.Row key={transaction.id}>
                <Table.Cell>{transaction.source}</Table.Cell>
                <Table.Cell>{transaction.date}</Table.Cell>
                <Table.Cell>{transaction.type}</Table.Cell>
                <Table.Cell>{transaction.price}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
                <Table.Cell>{transaction.currency1}</Table.Cell>
                <Table.Cell>{transaction.currency2}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
              <AddTransactionModal
                addTransaction={this.addTransactionWrapper}
                addTransactionStatus={addTransactionStatus}
                floated='right'
                sourceCurrencies={currencies}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

Transactions.propTypes = {
  currencies: PropTypes.array,
  currenciesTimestamp: PropTypes.object,
  transactions: PropTypes.array,
  addTransactionStatus: PropTypes.number,
  jwt: PropTypes.string,
  user: PropTypes.object,

  addTransaction: PropTypes.func.isRequired,
  resetAddTransactionStatus: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies.all,
  currenciesTimestamp: state.currencies.timestamp,
  transactions: state.transactions.all,
  addTransactionStatus: state.transactions.addTransactionStatus,
  jwt: state.session.jwt,
  user: state.session.user,
});

const mapDispatchToProps = {
  getCurrencies: currenciesThunks.getCurrencies,
  addTransaction: transactionsThunks.addTransaction,
  getTransactions: transactionsThunks.getTransactions,
  resetAddTransactionStatus: transactionsThunks.resetAddTransactionStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
