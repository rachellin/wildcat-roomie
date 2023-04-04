import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';

import { EmailEntry, EntryForm, EntryContainer } from '../style/Style';
import { Overlay } from '../style/ProfileStyles';
import { FilterEntry } from './FilterEntry';
import { BioEntry } from './BioEntry';
import { BasicsEntry } from './BasicsEntry';

//const url = "http://localhost:9000";
const url = "https://wildcat-roomie-production.up.railway.app";

export default class Entry extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTab: "basics",
        newEntry: this.props.newEntry,
        emailChecked: false, // for creating a new profile and editing profile
        emailMsg: "",
        entryMsg: "",
        postMsg: "",
        email: "",
        userId: 0,
        about: {},
        basics: {},
        social: {},
        filters: [],
        img: "/wildcat-roomie/pfp.jpg", 
        imgDelete: null,
        roommate: false,
        isPosted: false,
        deleting: false,
        deleteMsg: "are you sure you want to delete your profile?"
      }
    }

    componentDidUpdate(prevState) {
      if (!prevState.emailChecked && this.state.emailChecked) {
        this.updateLastLogin(this.state.userId);
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

    updateLastLogin() {
      fetch(`${url}/api/profiles/update/last_login`, {
          method: 'POST',
          body: JSON.stringify({ userId: this.state.userId }),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          console.log("success");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        if (data.error) console.log(data.error);
        else if (data.message) {
          console.log(data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }

    addUser(data) {
      console.log("calling addUser")
      fetch(`${url}/api/profiles/addUser`, {
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
                updateData={this.updateData} handleImg={(data) => this.handleImg(data)}
                image={this.state.img} imageDelete={this.state.imgDelete}
                setEntryMsg={(msg) => this.setEntryMsg(msg)}/>;
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
      }
      console.log("data\n", data);

      console.log("updating profile")
      this.callUpdate(data, false);
    }

    callUpdate(data, posting) {
      let msg = "";
      if (data.error) {
        this.setState({ entryMsg: "an error occured while saving your image :/" });
        return data;
      } 
      if (data.data.img) {
        msg = "profile picture saved!";
      }

      fetch(`${url}/api/profiles/update`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res)
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
              this.setState({ entryMsg: msg ? msg : data.message });
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
      fetch(`${url}/api/profiles?email=${this.state.email}`, {
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
          // console.log(data);
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
        this.setState({ entryMsg: "an unknown error has occured", emailMsg: "an unknown error has occured" });
      });
    }

    handlePost() {
      const data = {
        userId: this.state.userId,
        data: { isPosted: true }
      }
      // can only post when every form is filled out 
      if (!this.isFilled()) {
        this.setState({ entryMsg: "You must fill out all the parts to post your profile." });
      } else {
        this.callUpdate(data, true);
      }
    }

    // check if all forms are filled out 
    isFilled() {
      const keyArr = Object.keys(this.state).filter(key => key !== "currentTab" && key !== "newEntry" && key !== "emailMsg" && key !== "entryMsg" && key !== "postMsg" && key !== "userId" && key !== "isPosted" && key !== "emailChecked" && key !== "img" && key !== "imgDelete" && key !== "social" && key != "deleting" && key !== "deleteMsg");
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

    // send img data to db 
    handleImg(resData) {
      let data;
      if (resData.error) {
        data = {
          error: resData.error
        }
      } else {
        data = {
          userId: this.state.userId,
          data: {
            img: resData.link,
            imgDelete: resData.deleteHash
          }
        }
      }
      this.callUpdate(data, false);
    }

    deleteProfile(e) {
      e.preventDefault();

      fetch(`${url}/api/profiles/delete?userId=${this.state.userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log("deleted");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        if (data.message) {
          this.setState({ deleteMsg: "your profile has been deleted :( redirecting to home page..." });
          setTimeout(() => {
            this.props.history.push("/");
          }, 2500);
        }
        console.log(data);
        return data;
      })
      .catch(err => {
        console.error(err);
        this.setState({ deleteMsg: "an unknown error has occured" });
      });
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
              <input type="submit" value="enter"/>
              <div style={{marginBottom: "1rem"}}>{this.state.emailMsg}</div>
              <div className="mobile-msg">please make/edit profile on web (or a bigger screen); the forms are not made viewable on mobile</div>
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

            {!this.state.isPosted ? 
              <button onClick={() => this.handlePost()}>post</button> : 
              <button title="delete profile" onClick={() => this.setState({ deleting: true })}>delete</button>}

            <br/>{this.state.entryMsg}
          </div>

          <EntryForm onSubmit={this.handleSubmit}>
            {this.renderTab(this.state.currentTab)}

            {this.state.deleting ?
              <Overlay opacity={0.5}>
                <div className="delete-check">
                  <h1>{this.state.deleteMsg}</h1>
                  <button onClick={(e) => this.deleteProfile(e)}>yes</button>
                  <button onClick={() => this.setState({ deleting: false })}>no</button>
                </div> 
              </Overlay>
            : null}

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




