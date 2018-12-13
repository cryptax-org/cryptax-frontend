import { Button, Container, Table, Header, Menu, Icon, Segment, Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import groupBy from 'lodash/groupBy';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from 'react';

import { AddTransactionModal } from 'components';
import { currenciesThunks } from 'state/ducks/currencies';
import styles from './transactions.scss';
import { transactionsThunks } from 'state/ducks/transactions';
import { withResponsiveWrapper } from 'enhancers';

export class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderedTransactions: {},
    };
  }

  componentWillMount() {
    const {
      getCurrencies,
      currencies,
      currenciesTimestamp,
      getTransactions,
      user,
    } = this.props;

    getTransactions(user.id);

    if (!currencies.lenght) {
      getCurrencies();
    }
  };

  componentDidUpdate(prevProps) {
    const { transactions } = this.props;
    if (transactions !== prevProps.transactions) {
      this.setState({ orderedTransactions: groupBy(transactions, 'source') })
    }
  }

  addTransactionWrapper = transaction => {
    const { addTransaction, user } = this.props;

    addTransaction(user.id, transaction);
  };

  onChangeFile = event => {
    const { files } = event.target;
    const { addTransactionsFile, user } = this.props;

    Object.values(files).map(file => {
      addTransactionsFile(user.id, file, 'binance');
    });
  };

  onEdit = transaction => {
    console.log(transaction);
  };

  onDelete = transaction => {
    console.log(transaction);
  }

  render() {
    const { currencies, addTransactionStatus } = this.props;

    const { orderedTransactions } = this.state;

    return (
      <div>
        <Container className={styles.buttonsWrapper}>
          <Segment color="grey">
            <AddTransactionModal
              addTransaction={this.addTransactionWrapper}
              addTransactionStatus={addTransactionStatus}
              sourceCurrencies={currencies}
            />
            <Button
              as='label'
              floated='right'
              htmlFor='upload'
              icon
              labelPosition='left'
              primary size='large'
            >
              <Icon name='upload' /> Import Transactions
              <input
                  hidden
                  id='upload'
                  multiple
                  type="file"
                  onChange={this.onChangeFile} />
            </Button>
          </Segment>
        </Container>

        <Grid divided='vertically'>
          {Object.keys(orderedTransactions).map(exchange => (
            <Grid.Row columns={1}>
              <Grid.Column>
                <Container className={styles.exchange}>
                  <Header as='h1'>{exchange.toUpperCase()}</Header>
                  <Table celled color='red' sortable striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Currency 1</Table.HeaderCell>
                        <Table.HeaderCell>Currency 2</Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {orderedTransactions[exchange].map(transaction => (
                        <Table.Row key={transaction.id}>
                          <Table.Cell>{transaction.date}</Table.Cell>
                          <Table.Cell>{transaction.type}</Table.Cell>
                          <Table.Cell>{transaction.price}</Table.Cell>
                          <Table.Cell>{transaction.quantity}</Table.Cell>
                          <Table.Cell>{transaction.currency1}</Table.Cell>
                          <Table.Cell>{transaction.currency2}</Table.Cell>
                          <Table.Cell collapsing>
                            <Button.Group size='tiny'>
                              <Button
                                animated='vertical'
                                htmlFor='edit'
                                onClick={() => this.onEdit(transaction)}
                                size='mini'
                              >
                                <Button.Content hidden>Edit</Button.Content>
                                <Button.Content visible>
                                  <Icon name='edit' />
                                </Button.Content>
                              </Button>
                              <Button
                                animated='vertical'
                                color='red'
                                htmlFor='edit'
                                onClick={() => this.onDelete(transaction)}
                                size='mini'
                              >
                                <Button.Content hidden>Delete</Button.Content>
                                <Button.Content visible>
                                  <Icon name='delete' />
                                </Button.Content>
                              </Button>
                            </Button.Group>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Container>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    )
  };
};

Transactions.propTypes = {
  currencies: PropTypes.array,
  currenciesTimestamp: PropTypes.object,
  transactions: PropTypes.array,
  addTransactionStatus: PropTypes.number,
  user: PropTypes.object,

  addTransaction: PropTypes.func.isRequired,
  addTransactionsFile: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  resetAddTransactionStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies.all,
  currenciesTimestamp: state.currencies.timestamp,
  transactions: state.transactions.all,
  addTransactionStatus: state.transactions.addTransactionStatus,
  user: state.session.user,
});

const mapDispatchToProps = {
  getCurrencies: currenciesThunks.getCurrencies,
  addTransaction: transactionsThunks.addTransaction,
  addTransactionsFile: transactionsThunks.addTransactionsFile,
  getTransactions: transactionsThunks.getTransactions,
  resetAddTransactionStatus: transactionsThunks.resetAddTransactionStatus,
};

export default withResponsiveWrapper(connect(mapStateToProps, mapDispatchToProps)(Transactions));
