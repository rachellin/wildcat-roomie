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

click save --> save to db
post --> post to app
*/

export default class Entry extends React.Component {
    constructor() {
      super();
      this.state = {
        currentTab: 0,
        emailChecked: false, // for entering email to check but also creating new 
        emailMsg: "",
        email: "",
        about: {},
        basics: {},
        social: {},
        filters: []
      }
    }

    checkEmail = (e) => {
      e.preventDefault();
      const data = {};
      data.email = this.state.email;

      fetch('http://localhost:9000/api/profiles/addUser', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          console.log("user added");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        console.log("display message")
        if (data.error) this.setState({ emailMsg: data.error });
        else if (data.message) {
          this.setState({
            emailMsg: data.message,
            emailChecked: true
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ emailMsg: "an unknown error has occured" });
      });

      // api to check that email does not exist 
      // const exists = false;
      // if (!exists) {
      //   this.setState({ emailChecked: true })
      // } else {
      //   this.setState({ emailMsg: "This email is already associated with a profile. [Please choose to edit entry instead.]" });
      // }
      // get user id and save in state 

      // EDITING ENTRIES
      // const dbemail = "rachlin232@gmail.com";
      // if (this.state.email == dbemail) {
      //   this.setState({ emailChecked: true });
      // } else {
      //   this.setState({ emailMsg: "This email does not exist. Please try again." });
      // }
    }

    renderTab(i) {
      if (i == 0) {
        return <BasicsEntry basics={this.state.basics} social={this.state.social} updateData={this.updateData}/>;
      } else if (i == 1) {
        return <FilterEntry filters={this.state.filters} updateData={this.updateData}/>;
      } else {
        return <BioEntry about={this.state.about} updateData={this.updateData}/>;
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
      e.preventDefault();
      console.log(this.state);
    }
    
    render() {

      /*
      first name, last name, pronouns
      school, major, personality, location
      contact info

      filters
      roommate tagline/prompt TODO ?? 

      about me
      looking for 
      */

      if (!this.state.emailChecked) {
        return (
          <EntryContainer>
            <form className="enter-email" onSubmit={this.checkEmail}>
              <label className="required" for="email">email</label>
              <input 
                type="email" name="email" value={this.state.email} 
                onChange={this.handleChange} required/>
              <input type="submit" value="submit"/>
              {this.state.emailMsg}
              {/* <button onClick={() => {this.setState({ emailCheck: true })}}>submit</button> */}
            </form>
          </EntryContainer>
        )
      }

      return (
        <EntryContainer>
          <div className="nav">
            <button onClick={(e) => this.changeTab(0, e)}>basics</button>
            <button onClick={(e) => this.changeTab(1, e)}>filters</button>
            <button onClick={(e) => this.changeTab(2, e)}>bio</button>
            <button>submit</button>
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



