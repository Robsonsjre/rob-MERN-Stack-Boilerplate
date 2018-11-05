import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(a, b) {
    this.setState({name: a.target.value})
    this.props.handleInput('name', this.state.name)
  }

  render() {
    return (
      <div>
        Dashboard
        <input label='Name' type='text' onChange={this.handleInput} value={this.state.name}></input>
        <div className="fixed-action-btn">
          <Link to='/surveys/new' className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
        <h3>{this.state.name}</h3>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
