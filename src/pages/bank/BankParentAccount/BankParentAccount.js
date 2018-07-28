import React, { Component } from 'react'
import { connect } from "react-redux";
import toastr from 'toastr';
import './index.css';
import { actions as parentAccountActions } from '../../../reducers/parentAccount/actions';
import { Link } from 'react-router';
class BankParentAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      loading: false
    }
  }
  componentWillMount() {
    if (this.props.accounts.length === 0) {
      this.props.loadParentAccountFromFirebase().then(() => {
        this.setState({ accounts: this.props.accounts });
      }).catch(() => {
        toastr.error("Error in load data");
      })
    } else {
      this.setState({ accounts: this.props.accounts });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading, accounts: nextProps.accounts });
  }
  renderParentAccounts = () => {
    let table = [];
    if (Object.keys(this.state.accounts).length > 0) {
      this.state.accounts.map(account => {
        table.push(
          <tr key={account.username} className="account-row">
            <td>{account.username}</td>
            <td>{account.name}</td>
            <td>{account.address}</td>
          </tr>
        )
      })
    }
    return table;
  }

  render() {
    return (
      <div className="bank-account-container">
        <h3 className="add-parent-header"> Parent Account</h3>
        <Link to="/admin/parent/add">
          <button type="button" className="btn btn-success add-button">
            <span className="glyphicon glyphicon-plus" style={{marginRight: '4%'}}></span>
             Add New Parent Account
          </button>
        </Link>
        <div className="bank-account-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {this.renderParentAccounts()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.ajax.isAjaxLoading,
  accounts: state.parentAccount.accounts
});

const mapDispatchToProps = {
  loadParentAccountFromFirebase: parentAccountActions.loadParentAccountFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(BankParentAccount);