import React from 'react';

export default class extends React.Component {

  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     ...props.result
  //   }
  // }

  render() {
    return (
      <div>
        <h2 id="answer">{this.props.result.answer}</h2>
        <h2 id="description">{this.props.result.description}</h2>
      </div>
    )
  }
}
