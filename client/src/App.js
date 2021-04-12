import './css/App.css';
import './css/animations.css';

import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import withAuth from './account/withAuth';

import Container from './Container'; 
import Entry from './entry/Entry';
import {Login } from './account/Login';
import Authenticate from './account/Authenticate';

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Footer from './Components/Layout/Footer';
// import Home from './Components/Layout/Home';
// import Social from './Components/social/Social';

// function App() {
//   return (
//     <div className="App">
//       <Container/>
//     </div>
//   );
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newEntry: true,
    }
  }

  render () {
    return (
      //<Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link onClick={() => this.setState({ newEntry: false })} to="/entry">Edit Entry</Link></li>
            <li><Link onClick={() => this.setState({ newEntry: true })} to="/entry">New Entry</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Container} />
            {/* <Route path="/entry" component={withAuth(Entry)} /> */}
            <Route path="/entry" key={`${this.state.newEntry}`} exact render={() => <Entry newEntry={this.state.newEntry}/>}/>
            <Route path="/auth" component={Authenticate} />
          </Switch>
        </div>
      //</Router>
    );
  }
}

export default withRouter(App);

