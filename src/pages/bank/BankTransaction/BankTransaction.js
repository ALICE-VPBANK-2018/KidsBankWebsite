import React, { Component } from 'react'
import { connect } from "react-redux";
import toastr from 'toastr';
import './index.css';
import { actions as transactionActions } from '../../../reducers/transaction/actions';
class BankTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions : [],
      loading : false
    }
  }
  componentWillMount() {
    if (this.props.transactions.length === 0) {
      this.props.loadTransactionsFromFirebase().then(() => {
        this.setState({ transactions: this.props.transactions });
        console.log(this.state.transactions);
      }).catch(() => {
        toastr.error("Error in load data");
      })
    } else {
      this.setState({ transactions: this.props.transactions });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading, transactions: nextProps.transactions });
  }
  formatMoney(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  formattedNumber(number) {
    return ("0" + number).slice(-2);
  }
  renderTransactions = () => {
    let table = [];
    let index = 0;
    if (Object.keys(this.state.transactions).length > 0) {
      this.state.transactions.map(transaction => {
        let day = new Date(transaction.date);
        let format = this.formattedNumber(day.getHours()) +":" + this.formattedNumber(day.getMinutes())
                       + ":" + this.formattedNumber(day.getSeconds()) + " " + this.formattedNumber(day.getDate())
                       +"/"+this.formattedNumber(day.getMonth() + 1)+"/"+this.formattedNumber(day.getFullYear());
        table.push(
          <tr key={index} className="transaction-row">
            <td>{transaction.username}</td>
            <td>{this.formatMoney(transaction.amount)}</td>
            <td>{transaction.type}</td>
            <td>{transaction.target}</td>
            <td>{format}</td>
          </tr>
        )
        index ++;
      })
    }
    return table;
  }
  render() {
    return (
      <div className="bank-transaction-container">
        <h3 className="add-transaction-header"> Transaction</h3>
        <div className="bank-transaction-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Amount (VNĐ)</th>
                <th>Type</th>
                <th>Target</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTransactions()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  loading: state.ajax.isAjaxLoading,
  transactions : state.transaction.transactions
});

const mapDispatchToProps = {
  loadTransactionsFromFirebase: transactionActions.loadTransactionsFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(BankTransaction);