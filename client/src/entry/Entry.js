import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';

import { EmailEntry, EntryForm, EntryContainer } from '../style/Style';
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
    constructor(props) {
      super(props);
      this.state = {
        currentTab: 0,
        newEntry: this.props.newEntry,
        emailChecked: false, // for entering email to check but also creating new 
        emailMsg: "",
        entryMsg: "",
        email: "",
        userid: 0,
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
        if (data.error) this.setState({ emailMsg: data.error });
        else if (data.message) {
          // TODO: get user id and save in state 
          this.setState({
            userid: data.userid,
            emailMsg: data.message,
            emailChecked: true
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ emailMsg: "an unknown error has occured" });
      });


      // EDITING ENTRIES
      // const dbemail = "rachlin232@gmail.com";
      // if (this.state.email == dbemail) {
      //   this.setState({ emailChecked: true });
      // } else {
      //   this.setState({ emailMsg: "This email does not exist. Please try again." });
      // }
    }

    renderTab(i) {
      if (i == "basics") {
        return <BasicsEntry basics={this.state.basics} social={this.state.social} updateData={this.updateData}/>;
      } else if (i == "filters") {
        return <FilterEntry filters={this.state.filters} updateData={this.updateData}/>;
      } else {
        return <BioEntry about={this.state.about} updateData={this.updateData}/>;
      }
    }

    changeTab(i, e) {
      e.preventDefault();
      this.setState({ currentTab: i, entryMsg: "" });
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
      console.log("handling submit")

      let info;
      if (this.state.currentTab == "basics") {
        info = {
          firstName: this.state.firstName, 
          lastName: this.state.lastName,
          basics: this.state.basics,
          social: this.state.social
        }
      } else {
        let tab = this.state.currentTab;
        info = { [tab]: this.state[tab]};
        console.log(info);
      }

      const data = {
        userid: this.state.userid,
        data: info
        // but on basics page i have data that goe in multiple sections... 
        // data should be a parameter that is an object of what data im sending 
      }

      fetch('http://localhost:9000/api/profiles/update', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          console.log("info added");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        if (data.error) this.setState({ entryMsg: data.error });
        else if (data.message) {
          this.setState({
            entryMsg: data.message,
          });
          this.getData();
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ entryMsg: "an unknown error has occured" });
      });
    }

    getData() {
      console.log(`http://localhost:9000/api/profiles?userid=${this.state.userid}`);
      fetch(`http://localhost:9000/api/profiles?userid=${this.state.userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          console.log("got info");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        if (data.error) this.setState({ entryMsg: data.error }); // need to fix this 
        else {
          // display data 
          console.log(data);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ entryMsg: "an unknown error has occured" });
      });
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
          <EmailEntry>
            <form onSubmit={this.checkEmail}>
              <label for="email">new entry</label>
              <input 
                type="email" name="email" value={this.state.email} 
                onChange={this.handleChange} placeholder="email" required/>
              <input type="submit" value="submit"/>
              {this.state.emailMsg}
            </form>
          </EmailEntry>
        )
      }

      return (
        <EntryContainer>
          <div className="nav">
            <button onClick={(e) => this.changeTab("basics", e)}>basics</button>
            <button onClick={(e) => this.changeTab("filters", e)}>filters</button>
            <button onClick={(e) => this.changeTab("about", e)}>about</button>
            <button>submit</button>
          </div>

          <EntryForm onSubmit={this.handleSubmit}>
            {this.renderTab(this.state.currentTab)}
            <input type="submit" value="save"/>
            {this.state.entryMsg}
          </EntryForm>

        </EntryContainer>
      );
    }
  }

  Entry.defaultProps = {
    newEntry: true
  }

  const formStyle = {
    border: "1px solid #eee",
    width: "50vw",
    margin: "auto",
    padding: "2rem"
  }

  // when save is clicked, the values are saved in the state. when the submit button is clicked, db is updated 



