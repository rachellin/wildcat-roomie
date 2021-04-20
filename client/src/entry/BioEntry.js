import React from 'react';

import { EntryForm } from '../style/Style';
import { TextEditor } from './TextEditor';

export class BioEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // bio: this.props.about.bio,
            // looking: this.props.about.looking,
            // quote: this.props.about.quote
            about: this.props.about
        }
    }

    // updateData(target, value) {
    //     this.setState({ [target]: value }, () => {
    //         let data = this.state;
    //         this.props.updateData("about", data);
    //     });
    // }

    updateData(category, target, value) {
        let copy = this.state[category];
        copy[target] = value;
        this.setState({ [category]: copy }, () => {
          let data = this.state[category];
          //console.log(data)
          this.props.updateData(category, data);
        });
    }

    render() {
        return (
            <div class="bio">

                <label for="quote"><b>quote</b></label>
                <small>a short tagline about you and/or what you're looking for in a roommate <i>(max 50 chars)</i></small>
                <textarea
                    maxLength="50"
                    style={{marginBottom: "3rem", height: "50px", overflow: "hidden"}}
                    name="quote" 
                    onChange={e => this.updateData("about", "quote", e.target.value)} 
                    value={this.props.about.quote}/>

                <label className="required" for="about"><b>about you</b></label>
                {/* <TextEditor 
                    name="about"
                    onChange={e => this.updateData("bio", e.target.value)} 
                    value={this.props.about.bio}
                    valueRaw={this.props.about.bio}
                    /> */}
                <textarea
                    style={{marginBottom: "3rem"}}
                    name="about" 
                    onChange={e => this.updateData("about", "bio", e.target.value)} 
                    value={this.props.about.bio}
                    required/>

                <label for="looking-for"><b>what you're looking for in a roommate</b></label>
                <small style={{display: "block", marginLeft: "2rem"}}>not required, but highly recommended if you're looking for a roommate</small>
                <textarea 
                    name="looking-for" 
                    onChange={e => this.updateData("about", "looking", e.target.value)} 
                    value={this.props.about.looking}/> 

            </div>
        )
    }
}

/*
    render() {
        return (
            <div class="bio">
                <textarea 
                    name="about" 
                    placeholder="write about yourself..." 
                    onChange={e => this.props.updateData("bio", e.target.value)} 
                    required/>
                <textarea 
                    name="looking-for" 
                    placeholder="what are you looking for in a roommate?" 
                    onChange={e => this.props.updateData("looking", e.target.value)} 
                    required/> 
            </div>
        )
    }
    */

// must redesign user object