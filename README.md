1. [Overview](#overview)
1. [Project stack](#project-stack)
1. [Setup Server Side](#setup-server-side)
1. [Setup Cookies](#setup-cookies)
1. [OAUTH Authentication](#oauth-authentication)
1. [Initial Boilerplate for React-Redux-Router](#initial-boilerplate-for-react-redux-router)
1. [Setup Client React Setup](#setup-client-react-setup)
1. [Email Provider Setup](#email-provider-setup)
1. [Deployment proccess](#deployment-proccess)


## Overview
=====================

Base Project used for boilerplate

first run:

run `npm install` inside `/server` and `/server/client` 

to run the project:
`npm run dev` inside `/server`


## Project Stack

- Node.js
- Express
- Mongo `mlab`
- React & Redux
- Passport.js `for oauth athentication`
- SendGrid  `email handling`
- Heroku
- Stripe `payments handling `


## Setup Server Side
=====================

````javascript
// Revisar essa aula para anotaçes

1) Setup Project/Node
2) Setup Mongo
3) Setup Express
````

````javascript
//index.js

const express = require("express");
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

//Import mongo collections -> The files dont use module.exports, so we should require here
require('./models/User')
require('./models/Survey')
require('./services/passport')

// Connect to mongo with mongo Key -> used mongoLab stuff
mongoose.connect(keys.mongoURI)

//Initiate the server
const app = express();

//Use some middlewares to deal with security(helmet / cookies) or body treatment (body parser) 
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, // 1 month in milliseconds
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

//Another way to organize routes on index.js
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'))
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })


}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
````

## Setup Cookies
======================

There are two main approachs for cookies: cookie-parse and not remember(revisar)

- `npm install --save cookie-session`
- There is a good article talking about many security checkup (helmet, header, etc)

````javascript

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, // 1 month in milliseconds
    keys: [keys.cookieKey] //something random string generate by you
  })
)

## OAUTH Authentication
======================

Using Passaport.js
You have to install two differentes modules: 
 - Passaport `general functions handling`
 - Passaport strategies `select specific service: Facebook / Google`
 
 Starting installing passport and passaport Google strategy:
 
 `npm install --save passport-google-ouath20`
 
 1) Go to console.developers.google.com
 2) Create and select your project
 3) Enable API `search for google+ API and them 'accessing user data with OAuth 2.0'`
 4) Fill some info into the consensus screen `get clientId and clientSecret`
 5) Create your credential
 
 
 ```javascript
 //index.js
 
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Use to not save in your session the Google/Facebbok Id, but your own database id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser");
  User.findById(id).then((user, err) => {
    done(null, user);
  });
});

 passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret, `just created into the step 3)
      callbackURL: "/auth/google/callback", //you need to setup that in your route.js
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const profileId = profile ? profile.id.toString() : false;
      const profileName = profile ? profile.displayName : "user" + profileId;
      if (profileId) {
        //Check if user exists in our database
        const existingUser = await User.findOne({ googleId: profileId });
        if (existingUser) {
          return done(null, existingUser);
        }
        //Create a new user
        const user = await new User({ googleId: profileId, name: profileName}).save();
        done(null, user);
      }
    }
  )
);

app.use(passport.initialize())
//Tell passport to use cookie-session
app.use(passport.session())

//Click button will redirect to that route
app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

//callback to second auth
app.get("/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect('/surveys')
  }
);

![alt-text](/images/cookie.png)
````

## How to connect Server and Client Side // Revisar
======================

He setup some approachs: 
- OBS: CreateReactApp 2.0 changed the way to use proxy, SEE on the last VIDEO from this section on course

- **node concurrently**, running server on port 5000, client on 3000 and using node concurrently
- Used a **proxy** confinguration on package.json to redirect requests to the same place
- Another approach would be dividing server and client into two different projects and do HTTP between
- Should revise why he choosed that approach (something about **Cookies and CORS**)

## Setup Client React Setup
````javascript
1) Install React App //Voltar na aula que ele ensinou isso, já não lembro o que tenho que fazer
````


## Initial Boilerplate for React-Redux-Router
======================

- Import materialize direct, better for performance keep the style out of javascript
- Create store and applyMiddleware with reduxThunk
- Envolve the first react component App.js with provider passing store as props

````javascript
//index.js

import "materialize-css/dist/css/materialize.min.css"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'

import App from "./components/App";
import reducers from "./reducers"

const store = createStore(reducers, applyMiddleware(reduxThunk));

// Envolve the first top component with provider to give access to store from
//all components and pass store as a props.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root") //Id root at index.html
);
````
````javascript
//components/App.js

import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/surveys" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
````
````javascript
//reducers/index.js

import { combineReducers } from "redux";
import authReducer from "./dummyReducer";

export default combineReducers({
  auth: dummyReducer
})

````

````javascript
//reducers/dummyReducer.js

import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false

    default:
      return state;
  }
}
````

````javascript
//actions/index.js

import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/teste")

    dispatch({ type: FETCH_USER, payload: res.data });
};

````

````javascript
//actions/types.js

export const FETCH_USER = 'fetch_user'
````

## Email Provider Setup

Provider: SendGrid

1) Create account
2) Create API KEY: Settings > API KEY > Create your API KEY
3) Put the Key into the config/dev/key.js file and create the env variable into prod/key, add it to the env variables on Heroku/AWS
4) Install the npm module: sendgrid

## Y) Deployment process 

  1) Option 1: Build in your own machine and push do heroku
  2) Option 2: Push to Heroku and make him install dependencies and do the build
  3) Option 3: Use a CI/CD plataform and make the build process there
  4) Option 4: Docker (?)

## X) Important Tools

- Handle payments: Stripe and Recurly for monthly payments
- body-parser -> *express middleware* to parse all post body requests

