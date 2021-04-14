import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';

import { EmailEntry, EntryForm, EntryContainer } from '../style/Style';
import { FilterEntry } from './FilterEntry';
import { BioEntry } from './BioEntry';
import { BasicsEntry } from './BasicsEntry';

export default class Entry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTab: "basics",
        newEntry: this.props.newEntry,
        emailChecked: false, // for entering email to check but also creating new 
        emailMsg: "",
        entryMsg: "",
        postMsg: "",
        email: "",
        userId: 0,
        about: {},
        basics: {},
        social: {},
        filters: [],
        img: null, // set to default pic?
        imgDelete: null,
        roommate: false,
        isPosted: false
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
                firstName={this.state.firstName} lastName={this.state.lastName} roommate={this.state.roommate}
                updateData={this.updateData} handleImg={(data, deleting) => this.handleImg(data, deleting)}
                image={this.state.img}/>;
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
          social: this.state.social,
          roommate: this.state.roommate
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
      this.callUpdate(data, false);
    }

    callUpdate(data, posting) {
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
            if (posting) {
              this.setState({ entryMsg: "Your profile has been posted! Head over to the homepage to look :)"});
            } else {
              this.setState({ entryMsg: data.message });
            }
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

    handlePost() {
      // set is_posted to true 
      // can only post when info is filled out 
      const data = {
        userId: this.state.userId,
        data: { isPosted: true }
      }
      if (!this.isFilled()) {
        this.setState({ entryMsg: "You must fill out all the parts to post your profile." });
      } else {
        this.callUpdate(data, true);
      }
      // how do i check if all the forms are filled out?? none of them are empty strings?
    }

    // check if all forms are filled out 
    isFilled() {
      const keyArr = Object.keys(this.state).filter(key => key !== "currentTab" && key !== "newEntry" && key !== "emailMsg" && key !== "entryMsg" && key !== "postMsg" && key !== "userId" && key !== "isPosted" && key !== "emailChecked");
      for (let i = 0; i < keyArr.length; i++) {
        let key = keyArr[i];
        if (typeof this.state[key] == "string" && this.state[key].trim().length == 0) {
          return false;
        } else if (typeof this.state[key] == "object" && Object.keys(this.state[key]).length == 0) {
          return false;
        } else if (Array.isArray(this.state[key]) && this.state[key].length == 0) {
          return false;
        }
      }
      return true;
    }

    // upload and delete img
    handleImg(resData, deleting) {
      if (!deleting) {
        let data = {
          userId: this.state.userId,
          data: {
            img: resData.link,
            imgDelete: resData.deleteHash
          }
        }
        this.callUpdate(data, false);
        console.log("img data in db!")
      }
    }
    
    render() {

      if (!this.state.emailChecked) {
        return (
          <EmailEntry>
            <form onSubmit={this.checkEmail}>
              <label for="email">{this.state.newEntry ? "new profile" : "edit profile"}</label>
              <input 
                type="email" name="email" value={this.state.email} 
                onChange={this.handleChange} placeholder="email" required/>
              <input type="submit" value="enter" style={{margin: "auto"}}/>
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
            {!this.state.isPosted ? <button onClick={() => this.handlePost()}>post</button> : null}
            <br/>{this.state.entryMsg}
          </div>

          <EntryForm onSubmit={this.handleSubmit}>
            {this.renderTab(this.state.currentTab)}
            <input type="submit" value="save"/>
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



