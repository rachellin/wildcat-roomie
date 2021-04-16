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

function noop() {}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newEntry: false,
    }
  }

  render () {
    if (process.env.NODE_ENV !== 'development') {
      console.log = noop;
      console.warn = noop;
      console.error = noop;
    }
    
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
          <a target="_blank" href="https://forms.gle/NfMPxFaHm31YySf66">feedback</a>
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

