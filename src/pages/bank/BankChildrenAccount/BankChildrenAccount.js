import React, { Component } from 'react'
import { connect } from "react-redux";
import toastr from 'toastr';
import './index.css';
import { Link } from 'react-router';
import { actions as childrenAccountActions } from '../../../reducers/childrenAccount/actions';
class BankChildrenAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      loading: false
    }
  }
  componentWillMount() {
    if (this.props.accounts.length === 0) {
      this.props.loadChildrenAccountFromFirebase().then(() => {
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
  renderChildrenAccounts = () => {
    let table = [];
    if (Object.keys(this.state.accounts).length > 0) {
      this.state.accounts.map(account => {
        let day = new Date(account.DOB);
        table.push(
          <tr key={account.username} className="account-row">
            <td>{account.username}</td>
            <td>{account.name}</td>
            <td>{Math.floor((Date.now() - day) / 31557600000)}</td>
          </tr>
        )
      })
    }
    return table;
  }
  render() {
    return (
      <div className="bank-account-container">
        <h3 className="add-children-header"> Children Account</h3>
        <Link to="/admin/children/add">
          <button type="button" className="btn btn-success add-button">
            <span className="glyphicon glyphicon-plus" style={{marginRight: '4%'}}></span>
             Add New Children Account
          </button>
        </Link>
        <div className="bank-account-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {this.renderChildrenAccounts()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  loading: state.ajax.isAjaxLoading,
  accounts: state.childrenAccount.accounts
});

const mapDispatchToProps = {
  loadChildrenAccountFromFirebase: childrenAccountActions.loadChildrenAccountFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(BankChildrenAccount);