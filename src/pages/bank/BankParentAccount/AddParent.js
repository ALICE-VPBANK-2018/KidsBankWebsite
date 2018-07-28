import React, { Component } from 'react'
import { connect } from "react-redux";
import './index.css';
import toastr from 'toastr';
import {routeHistory} from '../../../store';
import { actions as parentAccountActions } from '../../../reducers/parentAccount/actions';
class AddParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: { name: '', address: '', cartID: '', username: '', password: '' },
      loading : false
    }
  }
  componentWillMount() {
    this.setState({loading : this.props.loading});
  }
  updateName = (event) => {
    let account = this.state.account;
    account.name = event.target.value;
    this.setState({ account: account });
  }
  updateAddress = (event) => {
    let account = this.state.account;
    account.address = event.target.value;
    this.setState({ account: account });
  }
  updateCartID = (event) => {
    let account = this.state.account;
    account.cartID = event.target.value;
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
  componentWillReceiveProps(nextProps) {
    this.setState({loading : nextProps.loading});
  }
  saveAccount = (event) => {
    event.preventDefault();
    let account = this.state.account;
    if (!account.username.trim() || !account.password.trim() || !account.cartID.trim()
          || !account.name.trim() || !account.address.trim()) {
      toastr.error("Please enter information");
    }else {
      this.props.addParentAccountToFirebase(account).then(() => {
        toastr.success("Add new account success");
        routeHistory.push("/admin/parent");
      }).catch(error => {
        toastr.error("Add new account error");
      })
    }    
  }
  render() {
    return (
      <div className="add-parent-container">
        <h3 className="add-parent-header"> Register for new Parent Account</h3>
        <div className="add-parent-information">
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
            <label htmlFor="address">Address:
            </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="address"
              onChange={(event) => { this.updateAddress(event) }} value={this.state.account.address}
              style={{ width: '80%' }} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="cartID">Cart ID
            </label>
            <input disabled={this.props.loading} type="text" className="form-control" name="cartID"
              onChange={(event) => { this.updateCartID(event) }} value={this.state.account.cartID}
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
    )
  }
}

const mapStateToProps = state => ({
  loading : state.ajax.isAjaxLoading
});

const mapDispatchToProps = {
  addParentAccountToFirebase: parentAccountActions.addParentAccountToFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParent);