import { Button, Table, Label, Menu, Icon } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react'

import { transactionsThunks } from "state/ducks/transactions";
import styles from './transactions.scss';

export class Transactions extends Component {
  componentWillMount() {
    const { getTransactions, user, jwt } = this.props;

    getTransactions(user.id, jwt);
  }

  render() {
    const { transactions } = this.props;

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
              <Table.Row>
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
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

Transactions.propTypes = {
  getTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transactions: state.transactions.all,
  jwt: state.session.jwt,
  user: state.session.user,
});

const mapDispatchToProps = {
  getTransactions: transactionsThunks.getTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
