import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name="INSEAD"
          description="$5 buy your bundle points"
          amount={500}
          token={this.props.handleToken}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
         >
           <button className="btn">Add Credits</button>
         </StripeCheckout>
      </div>
    );
  }
}

export default Payments;
