import React from 'react';

import { EntryForm } from '../style/Style';

export class BioEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            looking: ""
        }
    }

    updateData(target, value) {
        this.setState({ [target]: value }, () => {
            let data = this.state;
            this.props.updateData("about", data);
        });
    }

    render() {
        return (
            <div class="bio">
                <textarea 
                    name="about" 
                    placeholder="write about yourself..." 
                    onChange={e => this.updateData("bio", e.target.value)} 
                    required/>
                <textarea 
                    name="looking-for" 
                    placeholder="what are you looking for in a roommate?" 
                    onChange={e => this.updateData("looking", e.target.value)} 
                    required/> 
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