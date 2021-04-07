import { Component } from "react";

import { EntryForm, EntryContainer } from '../style/Style';
import { FilterEntry } from './FilterEntry';
import { BioEntry } from './BioEntry';
import { BasicsEntry } from './BasicsEntry';

export default class Entry extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 0,
      about: "",
      looking: "",
      test: ""
    };
  }

  updateData = (target, value) => {
    this.setState({ [target]: value });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    alert("submitted");
    e.preventDefault();
    console.log(this.state.about);
  };

  render() {
    return (
      <EntryContainer>
        <EntryForm onSubmit={this.handleSubmit}>
          {/* <input
            type="text"
            name="test"
            value={this.state.test}
            onChange={this.handleChange}
          ></input> */}
          <BioEntry updateData={this.updateData}/>
          <input type="submit" value="submit" />
        </EntryForm>
      </EntryContainer>
    );
  }
}
