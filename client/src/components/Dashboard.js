import React from "react";
import { Link } from 'react-router-dom'

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
  }

  render() {
    return (
      <div>
        Dashboard
        <input label='Name' type='text' onChange={this.handleInput} value={this.state.name}></input>
        <div class="fixed-action-btn">
          <Link to='/surveys/new' class="btn-floating btn-large red">
            <i class="large material-icons">add</i>
          </Link>
        </div>
        <h3>{this.state.name}</h3>
      </div>
    );
  }
}

export default Dashboard;
