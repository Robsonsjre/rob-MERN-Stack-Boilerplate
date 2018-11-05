import React, { Component } from "react";
import { reduxForm } from 'redux-form'
import SurveyForm from "./SurveyForm";
import SurveyConfirm from "./SurveyConfirm";

class SurveyNew extends Component {
  constructor() {
    super();
    this.state = {
      showForm: true
    };
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleShowForm() {
    console.log('caiu aqui')
    this.setState({ showForm: false });
  }

  handleBackButton() {
    this.setState({ showForm: true })
  }

  render() {
    return (
      <div>{this.state.showForm ? <SurveyForm onClickNext={this.handleShowForm} /> : <SurveyConfirm onClickBack={this.handleBackButton}/>}</div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
