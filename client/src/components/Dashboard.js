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

  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderList() {
    if (!this.props.surveys) return
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={Math.random()}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">LastUpdate: {survey.lastResponded }</p>
            <div className="card-action">
              <a>YES:  {survey.yes}</a>
              <a>NO:  {survey.no}</a>
            </div>
          </div>
        </div>
      )
    })
  }

  handleInput(a, b) {
    this.setState({name: a.target.value})
    this.props.handleInput('name', this.state.name)
  }

  render() {
    return (
      <div>
        Dashboard
        {this.renderList()}
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

function mapStateToProps(state) {
  console.log('statesssssssssssss', state)
  return {
    surveys: state.surveys
  }
}

export default connect(mapStateToProps, actions)(Dashboard);
