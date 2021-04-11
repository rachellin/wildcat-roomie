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
        currentTab: "basics",
        newEntry: this.props.newEntry,
        emailChecked: false, // for entering email to check but also creating new 
        emailMsg: "",
        entryMsg: "",
        email: "",
        userId: 0,
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

      if (this.state.newEntry) {
        this.addUser(data);
      } else {
        this.getData();
      }


      // EDITING ENTRIES
      // const dbemail = "rachlin232@gmail.com";
      // if (this.state.email == dbemail) {
      //   this.setState({ emailChecked: true });
      // } else {
      //   this.setState({ emailMsg: "This email does not exist. Please try again." });
      // }
    }

    addUser(data) {
      console.log("calling addUser")
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
            userId: data.userId,
            emailMsg: data.message,
            emailChecked: true
          });
          this.getData();
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ emailMsg: "an unknown error has occured" });
      });
    }

    renderTab(i) {
      if (i == "basics") {
        return <BasicsEntry 
                basics={this.state.basics} 
                social={this.state.social} 
                firstName={this.state.firstName} lastName={this.state.lastName}
                updateData={this.updateData}/>;
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
      console.log(target, value);
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
      }

      const data = {
        userId: this.state.userId,
        data: info
        // but on basics page i have data that goe in multiple sections... 
        // data should be a parameter that is an object of what data im sending 
      }
      console.log("data\n", data);

      console.log("updating profile")
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
          this.setState({ entryMsg: "" });
          setTimeout(() => {
            this.setState({ entryMsg: data.message });
          }, 500);
          this.getData();
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ entryMsg: "an unknown error has occured" });
      });
    }

    getData() {
      console.log("calling getData")
      fetch(`http://localhost:9000/api/profiles?email=${this.state.email}`, {
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
        if (data.error) {
          if (!this.state.newEntry) {
            this.setState({ emailMsg: data.error });
          } else {
            this.setState({ entryMsg: data.error }); 
          }
        }
        else {
          // display data in the form(s) 
          const snakeToCamel = snakeCaseString => snakeCaseString.replace(/([-_]\w)/g, g => g[1].toUpperCase());
          console.log(data);
          this.setState({ firstName: "", lastName: "", about: {}, basics: {}, social: {}, filters: [] });
          let keys = Object.keys(data);
          for (let i = 0; i < keys.length; i++) {
            if (data[keys[i]] !== null) this.setState({ [snakeToCamel(keys[i])]: data[keys[i]] });
          }
          if (!this.state.newEntry) this.setState({ emailChecked: true });
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
              <label for="email">{this.state.newEntry ? "new entry" : "edit entry"}</label>
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
    newEntry: false
  }

  const formStyle = {
    border: "1px solid #eee",
    width: "50vw",
    margin: "auto",
    padding: "2rem"
  }

  // when save is clicked, the values are saved in the state. when the submit button is clicked, db is updated 



