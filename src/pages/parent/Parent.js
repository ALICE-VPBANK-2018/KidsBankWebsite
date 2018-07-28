import React, { Component } from 'react'
import ParentBar from '../../components/ParentBar';

export default class Parent extends Component {
  render() {
    return (
      <div className="admin-page">
        <div className="admin-sidebar"><ParentBar /></div>
        <div className="admin-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
