import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FIELDS } from './SurveyUtils'
import * as actions from '../../actions'

function renderContent(props) {
  return FIELDS.map(field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <p>{props.formValues[field.name]}</p>
      </div>
    )
  })
}

const SurveyConfirm = props => {
  console.log("props", props);
  return (
    <div>
      <h5>Please confirm your survey!</h5>
      {renderContent(props)}

      <button onClick={props.onClickBack} className="green darken-3 btn-flat left white-text">
        Voltar
      </button>
      <button onClick={() => props.createSurvey(props.formValues, props.history)} className="blue btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state)
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyConfirm));
