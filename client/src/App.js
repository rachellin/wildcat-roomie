import logo from './logo.svg';
import './css/App.css';
import './css/animations.css';
import Container from './Container'; 
import Entry from './Entry';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React from 'react';

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

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/entry">Secret</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Container} />
            <Route path="/entry" component={Entry} />
          </Switch>
        </div>
      </Router>
    );
  }
}

