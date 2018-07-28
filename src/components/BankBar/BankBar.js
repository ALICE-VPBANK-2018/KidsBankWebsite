import React, { Component } from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router';

class BankBar extends Component {
  render() {
    return (
      <div>
        <nav className="bank-bar navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#" style={{color: '#ffffff'}}>KidsBank Management</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/admin/parent" style={{color: '#ffffff'}}>Parent Accounts</Link></li>
              <li><Link to="/admin/children" href="#" style={{color: '#ffffff'}}>Children Accounts</Link></li>
              <li><Link to="/admin/transaction" href="#" style={{color: '#ffffff'}}>Transaction</Link></li>
            </ul>
          </div>
        </nav>

      </div>
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BankBar);