import React, { Component } from 'react'
import { connect } from "react-redux";
import './index.css';
import toastr from 'toastr';
import { actions as transactionActions } from '../../../reducers/transaction/actions';

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: { username: '', type: 'in', amount: '', date: Date.now(), content: '', target: '' },
      loading: false
    }
  }
  componentWillMount() {
    this.setState({ loading: this.props.loading });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading });
  }
  updateUsername = (event) => {
    let transaction = this.state.transaction;
    transaction.username = event.target.value;
    this.setState({ transaction: transaction });
  }
  updateType = (event) => {
    let transaction = this.state.transaction;
    transaction.type = event.target.value;
    this.setState({ transaction: transaction });
  }
  updateAmount = (event) => {
    let transaction = this.state.transaction;
    transaction.amount = event.target.value;
    this.setState({ transaction: transaction });
  }
  updateContent = (event) => {
    let transaction = this.state.transaction;
    transaction.content = event.target.value;
    this.setState({ transaction: transaction });
  }
  updateDate = (event) => {
    let transaction = this.state.transaction;
    transaction.date = event.target.value;
    this.setState({ transaction: transaction });
  }
  updateTarget = (event) => {
    let transaction = this.state.transaction;
    transaction.target = event.target.value;
    this.setState({ transaction: transaction });
  }
  saveTransaction = (event) => {
    event.preventDefault();
    let transaction = this.state.transaction;
    if (!transaction.username.trim() || !transaction.type.trim() || !transaction.amount.trim()
        || !transaction.content.trim() || !transaction.target.trim()) {
      toastr.error("Please enter information");
    } else {
      this.props.addTransactionToFirebase(transaction).then(() => {
        toastr.success("Add new transaction success");
      }).catch((error) => {
        console.log(error);
        toastr.error("Add new transaction error");
      })
    }
  }
  render() {
    return (
      <div className="add-transaction-container">
        <h3 className="add-transaction-header"> New Transaction</h3>
        <div className="add-transaction-information">
          <div className="form-group form-inline">
            <label htmlFor="username">Username
            </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="username"
              onChange={(event) => { this.updateUsername(event) }} value={this.state.transaction.username}
              style={{ width: '80%' }} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="type">Type
            </label>
            <select {...this.props.loading ? " disabled " : ""} name="type" onChange={(event) => { this.updateType(event) }}>
              <option value="in" {...this.state.transaction.type === "in" ? " selected " : ""}>In</option>
              <option value="out" {...this.state.transaction.type === "out" ? " selected " : ""}>Out</option>
            </select>
          </div>
          <div className="form-group form-inline">
            <label htmlFor="amount">Amount (VNĐ)
            </label>
            <input disabled={this.props.loading} type="number" className="form-control" name="amount"
              onChange={(event) => { this.updateAmount(event) }} value={this.state.transaction.amount}
              style={{ width: '80%' }}/>
          </div>
          
          <div className="form-group form-inline">
            <label htmlFor="content">Content:
            </label>
            <textarea rows={4} disabled={this.props.loading} className="form-control" name="content"
              onChange={(event) => { this.updateContent(event) }} value={this.state.transaction.content}
              style={{ width: '80%' }}></textarea>
          </div>
          <div className="form-group form-inline">
            <label htmlFor="target">Target
            </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="target"
              onChange={(event) => { this.updateTarget(event) }} value={this.state.transaction.target}
              style={{ width: '80%' }} />
          </div>
          <div className="form-group form-inline">
            <button disabled={this.props.loading} type="button" className="btn btn-success"
              onClick={(event) => { this.saveTransaction(event) }}>
              {this.props.loading ? "Saving" : "Save"}
            </button>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.ajax.isAjaxLoading
});

const mapDispatchToProps = {
  addTransactionToFirebase: transactionActions.addTransactionToFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);