import React from 'react'

class Landing extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>
          Rob MERN Full Stack Boilerplate!
        </h1>
        <h2> Stack: </h2>
        <ul>
          <li> React </li>
          <li> React Router DOM</li>
          <li> Redux + Redux_Dev_tools </li>
          <li> MongoDB </li>
          <li> Node.Js </li>
          <li> Passaport.js for OUATH </li>
          <li> Stripe for Payments </li>
          <li> SendGrid for Email </li>
        </ul>
      </div>
    )
  }
}

export default Landing
