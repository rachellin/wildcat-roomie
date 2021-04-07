import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';

import { EntryForm, EntryContainer } from '../style/Style';
import { FilterEntry } from './FilterEntry';
import { BioEntry } from './BioEntry';
import { BasicsEntry } from './BasicsEntry';

/*
click on entry button
open this component
enter info
submit 
call api to insert data into database if user not present
but user account????
*/

export default class Entry extends React.Component {
    constructor() {
      super();
      this.state = {
        currentTab: 0,
        about: "",
        looking: "",
        test: ""
      }
    }

    renderTab(i) {
      if (i == 0) {
        return <BasicsEntry/>;
      } else if (i == 1) {
        return <FilterEntry/>;
      } else {
        return <BioEntry updateData={this.updateData}/>;
      }
    }

    changeTab(i, e) {
      e.preventDefault();
      this.setState({ currentTab: i });
    }

    updateData = (target, value) => {
      this.setState({ [target]: value });
    };

    handleChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (e) => {
      alert("submitted")
      e.preventDefault();
      console.log(this.state.about)
    }
    
    render() {

      /*
      first name, last name, pronouns
      school, major, personality, location
      contact info

      filters
      roommate tagline/prompt

      about me
      looking for 
      */

      return (
        <EntryContainer>
          <div className="nav">
            <button onClick={(e) => this.changeTab(0, e)}>basics</button>
            <button onClick={(e) => this.changeTab(1, e)}>filters</button>
            <button onClick={(e) => this.changeTab(2, e)}>bio</button>
          </div>

          <EntryForm onSubmit={this.handleSubmit}>
            {this.renderTab(this.state.currentTab)}
            <input type="submit" value="save"/>
          </EntryForm>

        </EntryContainer>
      );
    }
  }

  const formStyle = {
    border: "1px solid #eee",
    width: "50vw",
    margin: "auto",
    padding: "2rem"
  }

  // when save is clicked, the values are saved in the state. when the submit button is clicked, db is updated 



