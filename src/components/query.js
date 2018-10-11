import React, { Component } from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.onClick} >Find out</button>
    )
  }
}
