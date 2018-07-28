import React, { Component } from 'react'
import BankBar from '../../components/BankBar';

export default class Bank extends Component {
  render() {
    return (
      <div className="admin-page">
        <div className="admin-sidebar"><BankBar /></div>
        <div className="admin-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
