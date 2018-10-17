import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from './Payments'
import * as actions from '../actions'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google/">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1"><Payments handleToken={this.props.handleToken}/></li>,
          <li key="2" style={{ margin: '0 10px'}}>Credits : {this.props.auth.credits}</li>,
          <li key="3"><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={"/"}
              className="left brand-logo"
            >
              INSEAD
            </Link>
            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Header);
