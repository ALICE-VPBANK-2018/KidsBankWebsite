import React, { Component } from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router';

class ParentBar extends Component {
  render() {
    return (
      <div>
        <nav className="bank-bar navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#" style={{color: '#ffffff'}}>KidsBank Management</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/parent/children" style={{color: '#ffffff'}}>My Children</Link></li>
              <li><Link to="/parent/transaction" href="#" style={{color: '#ffffff'}}>Transaction</Link></li>
              <li><Link to="/parent/send" href="#" style={{color: '#ffffff'}}>Send Money</Link></li>
             {/* <li><Link to="/admin/transaction" href="#" style={{color: '#ffffff'}}>Feed Back</Link></li> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentBar);