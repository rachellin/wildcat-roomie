import './css/App.css';
import './css/animations.css';

import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';

import Container from './Container'; 
import Entry from './entry/Entry';
import { Instructions } from './Instructions';
import { Housing } from './Housing';
import { RoommateHelp } from './RoommateHelp';

import { StyledContainer } from './style/ProfileStyles';

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
      newEntry: false,
    }
  }

  render () {
    return (
      //<Router>
      <StyledContainer>
        <div className="header">
          <h1>wildcat roomie</h1>
          <Link to="/">home</Link>
          <Link to="/instructions">instructions</Link>
          <Link onClick={() => this.setState({ newEntry: false })} to="/entry">edit profile</Link>
          <Link onClick={() => this.setState({ newEntry: true })} to="/entry">new profile</Link>
          <Link to="/housing">housing info</Link>
          <Link to="/help">roommate help</Link>
          <a href="">feedback</a>
        </div>

        <Switch>
          <Route path="/" exact component={Container} />
          <Route path="/instructions" component={Instructions}/>
          <Route path="/entry" key={`${this.state.newEntry}`} exact render={() => <Entry newEntry={this.state.newEntry} history={this.props.history}/>}/>
          <Route path="/housing" component={Housing}/>
          <Route path="/help" component={RoommateHelp}/>
        </Switch>

      </StyledContainer>
      //</Router>
    );
  }
}

export default withRouter(App);

