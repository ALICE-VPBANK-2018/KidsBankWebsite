import React, { Component } from 'react'
import { connect } from "react-redux";
import toastr from 'toastr';
import './index.css';
import { actions as transactionActions } from '../../../reducers/transaction/actions';
import { actions as childrenAccountActions } from '../../../reducers/childrenAccount/actions';
class ParentTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loading: false,
      accounts: []
    }
  }
  componentWillMount() {
    if (this.props.accounts.length === 0) {
      let username = "user1";
      this.props.loadChildrenAccountByParentFromFirebase(username).then(() => {
        this.setState({ accounts: this.props.accounts });
      }).catch(() => {
        toastr.error("Error in load data");
      })
    } else {
      this.setState({ accounts: this.props.accounts });
    }
    if (this.props.transactions.length === 0) {
      console.log(this.state.accounts);
      let username = "child1";
      this.props.loadTransactionsByUsernameFromFirebase(username).then(() => {
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
    if (this.state.transactions !== [] && this.state.accounts !== []) {
      this.state.transactions.map(transaction => {
        let day = new Date(transaction.date);
        let format = this.formattedNumber(day.getHours()) + ":" + this.formattedNumber(day.getMinutes())
          + ":" + this.formattedNumber(day.getSeconds()) + " " + this.formattedNumber(day.getDate())
          + "/" + this.formattedNumber(day.getMonth() + 1) + "/" + this.formattedNumber(day.getFullYear());
        table.push(
          <tr key={index} className="transaction-row">
            <td>{this.state.accounts[0].name}</td>
            <td>{this.formatMoney(transaction.amount)}</td>
            <td>{transaction.type}</td>
            <td>{transaction.target}</td>
            <td>{format}</td>
          </tr>
        )
        index++;
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
                <th>Name</th>
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
  transactions: state.transaction.transactions,
  accounts: state.childrenAccount.accounts
});

const mapDispatchToProps = {
  loadTransactionsByUsernameFromFirebase: transactionActions.loadTransactionsByUsernameFromFirebase,
  loadChildrenAccountByParentFromFirebase: childrenAccountActions.loadChildrenAccountByParentFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentTransaction);