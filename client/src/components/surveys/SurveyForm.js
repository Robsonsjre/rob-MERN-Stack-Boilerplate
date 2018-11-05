import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmail from '../../utils/validEmail'
import { FIELDS } from './SurveyUtils'


class SurveyForm extends Component {

  renderFields() {
    return FIELDS.map(({ name, label }) => {
      return (
        <Field
          key={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      );
    });
  }
  render() {
    console.log('surveyForm')
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys">
            <button type="submit" className="red btn-flat left white-text">
              Cancel
            </button>
          </Link>
          <button onClick={this.props.onClickNext} type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}

  errors.emails = validateEmail(values.recipients || '')

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
    errors[name] = "you must fill with a value"
    }
  })



  return errors
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
