import React, { Component } from 'react'
import { connect } from "react-redux";
import './index.css';
import toastr from 'toastr';
import { routeHistory } from '../../../store';
import { actions as childrenAccountActions } from '../../../reducers/childrenAccount/actions';

import 'react-datepicker/dist/react-datepicker.css';

class AddChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: { name: '', username: '', password: '', DOB: '', parentUsername: 'user1' }
    }
  }
  componentWillMount() {
    this.setState({ loading: this.props.loading });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading });
  }
  updateName = (event) => {
    let account = this.state.account;
    account.name = event.target.value;
    this.setState({ account: account });
  }
  updateUsername = (event) => {
    let account = this.state.account;
    account.username = event.target.value;
    this.setState({ account: account });
  }
  updatePassword = (event) => {
    let account = this.state.account;
    account.password = event.target.value;
    this.setState({ account: account });
  }
  updateDOB = (event) => {
    let account = this.state.account;
    account.DOB = event.target.value;
    this.setState({ account: account });
  }
  saveAccount = (event) => {
    event.preventDefault();
    let account = this.state.account;
    if (!account.username.trim() || !account.password.trim() || !account.DOB.trim()
          || !account.name.trim()) {
      toastr.error("Please enter information");
    }else {
      console.log(this.state.account);
      this.props.addChildrenAccountToFirebase(account).then(() => {
        toastr.success("Add new account success");
        routeHistory.push("/parent/children");
      }).catch(error => {
        toastr.error("Add new account error");
      })
    }    
  }
  render() {
    return (
      <div>
        <div className="add-children-container">
          <h3 className="add-children-header"> Register for new Children Account</h3>
          <div className="add-children-information">
            <div className="form-group form-inline">
              <label htmlFor="username">Username
            </label>
              <input disabled={this.props.loading} type="text" className="form-control" name="username"
                onChange={(event) => { this.updateUsername(event) }} value={this.state.account.username}
                style={{ width: '80%' }} />
            </div>
            <div className="form-group form-inline">
              <label htmlFor="password">Password
            </label>
              <input disabled={this.props.loading} type="password" className="form-control" name="password"
                onChange={(event) => { this.updatePassword(event) }} value={this.state.account.password}
                style={{ width: '80%' }} />
            </div>
            <div className="form-group form-inline">
              <label htmlFor="name">Name:
            </label>
              <input disabled={this.props.loading} type="text" className="form-control" name="name"
                onChange={(event) => { this.updateName(event) }} value={this.state.account.name}
                style={{ width: '80%' }} />
            </div>
            <div className="form-group form-inline">
              <label htmlFor="DOB">Date Of Birth</label>
              <input disabled={this.props.loading} type="date" className="form-control" name="DOB"
                onChange={(event) => { this.updateDOB(event) }} value={this.state.account.DOB}
                style={{ width: '80%' }} />
            </div>
            <div className="form-group form-inline">
              <button disabled={this.props.loading} type="button" className="btn btn-success"
                onClick={(event) => { this.saveAccount(event) }}>
                {this.props.loading ? "Saving" : "Save"}
              </button>
            </div>

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
  addChildrenAccountToFirebase: childrenAccountActions.addChildrenAccountToFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChildren);